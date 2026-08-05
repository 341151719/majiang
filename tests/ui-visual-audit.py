#!/usr/bin/env python3
"""Render production UI states and assert mobile readability/accessibility invariants.

Usage:
  python -m pip install playwright
  playwright install chromium
  python tests/ui-visual-audit.py

Set CHROMIUM_PATH when Chromium is installed outside PATH.
"""
from __future__ import annotations

import asyncio
import json
import os
import re
import shutil
import sys
from pathlib import Path

try:
    from playwright.async_api import async_playwright
except ImportError as exc:
    raise SystemExit("Playwright is required: python -m pip install playwright") from exc

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "test-artifacts" / "ui-visual-audit"
OUTPUT.mkdir(parents=True, exist_ok=True)


def inline_application() -> str:
    html = (ROOT / "index.html").read_text(encoding="utf-8")

    def style_repl(match: re.Match[str]) -> str:
        href = match.group(1)
        path = ROOT / href
        if not path.is_file():
            return match.group(0)
        return "<style data-source=\"{}\">{}</style>".format(href, path.read_text(encoding="utf-8"))

    def script_repl(match: re.Match[str]) -> str:
        src = match.group(1)
        path = ROOT / src
        if not path.is_file():
            return match.group(0)
        source = path.read_text(encoding="utf-8").replace("</script>", "<\\/script>")
        return "<script data-source=\"{}\">{}</script>".format(src, source)

    html = re.sub(r'<link\s+rel=["\']stylesheet["\']\s+href=["\']([^"\']+)["\']\s*/?>', style_repl, html)
    html = re.sub(r'<script\s+src=["\']([^"\']+)["\']\s*>\s*</script>', script_repl, html)
    return html


def chromium_path() -> str | None:
    configured = os.environ.get("CHROMIUM_PATH")
    if configured:
        return configured
    for candidate in ("chromium", "chromium-browser", "google-chrome", "google-chrome-stable"):
        found = shutil.which(candidate)
        if found:
            return found
    return None


async def visible_rect(page, selector: str) -> dict | None:
    return await page.eval_on_selector(
        selector,
        """el => {
          const s=getComputedStyle(el),r=el.getBoundingClientRect();
          if(s.display==='none'||s.visibility==='hidden'||r.width<=0||r.height<=0)return null;
          return {left:r.left,top:r.top,right:r.right,bottom:r.bottom,width:r.width,height:r.height};
        }""",
    )


def within(rect: dict, width: int, height: int, tolerance: float = 2) -> bool:
    return (
        rect["left"] >= -tolerance
        and rect["top"] >= -tolerance
        and rect["right"] <= width + tolerance
        and rect["bottom"] <= height + tolerance
    )


def overlaps(a: dict, b: dict, gap: float = 0) -> bool:
    return not (
        a["right"] <= b["left"] - gap
        or a["left"] >= b["right"] + gap
        or a["bottom"] <= b["top"] - gap
        or a["top"] >= b["bottom"] + gap
    )


async def new_page(browser, html: str, width: int, height: int):
    page = await browser.new_page(viewport={"width": width, "height": height}, device_scale_factor=1)
    errors: list[str] = []
    page.on("pageerror", lambda error: errors.append(str(error)))
    await page.emulate_media(reduced_motion="reduce")
    await page.set_content(html, wait_until="load")
    await page.wait_for_timeout(250)
    return page, errors


async def freeze_table(page):
    await page.evaluate(
        """async () => {
          gameLoop=()=>{};
          await startMode('traditional','standard');
          await new Promise(resolve=>setTimeout(resolve,80));
          renderAll();
        }"""
    )
    await page.wait_for_timeout(150)


async def audit() -> dict:
    html = inline_application()
    results: list[dict] = []
    failures: list[str] = []

    def check(condition: bool, message: str):
        if not condition:
            failures.append(message)

    async with async_playwright() as playwright:
        path = chromium_path()
        launch = {"headless": True, "args": ["--no-sandbox", "--disable-dev-shm-usage", "--hide-scrollbars"]}
        if path:
            launch["executable_path"] = path
        browser = await playwright.chromium.launch(**launch)

        # Phone portrait lobby.
        page, errors = await new_page(browser, html, 390, 844)
        await page.screenshot(path=str(OUTPUT / "phone-portrait-lobby.png"))
        layout = await page.evaluate("document.documentElement.dataset.uiLayout")
        header = await visible_rect(page, "#lobby .lobby-head")
        first_card = await visible_rect(page, "#lobby .mode-card")
        theme_select = await visible_rect(page, "#mobileTileThemeSelect")
        cards = await page.eval_on_selector_all(
            "#lobby .mode-card",
            "els => els.map(el=>({role:el.getAttribute('role'),tabindex:el.getAttribute('tabindex'),pressed:el.getAttribute('aria-pressed')}))",
        )
        check(layout == "phone-portrait", "390×844 should select phone-portrait layout")
        check(bool(header and first_card and header["bottom"] <= first_card["top"] + 1), "portrait lobby header overlaps first mode card")
        check(bool(theme_select and theme_select["height"] >= 44), "mobile theme select is below 44px touch height")
        check(all(c["role"] == "button" and c["tabindex"] == "0" for c in cards), "mode cards lack keyboard button semantics")
        check(not errors, f"portrait lobby page errors: {errors}")
        results.append({"state": "phone-portrait-lobby", "layout": layout, "header": header, "firstCard": first_card, "themeSelect": theme_select, "cards": cards, "errors": errors})
        await page.close()

        # Phone landscape lobby.
        page, errors = await new_page(browser, html, 844, 390)
        await page.screenshot(path=str(OUTPUT / "phone-landscape-lobby.png"))
        selectors = ["#lobby .mode-grid", "#lobby .lobby-compare", "#lobby .start-match-btn", "#lobby .lobby-difficulty"]
        rects = {selector: await visible_rect(page, selector) for selector in selectors}
        for selector, rect in rects.items():
            check(bool(rect and within(rect, 844, 390)), f"landscape lobby element outside viewport: {selector} {rect}")
        check(not overlaps(rects["#lobby .lobby-compare"], rects["#lobby .start-match-btn"]), "landscape compare panel overlaps start button")
        check(not errors, f"landscape lobby page errors: {errors}")
        results.append({"state": "phone-landscape-lobby", "rects": rects, "errors": errors})
        await page.close()

        # Portrait table and advisor.
        page, errors = await new_page(browser, html, 390, 844)
        await freeze_table(page)
        await page.screenshot(path=str(OUTPUT / "phone-portrait-table.png"))
        built_in = await page.evaluate("window.__auditRedEdgeVia?.() || null")
        top_button = await visible_rect(page, "#topbar button")
        check(bool(top_button and top_button["width"] >= 44 and top_button["height"] >= 44), "portrait top toolbar control is below 44px")
        check(not built_in or built_in.get("ok", False), f"built-in portrait layout audit failed: {built_in}")

        # Regression: self chi/pong/gang melds must use compact tiles and stay out of the hand.
        await page.evaluate(
            """() => {
              state.players[0].melds=[
                {type:'chi',tiles:[0,1,2]},
                {type:'pong',tile:9},
                {type:'ming',tile:18},
                {type:'an',tile:27}
              ];
              state.players[0].hand=[3,4];
              renderAll();
            }"""
        )
        await page.wait_for_timeout(30)
        meld_rack = await visible_rect(page, "#mymelds")
        meld_hand = await visible_rect(page, "#hand")
        meld_metrics = await page.eval_on_selector(
            "#mymelds",
            "el=>({count:el.dataset.meldCount,clientWidth:el.clientWidth,scrollWidth:el.scrollWidth,clientHeight:el.clientHeight,scrollHeight:el.scrollHeight})",
        )
        meld_tiles_small = await page.eval_on_selector_all("#mymelds .tile", "els=>els.every(el=>el.classList.contains('small'))")
        check(meld_tiles_small, "self meld tiles are not rendered with compact .small geometry")
        check(meld_metrics["count"] == "4", f"self meld count metadata is wrong: {meld_metrics}")
        check(meld_metrics["scrollWidth"] <= meld_metrics["clientWidth"] + 1 and meld_metrics["scrollHeight"] <= meld_metrics["clientHeight"] + 1, f"portrait self meld rack clips content: {meld_metrics}")
        check(bool(meld_rack and meld_hand and not overlaps(meld_rack, meld_hand)), f"portrait self meld rack overlaps hand: rack={meld_rack}, hand={meld_hand}")
        await page.screenshot(path=str(OUTPUT / "phone-portrait-self-melds.png"))
        await freeze_table(page)

        await page.evaluate(
            """() => {
              advisor.panelOpen=true;
              document.getElementById('advisorPanel').classList.add('open');
              document.getElementById('advisorToggleBtn').classList.add('active');
              window.__refreshRedEdgeUiSemantics?.();
            }"""
        )
        await page.wait_for_timeout(50)
        controls = await page.eval_on_selector_all(
            "#advisorPanel .advisor-controls select,#advisorPanel .advisor-controls button",
            "els => els.map(el=>{const r=el.getBoundingClientRect();return {width:r.width,height:r.height}})",
        )
        toggle_expanded = await page.get_attribute("#advisorToggleBtn", "aria-expanded")
        check(all(r["width"] >= 44 and r["height"] >= 44 for r in controls), f"advisor controls below 44px: {controls}")
        check(toggle_expanded == "true", "advisor toggle aria-expanded did not synchronize")
        await page.screenshot(path=str(OUTPUT / "phone-portrait-advisor.png"))
        await page.keyboard.press("Escape")
        check(not await page.eval_on_selector("#advisorPanel", "el=>el.classList.contains('open')"), "Escape did not close advisor panel")

        # Rules dialog and focus/escape behavior.
        await page.focus("#topbar button:nth-of-type(2)")
        await page.evaluate("showRules();window.__refreshRedEdgeUiSemantics?.()")
        await page.wait_for_timeout(50)
        modal_box = await visible_rect(page, "#modal .box")
        return_button = await visible_rect(page, "#modal .box>button:last-child")
        modal_role = await page.get_attribute("#modal", "role")
        check(bool(modal_box and within(modal_box, 390, 844)), f"portrait rules dialog outside viewport: {modal_box}")
        check(bool(return_button and return_button["height"] >= 44), f"rules return button below 44px: {return_button}")
        check(modal_role == "dialog", "modal lacks dialog role")
        await page.screenshot(path=str(OUTPUT / "phone-portrait-rules.png"))
        await page.keyboard.press("Escape")
        check(not await page.eval_on_selector("#modal", "el=>getComputedStyle(el).display!=='none'"), "Escape did not close rules dialog")

        # Review report must stay single-column and readable on phone.
        await page.evaluate("endRound();window.__refreshRedEdgeUiSemantics?.()")
        await page.wait_for_timeout(50)
        review_box = await visible_rect(page, "#modal .review-box")
        title = await visible_rect(page, ".review-title")
        action_rects = await page.eval_on_selector_all(
            ".review-actions button",
            "els => els.map(el=>{const r=el.getBoundingClientRect();return {width:r.width,height:r.height}})",
        )
        side_display = await page.eval_on_selector(".review-side", "el=>getComputedStyle(el).display")
        check(bool(review_box and within(review_box, 390, 844)), f"portrait review dialog outside viewport: {review_box}")
        check(bool(title and title["width"] >= 160), f"review title column is still squeezed: {title}")
        check(all(r["height"] >= 44 for r in action_rects), f"review actions below 44px: {action_rects}")
        check(side_display == "none", "desktop review side panel should be collapsed on phone")
        await page.screenshot(path=str(OUTPUT / "phone-portrait-review.png"))
        results.append({"state": "phone-portrait-game", "topButton": top_button, "advisorControls": controls, "reviewBox": review_box, "reviewTitle": title, "reviewActions": action_rects, "builtIn": built_in, "errors": errors})
        check(not errors, f"portrait game page errors: {errors}")
        await page.close()

        # Landscape rules: exit control must remain visible without scrolling the whole page.
        page, errors = await new_page(browser, html, 844, 390)
        await freeze_table(page)
        await page.evaluate(
            """() => {
              state.players[0].melds=[
                {type:'chi',tiles:[0,1,2]},
                {type:'pong',tile:9},
                {type:'ming',tile:18},
                {type:'bu',tile:27}
              ];
              state.players[0].hand=[3,4];
              renderAll();
            }"""
        )
        await page.wait_for_timeout(30)
        landscape_meld_rack = await visible_rect(page, "#mymelds")
        landscape_hand = await visible_rect(page, "#hand")
        landscape_meld_metrics = await page.eval_on_selector(
            "#mymelds",
            "el=>({count:el.dataset.meldCount,clientWidth:el.clientWidth,scrollWidth:el.scrollWidth,clientHeight:el.clientHeight,scrollHeight:el.scrollHeight})",
        )
        landscape_meld_small = await page.eval_on_selector_all("#mymelds .tile", "els=>els.every(el=>el.classList.contains('small'))")
        check(landscape_meld_small, "landscape self meld tiles are not compact")
        check(landscape_meld_metrics["scrollWidth"] <= landscape_meld_metrics["clientWidth"] + 1 and landscape_meld_metrics["scrollHeight"] <= landscape_meld_metrics["clientHeight"] + 1, f"landscape self meld rack clips content: {landscape_meld_metrics}")
        check(bool(landscape_meld_rack and landscape_hand and not overlaps(landscape_meld_rack, landscape_hand)), f"landscape self meld rack overlaps hand: rack={landscape_meld_rack}, hand={landscape_hand}")
        await page.screenshot(path=str(OUTPUT / "phone-landscape-self-melds.png"))
        await freeze_table(page)
        await page.evaluate("showRules();window.__refreshRedEdgeUiSemantics?.()")
        await page.wait_for_timeout(50)
        return_button = await visible_rect(page, "#modal .box>button:last-child")
        check(bool(return_button and within(return_button, 844, 390)), f"landscape rules return button is clipped: {return_button}")
        await page.screenshot(path=str(OUTPUT / "phone-landscape-rules.png"))
        check(not errors, f"landscape rules page errors: {errors}")
        results.append({"state": "phone-landscape-rules", "returnButton": return_button, "errors": errors})
        await page.close()

        # Narrow portrait catches fixed-width regressions.
        page, errors = await new_page(browser, html, 320, 700)
        await page.screenshot(path=str(OUTPUT / "narrow-phone-lobby.png"))
        scroll = await page.evaluate("({doc:document.documentElement.scrollWidth,body:document.body.scrollWidth,viewport:innerWidth})")
        narrow_select = await visible_rect(page, "#mobileTileThemeSelect")
        check(scroll["doc"] <= 320 and scroll["body"] <= 320, f"narrow lobby has horizontal overflow: {scroll}")
        check(bool(narrow_select and narrow_select["height"] >= 44), f"narrow theme select below 44px: {narrow_select}")
        check(not errors, f"narrow lobby page errors: {errors}")
        results.append({"state": "narrow-phone-lobby", "scroll": scroll, "themeSelect": narrow_select, "errors": errors})
        await page.close()

        await browser.close()

    report = {"ok": not failures, "failures": failures, "results": results}
    (OUTPUT / "report.json").write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    return report


if __name__ == "__main__":
    result = asyncio.run(audit())
    print(json.dumps(result, ensure_ascii=False, indent=2))
    raise SystemExit(0 if result["ok"] else 1)

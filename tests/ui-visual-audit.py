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
from math import hypot
from pathlib import Path

try:
    from playwright.async_api import async_playwright
except ImportError as exc:
    raise SystemExit("Playwright is required: python -m pip install playwright") from exc

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "test-artifacts" / "ui-visual-audit"
OUTPUT.mkdir(parents=True, exist_ok=True)

TURBO_5_MAX = {
    "panelPhysicalWidth": 2772,
    "panelPhysicalHeight": 1280,
    "diagonalInches": 6.83,
    # DPR4 gives an exact integer CSS mapping of the native 2772×1280 panel.
    "panelDpr": 4,
    "panelCssWidth": 693,
    "panelCssHeight": 320,
    # DPR3 covers the common browser-sized logical viewport after system chrome.
    "browserDpr": 3,
    "browserCssWidth": 844,
    "browserCssHeight": 390,
}
TURBO_5_MAX["ppi"] = hypot(TURBO_5_MAX["panelPhysicalWidth"], TURBO_5_MAX["panelPhysicalHeight"]) / TURBO_5_MAX["diagonalInches"]


def physical_measure(css_px: float, dpr: float = 3, ppi: float = TURBO_5_MAX["ppi"]) -> dict:
    physical_px = css_px * dpr
    return {
        "cssPx": round(css_px, 2),
        "physicalPx": round(physical_px, 2),
        "millimetres": round(physical_px / ppi * 25.4, 2),
    }


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


async def new_page(
    browser,
    html: str,
    width: int,
    height: int,
    device_scale_factor: int = 1,
    *,
    is_mobile: bool = False,
    has_touch: bool = False,
):
    page = await browser.new_page(
        viewport={"width": width, "height": height},
        device_scale_factor=device_scale_factor,
        is_mobile=is_mobile,
        has_touch=has_touch,
    )
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


async def render_stress_melds(page):
    """Render every meld family for all seats and survive repeated live redraws."""
    await page.evaluate(
        """() => {
          const melds = [
            {type:'chi',tiles:[0,1,2]},
            {type:'pong',tile:9},
            {type:'ming',tile:18},
            {type:'an',tile:27}
          ];
          state.players.forEach((player, pid) => {
            player.melds = melds.map((meld, index) => ({
              ...meld,
              type: pid === 3 && index === 3 ? 'bu' : meld.type,
              tiles: meld.tiles && meld.tiles.slice()
            }));
            player.hand = [3, 4];
          });
          for (let redraw = 0; redraw < 20; redraw++) renderAll();
        }"""
    )
    await page.wait_for_timeout(1000)


async def render_late_round_state(page):
    """Populate a sustained-play state with exposed sets and full discard rivers."""
    await page.evaluate(
        """() => {
          state.players.forEach((player, pid) => {
            player.melds = [
              {type:'pong',tile:(pid * 3) % 27},
              {type:'ming',tile:27 + (pid % 7)}
            ];
            player.hand = Array.from({length:7}, (_, index) => (pid * 7 + index) % 34);
            player.discards = Array.from({length:12}, (_, index) => (pid * 9 + index * 2) % 34);
          });
          state.lastDiscFrom=2;
          for (let redraw = 0; redraw < 20; redraw++) renderAll();
        }"""
    )
    await page.wait_for_timeout(250)


async def collect_meld_metrics(page):
    return await page.evaluate(
        """() => {
          const rect = el => {
            if (!el) return null;
            const r = el.getBoundingClientRect();
            return {left:r.left,top:r.top,right:r.right,bottom:r.bottom,width:r.width,height:r.height};
          };
          const selectors = {
            self: '#mymelds',
            right: '#opp1 > .exposed-melds',
            top: '#opp2 > .exposed-melds',
            left: '#opp3 > .exposed-melds'
          };
          const seats = Object.fromEntries(Object.entries(selectors).map(([name, selector]) => {
            const rack = document.querySelector(selector);
            const tiles = [...document.querySelectorAll(selector + ' .tile')];
            return [name, {
              selector,
              rack: rect(rack),
              tileCount: tiles.length,
              allSmall: tiles.length > 0 && tiles.every(tile => tile.classList.contains('small')),
              tiles: tiles.map(rect)
            }];
          }));
          return {
            seats,
            duplicateSelfRacks: document.querySelectorAll('#opp0 > .exposed-melds').length,
            viewport: {width:innerWidth,height:innerHeight},
            board: rect(document.getElementById('discboard'))
          };
        }"""
    )


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
        page, errors = await new_page(browser, html, 390, 844, device_scale_factor=3)
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
        page, errors = await new_page(browser, html, 844, 390, device_scale_factor=TURBO_5_MAX["browserDpr"])
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
        page, errors = await new_page(browser, html, 390, 844, device_scale_factor=3)
        await freeze_table(page)
        await page.screenshot(path=str(OUTPUT / "phone-portrait-table.png"))
        built_in = await page.evaluate("window.__auditRedEdgeVia?.() || null")
        ai_v4 = await page.evaluate(
            """() => {
              const api=window.__redEdgeAiV4;
              if(!api)return {available:false};
              const view=api.buildDecisionView(0);
              const start=performance.now();
              const cold=api.buildDiscardRows(state.players[0],false);
              const coldMs=performance.now()-start;
              const warm=[];
              for(let i=0;i<5;i++){
                const tick=performance.now();
                api.buildDiscardRows(state.players[0],false);
                warm.push(performance.now()-tick);
              }
              return {
                available:true,version:api.version,coldMs,warmMaxMs:Math.max(...warm),
                candidates:cold.rows.length,pareto:cold.rows.filter(row=>row.pareto).length,
                finite:cold.rows.every(row=>Number.isFinite(row.raw)&&Number.isFinite(row.expectedDealLoss)),
                publicViewNoWall:!Object.prototype.hasOwnProperty.call(view,'wall'),
                publicViewNoOpponentHands:view.players.every(player=>!Object.prototype.hasOwnProperty.call(player,'hand'))
              };
            }"""
        )
        top_button = await visible_rect(page, "#topbar button")
        check(bool(top_button and top_button["width"] >= 44 and top_button["height"] >= 44), "portrait top toolbar control is below 44px")
        check(not built_in or built_in.get("ok", False), f"built-in portrait layout audit failed: {built_in}")
        check(ai_v4.get("available", False), f"AI Strategy 4.0 did not load: {ai_v4}")
        check(ai_v4.get("finite", False) and ai_v4.get("candidates", 0) > 0 and ai_v4.get("pareto", 0) > 0, f"AI Strategy 4.0 returned invalid candidates: {ai_v4}")
        check(ai_v4.get("publicViewNoWall", False) and ai_v4.get("publicViewNoOpponentHands", False), f"AI Strategy 4.0 leaked hidden information: {ai_v4}")
        check(ai_v4.get("coldMs", 1001) < 1000 and ai_v4.get("warmMaxMs", 201) < 200, f"AI Strategy 4.0 browser latency regression: {ai_v4}")

        # Regression: all four seats must keep exposed melds compact after sustained redraws.
        await render_stress_melds(page)
        meld_rack = await visible_rect(page, "#mymelds")
        meld_hand = await visible_rect(page, "#hand")
        all_meld_metrics = await collect_meld_metrics(page)
        meld_metrics = await page.eval_on_selector(
            "#mymelds",
            "el=>({count:el.dataset.meldCount,clientWidth:el.clientWidth,scrollWidth:el.scrollWidth,clientHeight:el.clientHeight,scrollHeight:el.scrollHeight})",
        )
        meld_tiles_small = await page.eval_on_selector_all("#mymelds .tile", "els=>els.every(el=>el.classList.contains('small'))")
        check(meld_tiles_small, "self meld tiles are not rendered with compact .small geometry")
        check(meld_metrics["count"] == "4", f"self meld count metadata is wrong: {meld_metrics}")
        check(meld_metrics["scrollWidth"] <= meld_metrics["clientWidth"] + 1 and meld_metrics["scrollHeight"] <= meld_metrics["clientHeight"] + 1, f"portrait self meld rack clips content: {meld_metrics}")
        check(bool(meld_rack and meld_hand and not overlaps(meld_rack, meld_hand)), f"portrait self meld rack overlaps hand: rack={meld_rack}, hand={meld_hand}")
        check(all_meld_metrics["duplicateSelfRacks"] == 0, f"self melds are duplicated inside #opp0: {all_meld_metrics}")
        for seat, metrics in all_meld_metrics["seats"].items():
            check(metrics["allSmall"], f"portrait {seat} exposed melds are not compact: {metrics}")
            check(metrics["tileCount"] == 14, f"portrait {seat} exposed meld tile count is wrong: {metrics}")
            for tile in metrics["tiles"]:
                check(tile["width"] <= 30 and tile["height"] <= 40, f"portrait {seat} meld tile is oversized: {tile}")
                check(within(tile, 390, 844), f"portrait {seat} meld tile leaves viewport: {tile}")
                check(not overlaps(tile, all_meld_metrics["board"]), f"portrait {seat} meld tile covers the discard board: tile={tile}, board={all_meld_metrics['board']}")
        await page.screenshot(path=str(OUTPUT / "phone-portrait-all-melds.png"))
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
        results.append({"state": "phone-portrait-game", "topButton": top_button, "advisorControls": controls, "melds": all_meld_metrics, "reviewBox": review_box, "reviewTitle": title, "reviewActions": action_rects, "builtIn": built_in, "aiV4": ai_v4, "errors": errors})
        check(not errors, f"portrait game page errors: {errors}")
        await page.close()

        # Landscape rules: exit control must remain visible without scrolling the whole page.
        page, errors = await new_page(browser, html, 844, 390, device_scale_factor=TURBO_5_MAX["browserDpr"])
        await freeze_table(page)
        await render_stress_melds(page)
        landscape_meld_rack = await visible_rect(page, "#mymelds")
        landscape_hand = await visible_rect(page, "#hand")
        landscape_all_meld_metrics = await collect_meld_metrics(page)
        landscape_meld_metrics = await page.eval_on_selector(
            "#mymelds",
            "el=>({count:el.dataset.meldCount,clientWidth:el.clientWidth,scrollWidth:el.scrollWidth,clientHeight:el.clientHeight,scrollHeight:el.scrollHeight})",
        )
        landscape_meld_small = await page.eval_on_selector_all("#mymelds .tile", "els=>els.every(el=>el.classList.contains('small'))")
        check(landscape_meld_small, "landscape self meld tiles are not compact")
        check(landscape_meld_metrics["scrollWidth"] <= landscape_meld_metrics["clientWidth"] + 1 and landscape_meld_metrics["scrollHeight"] <= landscape_meld_metrics["clientHeight"] + 1, f"landscape self meld rack clips content: {landscape_meld_metrics}")
        check(bool(landscape_meld_rack and landscape_hand and not overlaps(landscape_meld_rack, landscape_hand)), f"landscape self meld rack overlaps hand: rack={landscape_meld_rack}, hand={landscape_hand}")
        check(landscape_all_meld_metrics["duplicateSelfRacks"] == 0, f"landscape self melds are duplicated inside #opp0: {landscape_all_meld_metrics}")
        for seat, metrics in landscape_all_meld_metrics["seats"].items():
            check(metrics["allSmall"], f"landscape {seat} exposed melds are not compact: {metrics}")
            check(metrics["tileCount"] == 14, f"landscape {seat} exposed meld tile count is wrong: {metrics}")
            for tile in metrics["tiles"]:
                check(tile["width"] <= 30 and tile["height"] <= 40, f"landscape {seat} meld tile is oversized: {tile}")
                check(within(tile, 844, 390), f"landscape {seat} meld tile leaves viewport: {tile}")
                check(not overlaps(tile, landscape_all_meld_metrics["board"]), f"landscape {seat} meld tile covers the discard board: tile={tile}, board={landscape_all_meld_metrics['board']}")
        await page.screenshot(path=str(OUTPUT / "phone-landscape-all-melds.png"))
        await freeze_table(page)
        await page.evaluate("showRules();window.__refreshRedEdgeUiSemantics?.()")
        await page.wait_for_timeout(50)
        return_button = await visible_rect(page, "#modal .box>button:last-child")
        check(bool(return_button and within(return_button, 844, 390)), f"landscape rules return button is clipped: {return_button}")
        await page.screenshot(path=str(OUTPUT / "phone-landscape-rules.png"))
        check(not errors, f"landscape rules page errors: {errors}")
        results.append({"state": "phone-landscape-rules", "returnButton": return_button, "melds": landscape_all_meld_metrics, "errors": errors})
        await page.close()

        # Exact Redmi Turbo 5 Max panel simulation. 693×320 at DPR4 produces the
        # native 2772×1280 raster with no rounding. Measurements use post-transform
        # browser rectangles and the published panel PPI.
        panel_w = TURBO_5_MAX["panelCssWidth"]
        panel_h = TURBO_5_MAX["panelCssHeight"]
        panel_dpr = TURBO_5_MAX["panelDpr"]
        page, errors = await new_page(browser, html, panel_w, panel_h, panel_dpr, is_mobile=True, has_touch=True)
        await freeze_table(page)
        await page.evaluate(
            """() => {
              document.documentElement.style.setProperty('--safe-left','18px');
              document.documentElement.style.setProperty('--safe-right','18px');
              document.documentElement.style.setProperty('--safe-top','4px');
              document.documentElement.style.setProperty('--safe-bottom','4px');
              applyDisplayProfile();
            }"""
        )
        await page.wait_for_timeout(150)
        profile = await page.evaluate("window.__redEdgeDisplayProfile")
        panel_metrics = await page.evaluate(
            """() => {
              const metric = selector => {
                const el=document.querySelector(selector);
                if(!el)return null;
                const r=el.getBoundingClientRect(),s=getComputedStyle(el);
                return {left:r.left,top:r.top,right:r.right,bottom:r.bottom,width:r.width,height:r.height,fontSize:parseFloat(s.fontSize)||0};
              };
              return {
                stage:metric('#gameStage'),
                topButton:metric('#gameStage #topbar button'),
                handTile:metric('#gameStage #hand .tile'),
                hand:metric('#gameStage #hand'),
                scoreValue:metric('#gameStage #scoreBar .score-value'),
                board:metric('#gameStage #discboard'),
                document:{width:document.documentElement.scrollWidth,height:document.documentElement.scrollHeight}
              };
            }"""
        )
        check(profile["layout"] == "phone-landscape", f"Turbo 5 Max panel should select phone-landscape: {profile}")
        check(profile["physicalWidth"] == 2772 and profile["physicalHeight"] == 1280, f"Turbo 5 Max exact raster mismatch: {profile}")
        check(profile["safeArea"] == {"left": 18, "right": 18, "top": 4, "bottom": 4}, f"Turbo safe-area simulation was not applied: {profile}")
        check(bool(profile["audit"]["ok"]), f"Turbo 5 Max built-in stage audit failed: {profile['audit']}")
        check(bool(panel_metrics["stage"] and within(panel_metrics["stage"], panel_w, panel_h)), f"Turbo stage leaves safe viewport: {panel_metrics['stage']}")
        check(panel_metrics["document"]["width"] <= panel_w and panel_metrics["document"]["height"] <= panel_h, f"Turbo page scrolls: {panel_metrics['document']}")

        top_button_mm = physical_measure(panel_metrics["topButton"]["width"], panel_dpr)
        tile_width_mm = physical_measure(panel_metrics["handTile"]["width"], panel_dpr)
        tile_height_mm = physical_measure(panel_metrics["handTile"]["height"], panel_dpr)
        check(top_button_mm["millimetres"] >= 9.0, f"Turbo top control is under 9mm: {top_button_mm}")
        check(tile_width_mm["millimetres"] >= 7.5, f"Turbo hand tile is too narrow: {tile_width_mm}")
        check(tile_height_mm["millimetres"] >= 10.0, f"Turbo hand tile is too short: {tile_height_mm}")
        check(panel_metrics["scoreValue"]["fontSize"] >= 11, f"Turbo score text is below 11 authored CSS px: {panel_metrics['scoreValue']}")
        check(not errors, f"Turbo 5 Max panel page errors: {errors}")
        await page.screenshot(path=str(OUTPUT / "turbo5max-panel-2772x1280-safe-area.png"))

        # The original regression appeared only after sustained play. Exercise a
        # realistic late-round river plus two exposed melds for every seat.
        await render_late_round_state(page)
        late_round_audit = await page.evaluate("window.__auditRedEdgeMobile()")
        late_round_melds = await collect_meld_metrics(page)
        river_labels = await page.evaluate(
            """() => [...document.querySelectorAll('#discboard .dzone')].map(zone => {
              const rect = el => {const r=el.getBoundingClientRect();return {left:r.left,top:r.top,right:r.right,bottom:r.bottom,width:r.width,height:r.height}};
              return {player:zone.dataset.player,label:rect(zone.querySelector('.dz-title')),tiles:rect(zone.querySelector('.dtiles'))};
            })"""
        )
        check(late_round_audit["ok"], f"Turbo late-round geometry failed: {late_round_audit}")
        for river in river_labels:
            check(not overlaps(river["label"], river["tiles"]), f"Turbo river label overlaps discard tiles: {river}")
        for seat, metrics in late_round_melds["seats"].items():
            check(metrics["allSmall"], f"Turbo late-round {seat} melds are not compact: {metrics}")
            for tile in metrics["tiles"]:
                check(not overlaps(tile, late_round_melds["board"]), f"Turbo late-round {seat} meld covers river: tile={tile}, board={late_round_melds['board']}")
        await page.screenshot(path=str(OUTPUT / "turbo5max-late-round-stress.png"))
        results.append({
            "state": "redmi-turbo-5-max-panel",
            "device": TURBO_5_MAX,
            "simulationNote": "693×320 CSS at DPR4 produces the exact 2772×1280 native panel raster; 844×390 at DPR3 separately covers the conservative browser viewport.",
            "profile": profile,
            "metrics": panel_metrics,
            "physical": {"topButtonWidth": top_button_mm, "handTileWidth": tile_width_mm, "handTileHeight": tile_height_mm},
            "lateRound": {"audit": late_round_audit, "melds": late_round_melds, "riverLabels": river_labels},
            "errors": errors,
        })
        await page.close()

        # Real mobile context must present an orientation gate in portrait and
        # clear it after a manual rotation. Automatic orientation lock itself is
        # browser/OS policy and is intentionally treated as progressive enhancement.
        page, errors = await new_page(browser, html, 390, 844, TURBO_5_MAX["browserDpr"], is_mobile=True, has_touch=True)
        gate_visible = await page.eval_on_selector("#orientationGate", "el=>!el.hidden")
        gate_state = await page.evaluate("window.__redEdgeLandscapeExperience?.state")
        check(gate_visible and gate_state["phone"] and gate_state["portrait"], f"portrait mobile orientation gate did not open: {gate_state}")
        await page.screenshot(path=str(OUTPUT / "turbo5max-orientation-gate.png"))
        await page.set_viewport_size({"width": 844, "height": 390})
        await page.wait_for_timeout(180)
        rotated_gate_visible = await page.eval_on_selector("#orientationGate", "el=>!el.hidden")
        rotated_layout = await page.evaluate("document.documentElement.dataset.uiLayout")
        check(not rotated_gate_visible, "orientation gate remained open after landscape rotation")
        check(rotated_layout == "phone-landscape", f"manual rotation did not select phone-landscape: {rotated_layout}")
        check(not errors, f"Turbo orientation gate page errors: {errors}")
        results.append({"state": "redmi-turbo-5-max-orientation", "portraitGate": gate_visible, "portraitState": gate_state, "landscapeGate": rotated_gate_visible, "landscapeLayout": rotated_layout, "errors": errors})
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

#!/usr/bin/env python3
"""Split the self-contained Majiang HTML into maintainable local assets.

The source document is read without changing it.  The generated index keeps the
same DOM and script order, while styles, JavaScript, and embedded PNG data are
given separate files.
"""

from __future__ import annotations

import argparse
import base64
import hashlib
from pathlib import Path
import re


STYLE_RE = re.compile(r"<style(?:\s+[^>]*)?>(.*?)</style>", re.IGNORECASE | re.DOTALL)
SCRIPT_RE = re.compile(r"<script(?:\s+[^>]*)?>(.*?)</script>", re.IGNORECASE | re.DOTALL)
DATA_URI_RE = re.compile(r"data:image/(png|webp|jpeg|gif);base64,([A-Za-z0-9+/=]+)")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("source", type=Path)
    parser.add_argument("--output", type=Path, default=Path("."))
    args = parser.parse_args()

    source = args.source.expanduser().resolve()
    output = args.output.expanduser().resolve()
    html = source.read_text(encoding="utf-8")
    styles = STYLE_RE.findall(html)
    scripts = SCRIPT_RE.findall(html)
    if not styles:
        raise SystemExit("No inline style blocks found")
    if len(scripts) != 2:
        raise SystemExit(f"Expected two inline scripts, found {len(scripts)}")

    image_dir = output / "assets" / "images"
    image_dir.mkdir(parents=True, exist_ok=True)
    for stale in image_dir.glob("embedded-*"):
        stale.unlink()
    image_by_digest: dict[str, str] = {}
    next_image_number = 1

    def replace_data_uris(text: str, page_relative: bool) -> str:
        nonlocal next_image_number

        def replace(match: re.Match[str]) -> str:
            nonlocal next_image_number
            image_type, encoded = match.group(1), match.group(2)
            raw = base64.b64decode(encoded, validate=True)
            signatures = {
                "png": b"\x89PNG\r\n\x1a\n",
                "webp": b"RIFF",
                "jpeg": b"\xff\xd8\xff",
                "gif": b"GIF",
            }
            if not raw.startswith(signatures[image_type]):
                raise SystemExit(f"Embedded data URI is not a valid {image_type}")
            digest = hashlib.sha256(raw).hexdigest()
            name = image_by_digest.get(digest)
            if name is None:
                name = f"embedded-{next_image_number:03d}.{image_type}"
                next_image_number += 1
                (image_dir / name).write_bytes(raw)
                image_by_digest[digest] = name
            return ("assets/images/" if page_relative else "images/") + name

        return DATA_URI_RE.sub(replace, text)

    css = "/* Extracted from the original self-contained HTML. */\n\n"
    css += "\n\n".join(replace_data_uris(block, page_relative=False) for block in styles)
    js_main = "// Extracted from the original self-contained HTML.\n\n" + replace_data_uris(scripts[0], page_relative=True)
    js_patch = "// Extracted from the original self-contained HTML.\n\n" + replace_data_uris(scripts[1], page_relative=True)

    style_seen = False

    def replace_style(match: re.Match[str]) -> str:
        nonlocal style_seen
        if style_seen:
            return ""
        style_seen = True
        return '<link rel="stylesheet" href="assets/styles.css">'

    index = STYLE_RE.sub(replace_style, html)
    script_number = 0

    def replace_script(match: re.Match[str]) -> str:
        nonlocal script_number
        script_number += 1
        filename = "app.js" if script_number == 1 else "ai-strategy-v3-public-info-patch.js"
        return f'<script src="assets/{filename}"></script>'

    index = SCRIPT_RE.sub(replace_script, index)
    (output / "assets" / "styles.css").write_text(css.rstrip() + "\n", encoding="utf-8")
    (output / "assets" / "app.js").write_text(js_main.rstrip() + "\n", encoding="utf-8")
    (output / "assets" / "ai-strategy-v3-public-info-patch.js").write_text(js_patch.rstrip() + "\n", encoding="utf-8")
    (output / "index.html").write_text(index, encoding="utf-8")

    print(f"source_bytes={source.stat().st_size}")
    print(f"index_bytes={(output / 'index.html').stat().st_size}")
    print(f"css_bytes={(output / 'assets' / 'styles.css').stat().st_size}")
    print(f"main_js_bytes={(output / 'assets' / 'app.js').stat().st_size}")
    print(f"patch_js_bytes={(output / 'assets' / 'ai-strategy-v3-public-info-patch.js').stat().st_size}")
    print(f"unique_image_assets={len(image_by_digest)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

# majiang

四川麻将 AI 策略项目，当前版本面向手机显示，并只依据牌局中的公开信息
进行行为推断。

## Open locally

Open [`index.html`](index.html) in a browser. The application logic and visual
assets are local; the stylesheet optionally loads decorative fonts from Google
Fonts/jsDelivr and falls back to system fonts when offline:

- `index.html` contains the page structure;
- `assets/styles.css` contains the extracted CSS;
- `assets/app.js` contains the main game and advisor logic;
- `assets/ai-strategy-v3-public-info-patch.js` contains the public-information
  strategy patch;
- `assets/images/` contains the extracted PNG/WebP visual assets.

For browsers that restrict local `file://` scripts, serve this directory with a
small static server:

```bash
python -m http.server 8000
```

Then open <http://localhost:8000/>.

## Project notes

- [`AI策略3_改进说明.md`](AI策略3_改进说明.md) records the strategy changes.
- [`AI策略3_验证摘要.json`](AI策略3_验证摘要.json) records the validation summary.
- `tools/split_html.py` documents and repeats the one-time split from the
  original self-contained HTML.

The original single-file HTML was split into maintainable assets without
changing the DOM, script order, or image bytes. The source monolith is not kept
in the current tree; it remains available in the original Downloads folder.

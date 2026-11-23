# Qirui Liu (刘骐瑞) — Academic Homepage & Technical Blog

An Apple-inspired personal academic website and Markdown technical blog built with zero build dependencies—ready for local preview or direct GitHub Pages deployment (`neuqrui.github.io`).

## Features
- **Apple UI Aesthetic**: Frosted-glass translucent header, SF Pro / PingFang SC typography, alternating `#FFFFFF` / `#F5F5F7` editorial bands, smooth Light & Dark modes, and continuous-curve cards.
- **Research Showcase**: Featured NeurIPS 2026 (`SAVeR²`) card, topic & venue segmented filtering, interactive **Quick Look** figure zoom lightbox, live GitHub star counters, and one-click **BibTeX** copy.
- **Technical Notes & Blog**: Native Markdown reader with **Mermaid architecture diagrams** (plus click-to-expand lightbox), Xcode-styled syntax-highlighted code blocks with copy buttons, GFM tables, reading progress bar, and sticky Table of Contents.
- **Spotlight Search (`⌘K`)**: Instant search across papers, notes, and quick actions.
- **Local `.md` Preview**: Open any local Markdown draft directly in the browser to preview it in the site's editorial layout.

## Local Preview
```bash
python3 -m http.server 8080
```
Then open `http://localhost:8080`.

## Adding a New Blog Note or Life Entry
- **Technical Notes**: Place your `.md` file inside `posts/` and add an entry to `data/posts.json`.
- **Life & Journal**: Place your `.md` file inside `life/` and add an entry to `data/life.json`.
- Refresh the page—your entry appears automatically with full Markdown, Mermaid, code highlighting, and `⌘K` Spotlight search indexing.

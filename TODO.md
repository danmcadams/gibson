# Palantir TODO

## Ideas

| # | Idea | Effort |
|---|------|--------|
| idea:1 | Sidebar search/filter — type to filter the file tree in real time (client-side) | very easy |
| idea:2 | Copy current link button — one-click copies `/?file=current-doc.md` to clipboard | very easy |
| idea:3 | Keyboard shortcuts — `/` focuses sidebar search, `[`/`]` navigates prev/next file | easy |
| idea:4 | Word count / read time — small stat in the doc bar | easy |
| idea:5 | Recent files — track last N visited docs in localStorage (cap at ~5 to avoid accumulation), show on home screen or top of sidebar | moderate |
| idea:6 | In-page TOC — floating or docked table of contents generated from headings | moderate |
| idea:7 | New file button — create a `.md` file directly from the UI | moderate |
| idea:8 | Full-text search — search across all doc content (requires server-side index or PHP scan) | involved |
| idea:9 | Resizable sidebar — drag to adjust sidebar width; use sessionStorage for width and collapsed state (no need to persist across sessions) | easy |
| idea:10 | Mermaid.js diagrams — render ` ```mermaid ``` ` fences as diagrams; client-side DOM transform + theme-aware config; Mermaid baked into Docker image at build time (no CDN dep). See [plan](/?file=palantir/mermaid-integration.md) | moderate |

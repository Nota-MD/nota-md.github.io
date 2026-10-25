# nota-md.github.io

Static website for [Nota](https://github.com/Nota-MD/Nota).

The site uses a deliberately small stack: semantic HTML, one stylesheet and one
short script for the typing and theme previews. The homepage is intentionally
editorial and restrained; the complete interface and document theme previews
load the CSS packages from `Nota-themes` directly.

## Local preview

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000/>.

## Languages

- `index.html` — English
- `zh-CN.html` — Simplified Chinese
- `ui-theme.html` — live interface-theme preview
- `doc-theme.html` — live document-theme preview

Keep navigation, release links and previews synchronized between both pages.

Theme files are copied into `themes/` so the deployed site does not depend on a
CDN cache catching up with the theme repository. The Typing videos and their
posters live in `assets/`.

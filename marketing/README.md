# Nota promotional posters

A three-image portrait carousel with a deliberate progression:

1. `01-plain-markdown.html` — plain Markdown files
2. `02-wysiwyg.html` — formatting rendered in place
3. `03-themes-extensions.html` — themes and Lua extensions

Each source page renders at exactly `1200 × 1600` pixels. The PNG files beside the HTML
sources are the publishable assets.

```sh
google-chrome --headless=new --disable-gpu --hide-scrollbars \
  --force-device-scale-factor=1 --window-size=1200,1600 \
  --virtual-time-budget=6000 --screenshot=marketing/promo-01.png \
  http://127.0.0.1:8000/marketing/01-plain-markdown.html
```

The design uses Nota's orange accent, the official wordmark and real application screenshots.
Text and UI details are rendered with HTML/CSS instead of an image model so they remain exact.

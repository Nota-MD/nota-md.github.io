const language = document.documentElement.lang.startsWith("zh") ? "zh" : "en";

function bindThemeSwatches(swatches, preview, label, kind) {
  for (const button of swatches) {
    button.addEventListener("click", () => {
      for (const other of swatches) {
        other.classList.toggle("active", other === button);
        other.setAttribute("aria-checked", String(other === button));
      }

      const theme = button.dataset[kind === "ui" ? "ui" : "theme"];
      preview.src =
        kind === "ui"
          ? `ui-theme.html?theme=${theme}&lang=${language}`
          : `doc-theme.html?theme=${theme}&compact=1&lang=${language}`;
      label.textContent = button.dataset.name;
    });
  }
}

bindThemeSwatches(
  [...document.querySelectorAll(".ui-pill")],
  document.querySelector("#home-ui-preview"),
  document.querySelector("#home-ui-name"),
  "ui",
);

bindThemeSwatches(
  [...document.querySelectorAll(".doc-pill")],
  document.querySelector("#home-doc-preview"),
  document.querySelector("#home-doc-name"),
  "doc",
);

if (location.hash) {
  const target = document.querySelector(location.hash);
  if (target) {
    requestAnimationFrame(() => target.scrollIntoView({ block: "start" }));
  }
}

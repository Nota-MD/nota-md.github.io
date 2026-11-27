const language = document.documentElement.lang.startsWith("zh") ? "zh" : "en";
const pairedDocumentTheme = {
  adwaita: "adwaita",
  ghub: "github",
  plasma: "minimal",
  macos: "minimal",
  windows: "minimal",
  windows10: "minimal",
  yaru: "adwaita",
  carbon: "ibm-documentation",
  cde: "cde",
  "cde-solaris": "cde-solaris",
};

function activateSwatches(swatches, selected) {
  for (const other of swatches) {
    other.classList.toggle("active", other === selected);
    other.setAttribute("aria-checked", String(other === selected));
  }
}

function bindThemeSwatches(swatches, preview, label, kind, onSelect) {
  for (const button of swatches) {
    button.addEventListener("click", () => {
      activateSwatches(swatches, button);

      const theme = button.dataset[kind === "ui" ? "ui" : "theme"];
      preview.src =
        kind === "ui"
          ? `ui-theme.html?theme=${theme}&lang=${language}`
          : `doc-theme.html?theme=${theme}&compact=1&lang=${language}`;
      label.textContent = button.dataset.name;
      onSelect?.(theme);
    });
  }
}

const documentSwatches = [...document.querySelectorAll(".doc-pill")];
const documentPreview = document.querySelector("#home-doc-preview");
const documentLabel = document.querySelector("#home-doc-name");

function selectDocumentTheme(theme) {
  const button = documentSwatches.find((item) => item.dataset.theme === theme);
  if (!button) return;
  activateSwatches(documentSwatches, button);
  documentPreview.src = `doc-theme.html?theme=${theme}&compact=1&lang=${language}`;
  documentLabel.textContent = button.dataset.name;
}

bindThemeSwatches(
  [...document.querySelectorAll(".ui-pill")],
  document.querySelector("#home-ui-preview"),
  document.querySelector("#home-ui-name"),
  "ui",
  (theme) => selectDocumentTheme(pairedDocumentTheme[theme]),
);

bindThemeSwatches(
  documentSwatches,
  documentPreview,
  documentLabel,
  "doc",
);

if (location.hash) {
  const target = document.querySelector(location.hash);
  if (target) {
    requestAnimationFrame(() => target.scrollIntoView({ block: "start" }));
  }
}

const root = document.documentElement;
const toggle = document.querySelector("[data-theme-toggle]");
const icon = document.querySelector("[data-theme-icon]");

function resolvedTheme() {
  if (root.dataset.theme) return root.dataset.theme;
  return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme) {
  root.dataset.theme = theme;
  localStorage.setItem("nota-theme", theme);
  if (icon) icon.textContent = theme === "dark" ? "☀" : "◐";
}

const saved = localStorage.getItem("nota-theme");
if (saved === "light" || saved === "dark") applyTheme(saved);
else if (icon) icon.textContent = resolvedTheme() === "dark" ? "☀" : "◐";

toggle?.addEventListener("click", () => {
  applyTheme(resolvedTheme() === "dark" ? "light" : "dark");
});

#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const pages = ["index.html", "zh-CN.html"];
const uiThemes = [
  "adwaita",
  "ghub",
  "plasma",
  "macos",
  "windows",
  "windows10",
  "yaru",
  "carbon",
  "cde",
  "cde-solaris",
];
const documentThemes = [
  "adwaita",
  "adwaita-dark",
  "minimal",
  "minimal-dark",
  "latex",
  "latex-dark",
  "cde",
  "cde-solaris",
  "vellum",
  "github",
  "github-dark",
  "ibm-documentation",
];

let failed = false;
function requireFile(file, message) {
  if (fs.existsSync(path.join(root, file))) return;
  console.error(`Missing ${file}: ${message}`);
  failed = true;
}

for (const page of pages) {
  requireFile(page, "localized landing page");
  const html = fs.readFileSync(path.join(root, page), "utf8");
  for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    const target = match[1].replaceAll("&amp;", "&").split(/[?#]/)[0];
    if (
      !target ||
      target.startsWith("//") ||
      target.startsWith("http") ||
      target.startsWith("mailto:")
    ) {
      continue;
    }
    requireFile(target, `referenced by ${page}`);
  }
}

for (const id of uiThemes) {
  requireFile(`themes/ui/${id}/theme.css`, "interface theme");
  requireFile(`assets/themes/ui/${id}.png`, "interface theme screenshot");
  requireFile(`assets/themes/ui/${id}-dark.png`, "dark interface screenshot");
}

for (const id of documentThemes) {
  requireFile(`themes/document/${id}/theme.css`, "document theme");
  requireFile(`assets/themes/document/${id}.png`, "document theme screenshot");
}

requireFile("assets/interface-themes-light.png", "light interface gallery");
requireFile("assets/interface-themes-dark.png", "dark interface gallery");
requireFile("assets/document-themes.png", "document theme gallery");

const script = fs.readFileSync(path.join(root, "script.js"), "utf8");
for (const pairing of [
  'ghub: "github"',
  'carbon: "ibm-documentation"',
  'cde: "cde"',
  '"cde-solaris": "cde-solaris"',
]) {
  if (!script.includes(pairing)) {
    console.error(`Missing UI/document pairing: ${pairing}`);
    failed = true;
  }
}

if (failed) process.exit(1);
console.log(
  JSON.stringify({
    pages: pages.length,
    interfaceThemes: uiThemes.length,
    documentThemes: documentThemes.length,
  }),
);

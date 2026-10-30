import {
  buildPackageZip,
  makeZip,
  recognizeAndConvert,
} from "../theme-converter-core.js";

let passed = 0;
const failures = [];

function test(name, body) {
  try {
    body();
    passed++;
    console.log(`  ✔ ${name}`);
  } catch (error) {
    failures.push(name);
    console.log(`  ✘ ${name}`);
    console.log(`      ${error instanceof Error ? error.message : error}`);
  }
}

function assert(value, message) {
  if (!value) throw new Error(message);
}

function bytes(value) {
  return new TextEncoder().encode(value);
}

console.log("\n【Theme converter】");

test("GTK package maps named colors and geometry", () => {
  const entries = [
    {
      path: "Sample/gtk-3.0/gtk.css",
      data: bytes(`
        @define-color theme_bg_color #f6f5f4;
        @define-color theme_fg_color #241f31;
        @define-color theme_base_color #ffffff;
        @define-color theme_selected_bg_color #3584e4;
        @define-color theme_selected_fg_color #ffffff;
        headerbar { min-height: 38px; }
        button { border-radius: 10px; }
      `),
    },
    {
      path: "Sample/index.theme",
      data: bytes("[Desktop Entry]\nName=Sample GTK\n"),
    },
  ];
  const { recognized, theme } = recognizeAndConvert(entries);
  assert(recognized.kind === "gtk", "GTK package was not recognized");
  assert(theme.name === "Sample GTK", "index.theme name was not used");
  assert(theme.light.palette.bg === "#f6f5f4", "background mismatch");
  assert(theme.light.palette.accent === "#3584e4", "accent mismatch");
  assert(theme.light.geometry.radius === 10, "radius mismatch");
});

test("KDE color scheme maps Window, View and Selection", () => {
  const entries = [
    {
      path: "Look/contents/colors",
      data: bytes(`
        [Colors:Window]
        BackgroundNormal=44,55,70
        ForegroundNormal=233,229,223
        [Colors:View]
        BackgroundNormal=31,40,51
        ForegroundNormal=233,229,223
        [Colors:Selection]
        BackgroundNormal=189,91,0
        ForegroundNormal=255,255,255
      `),
    },
    {
      path: "Look/metadata.json",
      data: bytes(JSON.stringify({ KPlugin: { Name: "KDE Sample" } })),
    },
  ];
  const { recognized, theme } = recognizeAndConvert(entries);
  assert(recognized.kind === "kde", "KDE package was not recognized");
  assert(theme.name === "KDE Sample", "KDE metadata name was not used");
  assert(theme.light.palette.bg === "#2c3746", "window background mismatch");
  assert(theme.light.palette.raised === "#1f2833", "view background mismatch");
  assert(theme.light.palette.accent === "#bd5b00", "selection mismatch");
});

test("unrecognized archives are rejected", () => {
  let message = "";
  try {
    recognizeAndConvert([{ path: "assets/photo.png", data: new Uint8Array([1, 2, 3]) }]);
  } catch (error) {
    message = String(error);
  }
  assert(message.includes("No installable GTK or KDE"), "missing explicit rejection");
});

test("generated Nota package is a readable ZIP", () => {
  const entries = [
    {
      path: "Sample/gtk-4.0/gtk.css",
      data: bytes("@define-color theme_bg_color #ffffff; @define-color theme_fg_color #000000;"),
    },
    { path: "Sample/index.theme", data: bytes("[Desktop Entry]\nName=ZIP Test\n") },
  ];
  const converted = recognizeAndConvert(entries);
  const zip = buildPackageZip({ entries, ...converted });
  const view = new DataView(zip.buffer, zip.byteOffset, zip.byteLength);
  assert(view.getUint32(0, true) === 0x04034b50, "ZIP local header missing");
  assert(new TextDecoder().decode(zip).includes("themes/ui/"), "Nota package path missing");
});

test("generic ZIP writer retains UTF-8 names", () => {
  const zip = makeZip({ "中文/theme.css": "body {}" });
  assert(new TextDecoder().decode(zip).includes("中文/theme.css"), "UTF-8 filename missing");
});

console.log(`\n通过 ${passed} 条，失败 ${failures.length} 条`);
if (failures.length) process.exitCode = 1;

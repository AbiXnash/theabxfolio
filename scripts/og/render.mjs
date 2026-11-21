// Renders scripts/og/og-image.html → public/og-image.png (1200×630) with headless Chrome.
// Usage: node scripts/og/render.mjs   (needs Google Chrome installed; set CHROME_PATH to override)
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const html = resolve(here, "og-image.html");
const out = resolve(here, "../../public/og-image.png");
const chrome =
  process.env.CHROME_PATH ??
  ["/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", "/usr/bin/google-chrome", "/usr/bin/chromium"].find(existsSync);

if (!chrome) throw new Error("Chrome not found — set CHROME_PATH");

execFileSync(chrome, [
  "--headless=new",
  "--disable-gpu",
  "--hide-scrollbars",
  "--force-device-scale-factor=1",
  "--window-size=1200,630",
  "--virtual-time-budget=3000",
  "--allow-file-access-from-files",
  `--screenshot=${out}`,
  pathToFileURL(html).href,
], { stdio: "ignore" });

console.log(`wrote ${out}`);

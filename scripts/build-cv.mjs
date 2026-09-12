/* ============================================================
   build-cv.mjs — renders /cv/print to public/media/Ammara_Noor_CV.pdf.

   The PDF is not authored anywhere: it is printed from the same route the
   site serves, which is itself rendered from src/content/cv.ts. Change the
   content file, re-run this, and the download link is current — there is no
   second copy of the CV to fall out of date.

   Real selectable text (not an image), one column, standard headings — see
   the ATS rules in src/content/cv.ts.

   Requires a running dev/production server. Start one first:
     npm run dev            (then) node scripts/build-cv.mjs
   Optional args: node scripts/build-cv.mjs [baseUrl] [outPath]
   ============================================================ */

import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";

const BASE = process.argv[2] ?? "http://localhost:3000";
const OUT = process.argv[3] ?? "public/media/Ammara_Noor_CV.pdf";

const CHROME = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
].find((p) => fs.existsSync(p));
if (!CHROME) throw new Error("No Chrome/Edge found");

fs.mkdirSync(path.dirname(OUT), { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--hide-scrollbars"],
});
const page = await browser.newPage();
await page.goto(`${BASE}/cv/print`, { waitUntil: "networkidle0", timeout: 120_000 });

// Print backgrounds off on purpose: an ATS parser reads the text layer, and a
// background-free page is also what prints legibly on someone's office
// printer. Margins are set in the route's @page rule, not here.
await page.pdf({
  path: OUT,
  format: "A4",
  printBackground: false,
  preferCSSPageSize: true,
});

// A one-page CV that silently became two pages is the failure this catches.
// The DOM estimate is the useful diagnostic (it says how much to trim); the
// page count read back out of the PDF is the actual gate.
const fill = await page.evaluate(() => {
  const el = document.querySelector(".ats");
  return el ? el.scrollHeight / (297 * (96 / 25.4)) : null;
});

await browser.close();

const bytes = fs.readFileSync(OUT);
const count = /\/Count\s+(\d+)/.exec(bytes.toString("latin1"));
const pdfPages = count ? Number(count[1]) : null;

console.log(`+ ${OUT}  ${(bytes.length / 1024).toFixed(0)}KB`);
if (fill != null) console.log(`  content fills ≈ ${(fill * 100).toFixed(0)}% of one A4 page`);
console.log(`  pdf pages: ${pdfPages ?? "unknown"}`);

if (pdfPages !== 1) {
  console.error("  ! NOT ONE PAGE — trim src/content/cv.ts before shipping this.");
  process.exitCode = 1;
}

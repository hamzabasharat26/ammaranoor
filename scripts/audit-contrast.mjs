/* ============================================================
   audit-contrast.mjs — DEV ONLY. Walks every text node on every route and
   reports anything under the WCAG AA threshold for its size, in both themes.

   Why this exists rather than eyeballing it: the painted background is not the
   element's own `background-color`. Tailwind's `color-mix()` computes to
   `oklab(...)`, alpha layers stack, and a naive parser reads `oklab(0.99 …)` as
   near-black and reports the whole nav as failing. This resolves every colour
   through a canvas — the browser does the conversion — and composites the
   ancestor stack before measuring.

   Usage: npm run build && npx next start -p 3000, then
          node scripts/audit-contrast.mjs [baseUrl]
   ============================================================ */

import fs from "node:fs";
import puppeteer from "puppeteer-core";

const BASE = process.argv[2] ?? "http://localhost:3000";
const ROUTES = ["/", "/work", "/work/magicqc-size-measurement", "/cv"];

const CHROME = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
].find((p) => fs.existsSync(p));
if (!CHROME) throw new Error("No Chrome found");

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  defaultViewport: { width: 1440, height: 2000 },
});
const page = await browser.newPage();
let total = 0;

async function audit(url, theme) {
  await page.goto(BASE + url, { waitUntil: "networkidle0" });
  if (theme) await page.evaluate((t) => { document.documentElement.dataset.theme = t; }, theme);
  await new Promise((r) => setTimeout(r, 1200));

  const fails = await page.evaluate(() => {
    const cvs = document.createElement("canvas");
    cvs.width = cvs.height = 1;
    const ctx = cvs.getContext("2d", { willReadFrequently: true });
    const cache = new Map();
    const rgba = (str) => {
      if (cache.has(str)) return cache.get(str);
      ctx.clearRect(0, 0, 1, 1);
      ctx.fillStyle = "#000";
      ctx.fillStyle = str;
      ctx.fillRect(0, 0, 1, 1);
      const d = ctx.getImageData(0, 0, 1, 1).data;
      const v = [d[0], d[1], d[2], d[3] / 255];
      cache.set(str, v);
      return v;
    };
    const over = (fg, bg) => fg.slice(0, 3).map((c, i) => c * fg[3] + bg[i] * (1 - fg[3]));
    const lum = (c) => {
      const [r, g, b] = c.map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    const bgOf = (el) => {
      const stack = [];
      for (let e = el; e; e = e.parentElement) stack.push(rgba(getComputedStyle(e).backgroundColor));
      let acc = [255, 255, 255];
      for (let i = stack.length - 1; i >= 0; i--) acc = over(stack[i], acc);
      return acc;
    };

    const out = [];
    const seen = new Set();
    document.querySelectorAll("p,span,li,dd,dt,h1,h2,h3,a,b,summary,figcaption,button").forEach((el) => {
      const t = el.textContent?.trim();
      if (!t || t.length < 3) return;
      if (el.children.length && el.querySelector("p,span,li,h1,h2,h3")) return;
      const cs = getComputedStyle(el);
      if (cs.visibility === "hidden" || cs.opacity === "0") return;
      const r = el.getBoundingClientRect();
      if (r.width < 2 || r.height < 2) return;
      const fg = rgba(cs.color);
      if (fg[3] < 0.05) return;
      const bg = bgOf(el);
      const ratio = (() => {
        const L1 = lum(over(fg, bg));
        const L2 = lum(bg);
        return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
      })();
      const px = parseFloat(cs.fontSize);
      const need = px >= 24 || (px >= 18.66 && parseInt(cs.fontWeight) >= 700) ? 3 : 4.5;
      const key = cs.color + "|" + px + "|" + t.slice(0, 20);
      if (ratio < need && !seen.has(key)) {
        seen.add(key);
        out.push({ t: t.slice(0, 44), color: cs.color, size: px, ratio: +ratio.toFixed(2), need });
      }
    });
    return out;
  });

  total += fails.length;
  console.log(`${url} [${theme ?? "light"}] — ${fails.length || "no"} failures`);
  fails.slice(0, 14).forEach((f) => console.log(`   ${f.ratio} < ${f.need}  ${f.size}px  ${f.color}  ${f.t}`));
}

for (const r of ROUTES) await audit(r);
await audit("/", "dark");
await audit("/work/magicqc-size-measurement", "dark");
await browser.close();

// NOTE: text drawn over a photograph or a sibling gradient scrim reads as a
// false positive here — this only sees CSS backgrounds on the ancestor chain.
// Check those by eye.
if (total) process.exitCode = 1;

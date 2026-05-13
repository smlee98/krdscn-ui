// Per-component visual diff for KRDS wrappers.
// Splits /krds-verify into per-section bounding boxes (one per <Section title="Phase X — Foo" />),
// pixelmatches each section between ?theme=light and ?theme=dark,
// and writes a markdown report + per-component diff PNGs to .omc/krds-verify/per-component/.
//
// Run: yarn dev (HTTPS on https://localhost:8080)
//      node scripts/krds/visual-diff-per-component.mjs

import { chromium } from "@playwright/test";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";
import fs from "node:fs";
import path from "node:path";

const ROOT = new URL("../../", import.meta.url).pathname;
const OUT_DIR = path.join(ROOT, ".omc/krds-verify/per-component");
const REPORT_PATH = path.join(ROOT, ".omc/krds-verify/per-component-report.md");
const BASE_URL = process.env.KRDS_VERIFY_URL ?? "https://localhost:8080";
const VERIFY_PATH = "/";

fs.mkdirSync(OUT_DIR, { recursive: true });

function cropPng(srcPng, x, y, w, h) {
  const out = new PNG({ width: w, height: h });
  PNG.bitblt(srcPng, out, x, y, w, h, 0, 0);
  return out;
}

async function captureSections(page, theme) {
  await page.goto(`${BASE_URL}${VERIFY_PATH}?theme=${theme}`, {
    waitUntil: "networkidle",
    timeout: 30000
  });
  await page.waitForSelector("[data-krds-comparison-grid]", { timeout: 10000 });
  await page.waitForTimeout(500);

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(100);

  const sections = await page.evaluate(() => {
    const grid = document.querySelector("[data-krds-comparison-grid]");
    if (!grid) return [];
    const headings = Array.from(grid.querySelectorAll("h2"));
    const result = [];
    for (let i = 0; i < headings.length; i++) {
      const start = headings[i];
      const end = headings[i + 1];
      const startRect = start.getBoundingClientRect();
      const endY = end ? end.getBoundingClientRect().top : grid.getBoundingClientRect().bottom;
      const text = start.textContent?.trim() ?? `section-${i}`;
      const m = text.match(/Phase\s+\d+(?:\.\d+)?\s*—\s*(.+)$/);
      const name = m ? m[1].trim() : text;
      result.push({
        name,
        title: text,
        x: Math.max(0, Math.floor(startRect.left + window.scrollX)),
        y: Math.max(0, Math.floor(startRect.top + window.scrollY)),
        width: Math.ceil(startRect.width),
        height: Math.max(10, Math.ceil(endY - startRect.top - 8))
      });
    }
    return result;
  });

  const fullBuf = await page.screenshot({ fullPage: true });
  const fullPng = PNG.sync.read(fullBuf);

  const screenshots = {};
  for (const s of sections) {
    if (s.height < 10 || s.width < 10) continue;
    const w = Math.min(s.width, fullPng.width - s.x);
    const h = Math.min(s.height, fullPng.height - s.y);
    if (w <= 0 || h <= 0) continue;
    const cropped = cropPng(fullPng, s.x, s.y, w, h);
    screenshots[s.name] = { meta: { ...s, width: w, height: h }, png: cropped };
  }
  return screenshots;
}

function diff(lightPng, darkPng) {
  const w = Math.min(lightPng.width, darkPng.width);
  const h = Math.min(lightPng.height, darkPng.height);
  const diffPng = new PNG({ width: w, height: h });
  const lightCrop = lightPng.width === w && lightPng.height === h ? lightPng : cropPng(lightPng, 0, 0, w, h);
  const darkCrop = darkPng.width === w && darkPng.height === h ? darkPng : cropPng(darkPng, 0, 0, w, h);
  const px = pixelmatch(lightCrop.data, darkCrop.data, diffPng.data, w, h, { threshold: 0.1 });
  return {
    px,
    diffPng,
    w,
    h,
    lightW: lightPng.width,
    darkW: darkPng.width,
    lightH: lightPng.height,
    darkH: darkPng.height
  };
}

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ ignoreHTTPSErrors: true });
  const page = await context.newPage();
  await page.setViewportSize({ width: 1280, height: 900 });

  console.log("Capturing per-component screenshots: light...");
  const lightShots = await captureSections(page, "light");
  console.log(`  Captured ${Object.keys(lightShots).length} sections`);

  console.log("Capturing per-component screenshots: dark...");
  const darkShots = await captureSections(page, "dark");
  console.log(`  Captured ${Object.keys(darkShots).length} sections`);

  await browser.close();

  const rows = [];
  for (const name of Object.keys(lightShots)) {
    if (!darkShots[name]) {
      rows.push({ name, status: "MISSING_DARK", px: -1, area: 0, ratio: 0 });
      continue;
    }
    const result = diff(lightShots[name].png, darkShots[name].png);
    const safeName = name.replace(/[^a-z0-9]/gi, "-").toLowerCase();
    const lightPath = path.join(OUT_DIR, `${safeName}-light.png`);
    const darkPath = path.join(OUT_DIR, `${safeName}-dark.png`);
    const diffPath = path.join(OUT_DIR, `${safeName}-diff.png`);
    fs.writeFileSync(lightPath, PNG.sync.write(lightShots[name].png));
    fs.writeFileSync(darkPath, PNG.sync.write(darkShots[name].png));
    fs.writeFileSync(diffPath, PNG.sync.write(result.diffPng));
    const area = result.w * result.h;
    rows.push({
      name,
      status: "OK",
      px: result.px,
      area,
      ratio: area > 0 ? result.px / area : 0,
      dim: `${result.w}x${result.h}`,
      sizeMatch: result.lightW === result.darkW && result.lightH === result.darkH,
      lightSize: `${result.lightW}x${result.lightH}`,
      darkSize: `${result.darkW}x${result.darkH}`
    });
  }

  rows.sort((a, b) => b.ratio - a.ratio);

  let md = "# KRDS Wrappers — Per-Component Dark Invariance Report\n\n";
  md += `Generated: ${new Date().toISOString()}\n`;
  md += `Source: \`${VERIFY_PATH}?theme={light,dark}\` on \`${BASE_URL}\`\n\n`;
  md += "Each row pixelmatches the same DOM section captured at `?theme=light` vs `?theme=dark`.\n";
  md +=
    "Sorted by mismatch density (high → low). Real dark-mode leaks should produce >5% ratios; OS-level font-rendering noise typically <1%.\n\n";
  md += "| # | Component | Px Diff | Area | Mismatch | Dim (L/D) | Verdict |\n";
  md += "|---|---|---:|---:|---:|---|---|\n";

  for (let i = 0; i < rows.length; i++) {
    const r = rows[i];
    if (r.status !== "OK") {
      md += `| ${i + 1} | ${r.name} | – | – | – | – | ${r.status} |\n`;
      continue;
    }
    const pct = (r.ratio * 100).toFixed(3);
    const verdict =
      r.ratio > 0.05
        ? "🚨 LEAK SUSPECTED"
        : r.ratio > 0.01
          ? "⚠️ INVESTIGATE"
          : r.ratio > 0.001
            ? "✓ noise"
            : "✓ clean";
    const dimNote = r.sizeMatch ? r.dim : `${r.lightSize} / ${r.darkSize} (mismatch)`;
    md += `| ${i + 1} | ${r.name} | ${r.px} | ${r.area} | ${pct}% | ${dimNote} | ${verdict} |\n`;
  }

  const sumPx = rows.reduce((a, r) => a + (r.px > 0 ? r.px : 0), 0);
  const sumArea = rows.reduce((a, r) => a + (r.area > 0 ? r.area : 0), 0);
  md += `\n**Totals:** ${rows.length} components, ${sumPx} px diff over ${sumArea} px area = ${((sumPx / sumArea) * 100).toFixed(4)}% global mismatch.\n`;
  md += `\nPer-component PNGs (light/dark/diff) saved to \`.omc/krds-verify/per-component/\`.\n`;

  fs.writeFileSync(REPORT_PATH, md);
  console.log(`\nReport written: ${REPORT_PATH}`);
  console.log(`PNGs in: ${OUT_DIR}`);

  console.log("\nTop 5 mismatch components:");
  for (let i = 0; i < Math.min(5, rows.length); i++) {
    const r = rows[i];
    if (r.status === "OK") {
      console.log(`  ${i + 1}. ${r.name}: ${r.px} px (${(r.ratio * 100).toFixed(3)}%)`);
    }
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});

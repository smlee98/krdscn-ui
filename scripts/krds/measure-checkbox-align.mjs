// Measure icon-vs-label visual alignment for KRDS Checkbox.
// Same Canvas TextMetrics approach as measure-radio-align.mjs.
import { chromium } from "@playwright/test";

const URL = process.env.URL ?? "https://localhost:8080/components/selection/checkbox";

const browser = await chromium.launch();
const ctx = await browser.newContext({
  ignoreHTTPSErrors: true,
  viewport: { width: 1280, height: 1600 },
  deviceScaleFactor: 2
});
const page = await ctx.newPage();
await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 90000 });
await page.waitForSelector('[data-slot="krds-checkbox"]', { timeout: 90000 });
await page.waitForFunction(() => document.fonts.ready.then(() => true));
await page.waitForTimeout(500);

const measurements = await page.evaluate(() => {
  function visualCenterY(span) {
    const text = span.textContent ?? "";
    const range = document.createRange();
    range.selectNodeContents(span);
    const lineRect = range.getBoundingClientRect();
    const styles = getComputedStyle(span);
    const canvas = document.createElement("canvas");
    const cctx = canvas.getContext("2d");
    cctx.font = `${styles.fontWeight} ${styles.fontSize} ${styles.fontFamily}`;
    const m = cctx.measureText(text);
    const ascent = m.actualBoundingBoxAscent;
    const descent = m.actualBoundingBoxDescent;
    const baselineProbe = document.createElement("span");
    baselineProbe.style.display = "inline-block";
    baselineProbe.style.verticalAlign = "baseline";
    baselineProbe.style.width = "0";
    baselineProbe.style.height = "0";
    span.prepend(baselineProbe);
    const baselineY = baselineProbe.getBoundingClientRect().top;
    baselineProbe.remove();
    const inkTop = baselineY - ascent;
    const inkBottom = baselineY + descent;
    const inkCenter = (inkTop + inkBottom) / 2;
    return {
      text: text.slice(0, 8),
      fontSize: styles.fontSize,
      lineRect: { top: lineRect.top, height: lineRect.height, centerY: lineRect.top + lineRect.height / 2 },
      baselineY,
      ascent,
      descent,
      inkCenter
    };
  }

  const items = Array.from(document.querySelectorAll('[data-slot="krds-checkbox"]'));
  const results = [];
  for (const item of items.slice(0, 8)) {
    const iconWrap = item.querySelector('[aria-hidden="true"]');
    const labelContainer = iconWrap?.nextElementSibling;
    const labelSpan = labelContainer?.firstElementChild;
    if (!iconWrap || !labelSpan) continue;
    const iconRect = iconWrap.getBoundingClientRect();
    const iconCenter = iconRect.top + iconRect.height / 2;
    const visual = visualCenterY(labelSpan);
    results.push({
      label: visual.text,
      iconRect: { top: iconRect.top, height: iconRect.height, centerY: iconCenter },
      labelVisual: visual,
      diffPx: +(iconCenter - visual.inkCenter).toFixed(3)
    });
  }
  return results;
});

console.log(JSON.stringify(measurements, null, 2));
await browser.close();

// Measure icon-vs-label visual alignment for KRDS Radio
// Uses Canvas TextMetrics to find the glyph ink-box center of the first text line,
// then compares to the icon wrapper's geometric center.
import { chromium } from "@playwright/test";

const URL = process.env.URL ?? "https://localhost:8080/components/selection/radio-group";

const browser = await chromium.launch();
const ctx = await browser.newContext({
  ignoreHTTPSErrors: true,
  viewport: { width: 1280, height: 1600 },
  deviceScaleFactor: 2
});
const page = await ctx.newPage();
await page.goto(URL, { waitUntil: "networkidle" });
// wait for fonts
await page.waitForFunction(() => document.fonts.ready.then(() => true));
await page.waitForTimeout(300);

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
    // Canvas baseline is at y=0 in measureText.
    // actualBoundingBoxAscent/Descent give ink box extents relative to baseline.
    const ascent = m.actualBoundingBoxAscent;
    const descent = m.actualBoundingBoxDescent;
    // visual ink-box center, measured from baseline:
    //   inkCenterAboveBaseline = (ascent - descent) / 2  (positive = above baseline)
    // we need to know where the baseline is inside the line rect.
    // Use a trick: insert a zero-width inline element to read baseline-aligned position.
    const baselineProbe = document.createElement("span");
    baselineProbe.style.display = "inline-block";
    baselineProbe.style.verticalAlign = "baseline";
    baselineProbe.style.width = "0";
    baselineProbe.style.height = "0";
    span.prepend(baselineProbe);
    const baselineY = baselineProbe.getBoundingClientRect().top; // top == baseline for h=0,vAlign=baseline
    baselineProbe.remove();
    const inkTop = baselineY - ascent;
    const inkBottom = baselineY + descent;
    const inkCenter = (inkTop + inkBottom) / 2;
    return {
      text: text.slice(0, 6),
      fontSize: styles.fontSize,
      lineHeight: styles.lineHeight,
      lineRect: { top: lineRect.top, height: lineRect.height, centerY: lineRect.top + lineRect.height / 2 },
      baselineY,
      ascent,
      descent,
      inkTop,
      inkBottom,
      inkCenter
    };
  }

  const radios = Array.from(document.querySelectorAll('[data-slot="krds-radio"]'));
  const results = [];
  for (const radio of radios.slice(0, 6)) {
    const iconWrap = radio.querySelector('[aria-hidden="true"]');
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
      diffPx: +(iconCenter - visual.inkCenter).toFixed(3) // positive = icon below glyph center
    });
  }
  return results;
});

console.log(JSON.stringify(measurements, null, 2));
await browser.close();

// Side-by-side parity capture: KRDS wrappers (our impl) vs official KRDS Storybook.
// Picks the canonical "default" story per wrapped component, screenshots both,
// and writes paired PNGs + a markdown report to .omc/krds-verify/storybook-parity/.
//
// Run: yarn dev (HTTPS on https://localhost:8080)
//      node scripts/krds/visual-diff-vs-storybook.mjs

import { chromium } from "@playwright/test";
import { PNG } from "pngjs";
import fs from "node:fs";
import path from "node:path";

const ROOT = new URL("../../", import.meta.url).pathname;
const OUT_DIR = path.join(ROOT, ".omc/krds-verify/storybook-parity");
const REPORT_PATH = path.join(ROOT, ".omc/krds-verify/storybook-parity-report.md");
const WRAPPER_BASE = process.env.KRDS_VERIFY_URL ?? "https://localhost:8080";
const STORYBOOK_BASE = "https://www.krds.go.kr/storybook/react";

fs.mkdirSync(OUT_DIR, { recursive: true });

// Map our wrapper section names → canonical Storybook story ID.
// "Default" preferred; for components without a default-named story, picked the most representative.
const COMPONENT_MAP = [
  { wrapper: "Button", storyId: "components-button--primary" },
  { wrapper: "TextInput", storyId: "components-textinput--default" },
  { wrapper: "Textarea", storyId: "components-textarea--default" },
  { wrapper: "Badge", storyId: "components-badge--default" },
  { wrapper: "Tag", storyId: "components-tag--default" },
  { wrapper: "Checkbox / CheckboxGroup / CheckboxChip", storyId: "components-checkbox--default" },
  { wrapper: "Radio / RadioGroup / RadioChip", storyId: "components-radio--default" },
  { wrapper: "ToggleSwitch", storyId: "components-toggleswitch--default" },
  { wrapper: "Select", storyId: "components-select--default" },
  { wrapper: "DateInput", storyId: "components-dateinput--default" },
  { wrapper: "FileUpload", storyId: "components-fileupload--default" },
  { wrapper: "Modal (8 sub-parts)", storyId: "components-modal--default" },
  { wrapper: "AlertModal", storyId: "components-modal--default" },
  { wrapper: "Tab", storyId: "components-tab--default" },
  { wrapper: "Accordion", storyId: "components-accordion--default" },
  { wrapper: "Disclosure", storyId: "components-disclosure--default" },
  { wrapper: "Breadcrumb", storyId: "components-breadcrumb--default" },
  { wrapper: "Pagination", storyId: "components-pagination--default" },
  { wrapper: "Tooltip", storyId: "components-tooltip--default" },
  { wrapper: "Spinner", storyId: "components-spinner--default" },
  { wrapper: "StepIndicator", storyId: "components-stepindicator--default" },
  { wrapper: "Link", storyId: "components-link--default" },
  { wrapper: "TextList", storyId: "components-textlist--default" },
  { wrapper: "Calendar", storyId: "components-calendar--default" },
  {
    wrapper: "Modal (open)",
    storyId: "components-modal--default",
    interaction: { kind: "click", wrapperLabel: "default (md)" }
  },
  {
    wrapper: "AlertModal (open)",
    storyId: "components-modal--default",
    interaction: { kind: "click", wrapperLabel: "confirm dialog" }
  },
  {
    wrapper: "Tooltip (visible)",
    storyId: "components-tooltip--default",
    interaction: { kind: "hover", wrapperLabel: "vertical (top)" }
  },
  {
    wrapper: "DateInput (popover)",
    storyId: "components-dateinput--default",
    interaction: {
      kind: "click",
      wrapperLabel: "default (medium)",
      section: "Phase 2 — DateInput",
      triggerSelector: 'button[aria-haspopup="dialog"]'
    }
  },
  { wrapper: "ContextualHelp", storyId: "components-contextualhelp--default" },
  { wrapper: "HelpPanel", storyId: "components-helppanel--default" },
  { wrapper: "Table", storyId: "components-table--default" },
  { wrapper: "MainMenu", storyId: "components-mainmenu--default" },
  { wrapper: "LanguageSwitcher", storyId: "components-languageswitcher--default" },
  { wrapper: "Resize", storyId: "components-resize--default" },
  { wrapper: "SideNavigation", storyId: "components-sidenavigation--default" },
  { wrapper: "InPageNavigation", storyId: "components-inpagenavigation--default" },
  { wrapper: "CoachMark", storyId: "components-coachmark--default" },
  { wrapper: "TutorialPanel", storyId: "components-tutorialpanel--default" },
  { wrapper: "CriticalAlert", storyId: "components-criticalalert--default" },
  { wrapper: "Identifier", storyId: "components-identifier--default" },
  { wrapper: "Masthead", storyId: "components-masthead--default" },
  { wrapper: "SkipLink", storyId: "components-skiplink--default" },
  { wrapper: "StructuredList", storyId: "components-structuredlist--default" },
  { wrapper: "Footer", storyId: "components-footer--default" },
  { wrapper: "Header", storyId: "components-header--default" }
];

function safeName(s) {
  return s.replace(/[^a-z0-9]/gi, "-").toLowerCase();
}

function cropPng(srcPng, x, y, w, h) {
  const out = new PNG({ width: w, height: h });
  PNG.bitblt(srcPng, out, x, y, w, h, 0, 0);
  return out;
}

function compose(left, right, gap = 16, label = "") {
  const w = left.width + right.width + gap;
  const h = Math.max(left.height, right.height);
  const out = new PNG({ width: w, height: h });
  // White background
  for (let i = 0; i < out.data.length; i += 4) {
    out.data[i] = 255;
    out.data[i + 1] = 255;
    out.data[i + 2] = 255;
    out.data[i + 3] = 255;
  }
  PNG.bitblt(left, out, 0, 0, left.width, left.height, 0, 0);
  PNG.bitblt(right, out, 0, 0, right.width, right.height, left.width + gap, 0);
  return out;
}

async function captureWrapperSections(page) {
  await page.goto(`${WRAPPER_BASE}/?theme=light`, {
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
  const map = {};
  for (const s of sections) {
    if (s.height < 10) continue;
    const w = Math.min(s.width, fullPng.width - s.x);
    const h = Math.min(s.height, fullPng.height - s.y);
    if (w <= 0 || h <= 0) continue;
    map[s.name] = cropPng(fullPng, s.x, s.y, w, h);
  }
  return map;
}

async function captureStorybookStory(page, storyId) {
  const url = `${STORYBOOK_BASE}/iframe.html?id=${storyId}&viewMode=story`;
  await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(800);

  const bbox = await page.evaluate(() => {
    const root = document.getElementById("storybook-root") || document.querySelector("#root");
    if (!root) return null;
    const r = root.getBoundingClientRect();
    return {
      x: Math.max(0, Math.floor(r.left + window.scrollX)),
      y: Math.max(0, Math.floor(r.top + window.scrollY)),
      width: Math.ceil(r.width),
      height: Math.max(10, Math.ceil(r.height))
    };
  });

  const fullBuf = await page.screenshot({ fullPage: true });
  const fullPng = PNG.sync.read(fullBuf);
  if (!bbox || bbox.width <= 0 || bbox.height <= 0) {
    return fullPng;
  }
  const w = Math.min(bbox.width, fullPng.width - bbox.x);
  const h = Math.min(bbox.height, fullPng.height - bbox.y);
  if (w <= 0 || h <= 0) return fullPng;
  return cropPng(fullPng, bbox.x, bbox.y, w, h);
}

async function captureWrapperInteractiveSection(page, sectionName, wrapperLabel, interaction) {
  // Navigate fresh to reset any previously open overlays
  await page.goto(`${WRAPPER_BASE}/?theme=light`, {
    waitUntil: "networkidle",
    timeout: 30000
  });
  await page.waitForSelector("[data-krds-comparison-grid]", { timeout: 10000 });
  await page.waitForTimeout(800);

  // Row structure: <div flex><div>{label}</div><div>{content}</div></div>
  // Some labels (e.g. "default (medium)") occur in multiple sections — when an h2 section header
  // is provided, resolve the label among following-sibling rows so we pick the correct section's
  // row rather than the first global match.
  let labelDiv;
  if (interaction.section) {
    const sectionHeader = page.getByRole("heading", { name: interaction.section, exact: true }).first();
    await sectionHeader.waitFor({ state: "visible", timeout: 8000 });
    await sectionHeader.scrollIntoViewIfNeeded();
    labelDiv = sectionHeader
      .locator("xpath=following-sibling::div")
      .filter({ hasText: wrapperLabel })
      .first()
      .getByText(wrapperLabel, { exact: true })
      .first();
  } else {
    labelDiv = page.getByText(wrapperLabel, { exact: true }).first();
  }
  await labelDiv.waitFor({ state: "visible", timeout: 8000 });
  await labelDiv.scrollIntoViewIfNeeded();
  const rowDiv = labelDiv.locator("xpath=..").first();
  const triggerSelector = interaction.triggerSelector ?? "button, [role='button']";
  const trigger = rowDiv.locator(triggerSelector).first();
  await trigger.waitFor({ state: "visible", timeout: 8000 });

  if (interaction.kind === "click") {
    await trigger.click();
  } else if (interaction.kind === "hover") {
    await trigger.hover();
  }
  await page.waitForTimeout(700);

  // Full-viewport screenshot — overlays/tooltips render in portals at document level
  const buf = await page.screenshot();
  const png = PNG.sync.read(buf);

  // Dismiss the open overlay before returning so subsequent captures are not polluted
  await page.keyboard.press("Escape");
  if (interaction.kind === "hover") {
    await page.mouse.click(10, 10);
  }
  await page.waitForTimeout(200);

  return png;
}

async function run() {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ ignoreHTTPSErrors: true, viewport: { width: 1280, height: 900 } });
  const wrapperPage = await ctx.newPage();
  const sbPage = await ctx.newPage();

  console.log("Capturing wrapper sections (light)...");
  const wrappers = await captureWrapperSections(wrapperPage);
  console.log(`  ${Object.keys(wrappers).length} sections`);

  const rows = [];
  for (const entry of COMPONENT_MAP) {
    // Interactive entries are handled separately in the open-state loop below
    if (entry.interaction) continue;
    const wrapperPng = wrappers[entry.wrapper];
    if (!wrapperPng) {
      console.log(`  SKIP ${entry.wrapper}: no wrapper section`);
      rows.push({ ...entry, status: "no-wrapper" });
      continue;
    }
    process.stdout.write(`  ${entry.wrapper.padEnd(45)} ← ${entry.storyId} ... `);
    try {
      const sbPng = await captureStorybookStory(sbPage, entry.storyId);
      const composite = compose(wrapperPng, sbPng);
      const slug = safeName(entry.wrapper);
      fs.writeFileSync(path.join(OUT_DIR, `${slug}-wrapper.png`), PNG.sync.write(wrapperPng));
      fs.writeFileSync(path.join(OUT_DIR, `${slug}-storybook.png`), PNG.sync.write(sbPng));
      fs.writeFileSync(path.join(OUT_DIR, `${slug}-side-by-side.png`), PNG.sync.write(composite));
      console.log(`OK (${wrapperPng.width}x${wrapperPng.height} | ${sbPng.width}x${sbPng.height})`);
      rows.push({
        ...entry,
        status: "ok",
        wrapperDim: `${wrapperPng.width}x${wrapperPng.height}`,
        sbDim: `${sbPng.width}x${sbPng.height}`,
        slug
      });
    } catch (e) {
      console.log(`ERR: ${e.message}`);
      rows.push({ ...entry, status: "error", error: e.message });
    }
  }

  // Second loop: interactive open-state captures for entries with an interaction spec
  const INTERACTIVE_BASE_SECTION = {
    "Modal (open)": "Modal (8 sub-parts)",
    "AlertModal (open)": "AlertModal",
    "Tooltip (visible)": "Tooltip",
    "DateInput (popover)": "DateInput"
  };

  console.log("\nCapturing interactive open-state sections...");
  for (const entry of COMPONENT_MAP.filter((e) => e.interaction)) {
    const baseSection = INTERACTIVE_BASE_SECTION[entry.wrapper];
    process.stdout.write(`  ${entry.wrapper.padEnd(45)} [interactive] ... `);
    try {
      const wrapperPng = await captureWrapperInteractiveSection(
        wrapperPage,
        baseSection,
        entry.interaction.wrapperLabel,
        entry.interaction
      );
      const sbPng = await captureStorybookStory(sbPage, entry.storyId);
      const composite = compose(wrapperPng, sbPng);
      const slug = safeName(entry.wrapper);
      fs.writeFileSync(path.join(OUT_DIR, `${slug}-wrapper.png`), PNG.sync.write(wrapperPng));
      fs.writeFileSync(path.join(OUT_DIR, `${slug}-storybook.png`), PNG.sync.write(sbPng));
      fs.writeFileSync(path.join(OUT_DIR, `${slug}-side-by-side.png`), PNG.sync.write(composite));
      console.log(`OK (${wrapperPng.width}x${wrapperPng.height} | ${sbPng.width}x${sbPng.height})`);
      rows.push({
        ...entry,
        status: "ok",
        wrapperDim: `${wrapperPng.width}x${wrapperPng.height}`,
        sbDim: `${sbPng.width}x${sbPng.height}`,
        slug
      });
    } catch (e) {
      console.log(`ERR: ${e.message}`);
      rows.push({ ...entry, status: "interaction-error", error: e.message });
    }
  }

  await browser.close();

  let md = "# KRDS Wrappers vs Official Storybook — Parity Captures\n\n";
  md += `Generated: ${new Date().toISOString()}\n`;
  md += `Wrapper source: \`${WRAPPER_BASE}/?theme=light\`\n`;
  md += `Storybook source: \`${STORYBOOK_BASE}/iframe.html?id=<story>&viewMode=story\`\n\n`;
  md +=
    "Note: Pixelmatching is not used here — layout/scale/padding differ between our verify-grid and the Storybook canvas. ";
  md +=
    "The composites are for visual parity inspection. Look for: token color matches, border radii, font weight/family, spacing, control affordances. ";
  md +=
    "Open-state captures (suffixes 'open', 'visible', 'popover') drive their wrapper triggers via Playwright before screenshot — Storybook side stays as the default story canvas.\n\n";
  md += "| # | Component | Story | Wrapper | Storybook | Side-by-side |\n";
  md += "|---|---|---|---|---|---|\n";
  for (let i = 0; i < rows.length; i++) {
    const r = rows[i];
    if (r.status !== "ok") {
      md += `| ${i + 1} | ${r.wrapper} | ${r.storyId} | – | – | ${r.status}${r.error ? ": " + r.error : ""} |\n`;
      continue;
    }
    md += `| ${i + 1} | ${r.wrapper} | \`${r.storyId}\` | ${r.wrapperDim} | ${r.sbDim} | [${r.slug}-side-by-side.png](per-component/../storybook-parity/${r.slug}-side-by-side.png) |\n`;
  }

  md += `\nAll PNGs (wrapper / storybook / side-by-side composites) in \`.omc/krds-verify/storybook-parity/\`.\n`;
  fs.writeFileSync(REPORT_PATH, md);
  console.log(`\nReport: ${REPORT_PATH}`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});

// rsc:safe
// T5: Playwright probe — HelpPanel vs TutorialPanel DOM diff
import { chromium } from "@playwright/test";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const RESEARCH_DIR = join(__dirname, "../../.omc/research");

const URLS = {
  HelpPanel: "https://www.krds.go.kr/storybook/react/iframe.html?id=components-helppanel--default&viewMode=story",
  TutorialPanel:
    "https://www.krds.go.kr/storybook/react/iframe.html?id=components-tutorialpanel--default&viewMode=story"
};

async function captureHTML(page, url, name) {
  await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
  const html = await page.evaluate(() => {
    const root = document.querySelector("#storybook-root");
    return root ? root.outerHTML : "(#storybook-root not found)";
  });
  return html.slice(0, 800);
}

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ ignoreHTTPSErrors: true });
  const page = await context.newPage();

  const results = {};
  for (const [name, url] of Object.entries(URLS)) {
    try {
      results[name] = await captureHTML(page, url, name);
    } catch (e) {
      results[name] = `ERROR: ${e.message}`;
    }
  }

  await browser.close();

  const helpHTML = results["HelpPanel"];
  const tutorialHTML = results["TutorialPanel"];
  const identical = helpHTML === tutorialHTML;

  const md = `# HelpPanel vs TutorialPanel DOM Diff

## Probe date
${new Date().toISOString()}

## Result
${identical ? "⚠️ DOMs are BYTE-IDENTICAL — R4 mitigation required (note in PR)" : "✅ DOMs are DIFFERENT — implement as separate wrappers per spec"}

## HelpPanel outerHTML (first 800 chars)
\`\`\`html
${helpHTML}
\`\`\`

## TutorialPanel outerHTML (first 800 chars)
\`\`\`html
${tutorialHTML}
\`\`\`
`;

  mkdirSync(RESEARCH_DIR, { recursive: true });
  writeFileSync(join(RESEARCH_DIR, "helppanel-vs-tutorialpanel-dom.md"), md);
  console.log(identical ? "IDENTICAL" : "DIFFERENT");
  console.log("Written to .omc/research/helppanel-vs-tutorialpanel-dom.md");
})();

// capture-reference.mjs — KRDS 원본(reference) 기준 스타일 캡처.
//
// component-map.json 의 components[].variants[].reference(htmlFile + selector) 를 순회하며,
// 원본 KRDS CSS 3종(token → common → component)을 file:// 로 링크한 로컬 정적 하니스를
// 동적 생성해 Playwright(chromium)로 로드하고, capture-spec.mjs 의 PROPERTIES/STATES 를
// 라이트/다크(high-contrast) 두 테마에서 캡처한다.
//
// 산출: .omc/krds-verify/style-audit/krds-reference.json
//   구조(JSON_SCHEMA_DOC 준수): { [componentKey]: { [variant]: { [state]: { light:{...}, dark:{...} } } } }
//
// 독립 실행: `node scripts/krds/style-audit/capture-reference.mjs`
//
// 다크 모드: 원본 CSS 는 [data-krds-mode=high-contrast] .krds-* 형태의 descendant 셀렉터를 사용하므로,
// 주입한 fragment 를 data-krds-mode="high-contrast" 속성을 가진 컨테이너(#harness-root)로 감싸면 적용된다.

import { chromium } from "@playwright/test";
import { readFileSync, writeFileSync, mkdirSync, mkdtempSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import os from "node:os";

import {
  PROPERTIES,
  STATES,
  normalizeValue,
  capturePseudoStates,
  JSON_SCHEMA_DOC
} from "./capture-spec.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const MAP_PATH = join(__dirname, "component-map.json");
const OUT_DIR = "/Users/gridone/Documents/work/krds-shadcn/.omc/krds-verify/style-audit";
const OUT_PATH = join(OUT_DIR, "krds-reference.json");

// PROPERTIES/normalizeValue 는 capture-spec.capturePseudoStates 내부에서 사용된다.
// (여기서 직접 호출하진 않지만, 동일 스펙 모듈을 단일 진실원으로 import 함을 명시.)
void PROPERTIES;
void normalizeValue;
if (process.env.PRINT_SCHEMA) console.log(JSON_SCHEMA_DOC);

const map = JSON.parse(readFileSync(MAP_PATH, "utf8"));
const referenceBase = map.meta.referenceBase;
const referenceCss = map.meta.referenceCss;

/** 3종 CSS 를 file:// <link> 로 포함하고, fragment 를 #harness-root 컨테이너에 주입한 정적 HTML. */
function buildHarness(fragmentHtml) {
  const links = referenceCss
    .map((cssPath) => `  <link rel="stylesheet" href="${pathToFileURL(cssPath).href}">`)
    .join("\n");
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=1280">
${links}
</head>
<body>
  <div id="harness-root">
${fragmentHtml}
  </div>
</body>
</html>`;
}

/** capturePseudoStates 결과({state:{prop:val}})를 result[ck][vk][state][theme] 에 병합. */
function storeTheme(result, entry, theme, statesObj) {
  const { componentKey, variantKey } = entry;
  if (!result[componentKey][variantKey]) result[componentKey][variantKey] = {};
  const variantNode = result[componentKey][variantKey];
  for (const [state, props] of Object.entries(statesObj)) {
    if (!variantNode[state]) variantNode[state] = {};
    variantNode[state][theme] = props;
  }
}

// htmlFile 단위로 캡처 엔트리를 그룹화(하니스 1회 로드로 라이트/다크 모두 캡처).
const groups = new Map(); // htmlFile -> [{ componentKey, variantKey, selector }]
const result = {}; // 최종 산출. 41개 componentKey 보장 위해 선초기화.

for (const comp of map.components) {
  result[comp.componentKey] = {};
  const defaultFile = comp.reference?.htmlFile;
  for (const variant of comp.variants) {
    const file = variant.reference?.htmlFile ?? defaultFile;
    const selector = variant.reference?.selector;
    if (!file || !selector) continue;
    if (!groups.has(file)) groups.set(file, []);
    groups.get(file).push({
      componentKey: comp.componentKey,
      variantKey: variant.key,
      selector
    });
  }
}

mkdirSync(OUT_DIR, { recursive: true });
const tmpRoot = mkdtempSync(join(os.tmpdir(), "krds-ref-"));

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1280, height: 1024 },
  ignoreHTTPSErrors: true
});
const page = await context.newPage();
// 폰트 미로딩/리소스 경고 무시(computed font-size/line-height px 에는 영향 없음).
page.on("pageerror", () => {});
page.on("console", () => {});

const cdp = await context.newCDPSession(page);

let fileCount = 0;
const fileErrors = [];

for (const [file, entries] of groups) {
  const fragPath = join(referenceBase, file);
  let fragmentHtml;
  try {
    fragmentHtml = readFileSync(fragPath, "utf8");
  } catch {
    fileErrors.push(file);
    console.warn(`[warn] fragment 읽기 실패 → 스킵: ${fragPath}`);
    continue;
  }

  const harnessPath = join(tmpRoot, file.replace(/[^\w.-]/g, "_"));
  writeFileSync(harnessPath, buildHarness(fragmentHtml), "utf8");
  await page.goto(pathToFileURL(harnessPath).href, { waitUntil: "load" });
  fileCount++;

  // LIGHT: data-krds-mode 속성 제거(기본 라이트).
  await page.evaluate(() => {
    document.getElementById("harness-root")?.removeAttribute("data-krds-mode");
  });
  for (const entry of entries) {
    const styles = await capturePseudoStates(page, cdp, entry.selector, STATES);
    storeTheme(result, entry, "light", styles);
  }

  // DARK: #harness-root 에 data-krds-mode="high-contrast" 부여.
  await page.evaluate(() => {
    document.getElementById("harness-root")?.setAttribute("data-krds-mode", "high-contrast");
  });
  for (const entry of entries) {
    const styles = await capturePseudoStates(page, cdp, entry.selector, STATES);
    storeTheme(result, entry, "dark", styles);
  }
}

await browser.close();
rmSync(tmpRoot, { recursive: true, force: true });

writeFileSync(OUT_PATH, JSON.stringify(result, null, 2), "utf8");

// ── 요약 / 검증 ──────────────────────────────────────────────
function variantHasData(node) {
  if (!node) return false;
  return Object.values(node).some(
    (state) =>
      (state.light && Object.keys(state.light).length > 0) ||
      (state.dark && Object.keys(state.dark).length > 0)
  );
}

let variantsTotal = 0;
let variantsCaptured = 0;
const missing = [];
for (const comp of map.components) {
  for (const variant of comp.variants) {
    variantsTotal++;
    const node = result[comp.componentKey]?.[variant.key];
    if (variantHasData(node)) variantsCaptured++;
    else missing.push(`${comp.componentKey}/${variant.key}`);
  }
}

const componentKeyCount = Object.keys(result).length;

console.log("─".repeat(60));
console.log(`KRDS reference capture 완료 → ${OUT_PATH}`);
console.log(`componentKey 수: ${componentKeyCount} (기대 41)`);
console.log(`하니스 HTML 로드: ${fileCount}개 fragment 파일`);
console.log(`variant: ${variantsCaptured}/${variantsTotal} 캡처됨`);
if (fileErrors.length) console.log(`fragment 읽기 실패: ${fileErrors.join(", ")}`);
if (missing.length) {
  console.log(`데이터 없는 variant(${missing.length}개, 원본 fragment 에 해당 셀렉터 부재 → 캡처 누락):`);
  console.log("  " + missing.join(", "));
}
console.log("─".repeat(60));

if (componentKeyCount !== 41) {
  console.error(`[ERROR] componentKey 수가 41이 아님: ${componentKeyCount}`);
  process.exit(1);
}

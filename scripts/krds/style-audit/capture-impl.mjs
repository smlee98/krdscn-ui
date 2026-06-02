// capture-impl.mjs — KRDS 우리 구현(impl) 실측 캡처.
//
// component-map.json 의 impl 엔트리를 순회하며, 카탈로그 라우트
// (/components/<group>/<id>) 에서 각 variant 의 루트 요소를 찾아
// capture-spec.mjs 의 capturePseudoStates 로 라이트/다크 × 상태별
// computed style 을 캡처한다.
//
// 산출물: .omc/krds-verify/style-audit/krds-impl.json
//   { [componentKey]: { [variant]: { [state]: { light:{prop:val}, dark:{prop:val} } } } }
// → capture-reference.mjs 산출물(krds-reference.json)과 동일 스키마/키.
//   diff-and-report.mjs 가 두 파일을 같은 키 구조로 비교한다.
//
// 사전 조건:
//   - dev 서버가 HTTPS 로 이미 실행 중(기본 https://localhost:8080, KRDS_VERIFY_URL 로 오버라이드).
//   - 자체 서명 인증서 → newContext({ ignoreHTTPSErrors: true }).
//
// 실행: node scripts/krds/style-audit/capture-impl.mjs

import { chromium } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { PROPERTIES, STATES, normalizeValue, capturePseudoStates } from "./capture-spec.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "../../../");
const MAP_PATH = path.join(__dirname, "component-map.json");
const EXAMPLES_CONFIG_PATH = path.join(REPO_ROOT, "components/examples/examples-config.ts");
const OUT_DIR = path.join(REPO_ROOT, ".omc/krds-verify/style-audit");
const OUT_PATH = path.join(OUT_DIR, "krds-impl.json");
const BASE_URL = process.env.KRDS_VERIFY_URL ?? "https://localhost:8080";

// PROPERTIES/normalizeValue 는 capturePseudoStates 내부에서 이미 사용되지만,
// import 누락 시 조기 실패하도록 참조해 둔다(공유 스펙 계약 강제).
void PROPERTIES;
void normalizeValue;

/**
 * examples-config.ts 의 EXAMPLES_CONFIG 객체에서 slug → [예제명...] 순서를 파싱.
 * 카탈로그 페이지는 이 순서대로 예제를 렌더하므로, exampleName 의 인덱스 =
 * 페이지 내 N번째 [data-slot="example-preview"] 컨테이너.
 */
function parseExampleOrder(src) {
  const order = {};
  const start = src.indexOf("EXAMPLES_CONFIG = {");
  const body = start >= 0 ? src.slice(start) : src;
  const entryRe = /(?:"([^"]+)"|([A-Za-z0-9_-]+))\s*:\s*\[([\s\S]*?)\]/g;
  let m;
  while ((m = entryRe.exec(body))) {
    const key = m[1] ?? m[2];
    const names = [...m[3].matchAll(/"([^"]+)"/g)].map((x) => x[1]);
    if (names.length) order[key] = names;
  }
  return order;
}

/**
 * 페이지 내에서 대상 요소를 찾아 고유 data-audit-target 속성을 부여.
 * capturePseudoStates 가 이 속성 셀렉터로 정확히 해당 요소를 집을 수 있게 한다.
 * @returns {{ ok: boolean, reason?: string, containerCount?: number }}
 */
async function markTarget(page, args) {
  return await page.evaluate((a) => {
    const { exampleIndex, selector, isDisabled, auditId, scopeGlobal } = a;
    // 이전 마커 정리.
    document.querySelectorAll("[data-audit-target]").forEach((el) => el.removeAttribute("data-audit-target"));

    let scope = document;
    if (!scopeGlobal && exampleIndex >= 0) {
      const containers = document.querySelectorAll('[data-slot="example-preview"]');
      const c = containers[exampleIndex];
      if (!c) return { ok: false, reason: "no-container", containerCount: containers.length };
      scope = c;
    }

    let target = null;
    try {
      if (isDisabled) {
        const list = Array.from(scope.querySelectorAll(selector));
        target =
          list.find((el) => {
            if (el.disabled === true) return true;
            if (el.getAttribute && el.getAttribute("aria-disabled") === "true") return true;
            try {
              if (el.matches && el.matches(":disabled")) return true;
            } catch {
              /* noop */
            }
            return el.querySelector && el.querySelector(':disabled, [aria-disabled="true"]');
          }) ||
          list[0] ||
          null;
      } else {
        target = scope.querySelector(selector);
      }
    } catch (e) {
      return { ok: false, reason: "selector-error: " + e.message };
    }

    if (!target) return { ok: false, reason: "no-target" };
    target.setAttribute("data-audit-target", String(auditId));
    return { ok: true };
  }, args);
}

/** trigger 클릭으로 숨겨진 요소(모달/패널 등)를 best-effort 로 노출. */
async function tryReveal(page, exampleIndex) {
  try {
    const container = page.locator('[data-slot="example-preview"]').nth(exampleIndex);
    const trigger = container.locator('button:not([disabled]), [data-slot$="-trigger"]').first();
    if (await trigger.count()) {
      await trigger.click({ timeout: 1500 });
      await page.waitForTimeout(350);
    }
  } catch {
    /* noop — 노출 실패는 캡처 누락으로 처리 */
  }
}

async function assertTheme(page, theme) {
  await page.evaluate((t) => {
    const de = document.documentElement;
    if (t === "dark") de.classList.add("dark");
    else de.classList.remove("dark");
  }, theme);
}

async function run() {
  const map = JSON.parse(fs.readFileSync(MAP_PATH, "utf8"));
  const exampleOrder = parseExampleOrder(fs.readFileSync(EXAMPLES_CONFIG_PATH, "utf8"));

  const components = map.components ?? [];
  const results = {};
  // 41개 키를 미리 생성해 reference 와 키 정렬을 보장(미캡처 컴포넌트도 키 존재).
  for (const c of components) results[c.componentKey] = {};

  const missing = [];
  const browser = await chromium.launch({ headless: true });

  for (const theme of ["light", "dark"]) {
    const context = await browser.newContext({
      ignoreHTTPSErrors: true,
      viewport: { width: 1280, height: 2000 }
    });
    // 결정적 테마 + UI 시스템 설정(페이지 스크립트보다 먼저 실행).
    await context.addInitScript((t) => {
      try {
        localStorage.setItem("krds-ui-system", "krds");
        localStorage.setItem("theme", t);
        const de = document.documentElement;
        if (t === "dark") de.classList.add("dark");
        else de.classList.remove("dark");
      } catch {
        /* noop */
      }
    }, theme);

    const page = await context.newPage();
    const cdp = await context.newCDPSession(page);
    let auditId = 0;

    for (const c of components) {
      const url = `${BASE_URL}${c.impl.route}`;
      try {
        await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
      } catch (e) {
        missing.push(`${c.componentKey}@${theme}: goto-failed ${e.message}`);
        continue;
      }

      await page.waitForSelector(c.impl.rootSelector, { timeout: 5000 }).catch(() => {});
      await page.waitForFunction(() => (document.fonts ? document.fonts.ready.then(() => true) : true)).catch(() => {});
      await page.waitForTimeout(200);
      // next-themes 하이드레이션 이후 클래스 강제(라이트/다크 확정).
      await assertTheme(page, theme);

      const order = exampleOrder[c.componentKey] || [];

      for (const v of c.variants) {
        const exampleIndex = order.indexOf(v.impl.exampleName);
        const selector = v.impl.selector;
        const isDisabled = v.key === "disabled" || /disabled/i.test(v.impl.exampleName || "");
        auditId++;

        let res = await markTarget(page, { exampleIndex, selector, isDisabled, auditId, scopeGlobal: false });
        if (!res.ok && exampleIndex >= 0) {
          await tryReveal(page, exampleIndex);
          res = await markTarget(page, { exampleIndex, selector, isDisabled, auditId, scopeGlobal: false });
        }
        if (!res.ok) {
          // 컨테이너 스코프 실패 → 문서 전체에서 best-effort.
          res = await markTarget(page, { exampleIndex: -1, selector, isDisabled, auditId, scopeGlobal: true });
        }
        if (!res.ok) {
          missing.push(`${c.componentKey}/${v.key}@${theme}: ${res.reason}`);
          continue;
        }

        const states = await capturePseudoStates(page, cdp, `[data-audit-target="${auditId}"]`, STATES);

        await page.evaluate((id) => {
          const el = document.querySelector(`[data-audit-target="${id}"]`);
          if (el) el.removeAttribute("data-audit-target");
        }, auditId);

        if (!states || Object.keys(states).length === 0) {
          missing.push(`${c.componentKey}/${v.key}@${theme}: no-states`);
          continue;
        }

        results[c.componentKey][v.key] = results[c.componentKey][v.key] ?? {};
        for (const [state, props] of Object.entries(states)) {
          results[c.componentKey][v.key][state] = results[c.componentKey][v.key][state] ?? {};
          results[c.componentKey][v.key][state][theme] = props;
        }
      }
    }

    await context.close();
  }

  await browser.close();

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(OUT_PATH, JSON.stringify(results, null, 2));

  // 요약.
  const ckCount = Object.keys(results).length;
  let variantsCaptured = 0;
  let stateEntries = 0;
  const emptyComponents = [];
  for (const ck of Object.keys(results)) {
    const vk = Object.keys(results[ck]);
    if (vk.length === 0) emptyComponents.push(ck);
    for (const v of vk) {
      variantsCaptured++;
      stateEntries += Object.keys(results[ck][v]).length;
    }
  }

  console.log("─".repeat(60));
  console.log(`krds-impl.json 작성: ${OUT_PATH}`);
  console.log(`componentKeys=${ckCount} variantsCaptured=${variantsCaptured} stateEntries=${stateEntries}`);
  if (emptyComponents.length) console.log(`캡처 0 컴포넌트(${emptyComponents.length}): ${emptyComponents.join(", ")}`);
  console.log(`미캡처 variant/state (${missing.length}):`);
  for (const m of missing) console.log("  - " + m);
  console.log("─".repeat(60));
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});

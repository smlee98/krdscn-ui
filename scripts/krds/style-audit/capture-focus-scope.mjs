// capture-focus-scope.mjs — KRDS 원본 ↔ 우리 구현의 **focus ring 범위(포커스 요소 geometry)** 대조 하니스.
//
// 기존 style-audit(capture-spec/reference/impl)가 "포커스 상태의 속성 *값*"(box-shadow 색/두께 등)을
// 비교하는 것과 달리, 이 하니스는 **포커스 가능한 요소의 기하(높이/패딩/radius)와 그 요소가
// 자기 시각 단위(item/wrapper)를 얼마나 감싸는가(coverage)** 를 비교한다.
//
// 확정 결함 사례(accordion): 원본 `.btn-accordion` 은 패딩을 품어 헤더 전체(h≈74, radius≈10)가
// focusable → ring 이 헤더를 크게 감쌈. 우리 구현 trigger 는 p-0(h≈29, radius 0) → ring 이 텍스트 줄만
// 얇게 감쌈. box-shadow *값*(파란 4px)은 같지만 **범위(scope)** 가 어긋난다. 이 클래스를 잡는 것이 목적.
//
// 원본 렌더: KRDS CSS 3종을 file://<link> 가 아니라 **<style> 인라인**으로 주입해야 적용됨(검증됨).
// 구현 렌더: 이미 구동 중인 dev 서버(https://localhost:8080, krds-ui-system=krds, light) 방문.
//
// 산출물:
//   .omc/krds-verify/focus-scope/focus-scope-report.md
//   .omc/krds-verify/focus-scope/focus-scope-report.json
//   .omc/krds-verify/focus-scope/shots/<key>__orig.png, <key>__impl.png  (포커스 요소에 dashed 마커 오버레이)
//
// 실행: node scripts/krds/style-audit/capture-focus-scope.mjs

import { chromium } from "@playwright/test"
import { readFileSync, writeFileSync, mkdirSync, mkdtempSync, rmSync } from "node:fs"
import { join, dirname, resolve } from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"
import os from "node:os"

import { normalizeValue } from "./capture-spec.mjs"

const __dirname = dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = resolve(__dirname, "../../..")
const KRDS_UIUX_ROOT = process.env.KRDS_UIUX_ROOT ?? resolve(REPO_ROOT, "..", "krds-uiux")
const MAP_PATH = join(__dirname, "component-map.json")
const OUT_DIR = join(REPO_ROOT, ".omc/krds-verify/focus-scope")
const SHOTS_DIR = join(OUT_DIR, "shots")
const BASE_URL = process.env.KRDS_VERIFY_URL ?? "https://localhost:8080"

const map = JSON.parse(readFileSync(MAP_PATH, "utf8"))
const REFERENCE_BASE = join(KRDS_UIUX_ROOT, map.meta.referenceBase)
const REFERENCE_CSS = map.meta.referenceCss.map((p) => join(KRDS_UIUX_ROOT, p))

// ── 인터랙티브 컴포넌트별 포커스 대조 설정 ─────────────────────────────────────
// refFocusable : 원본 fragment 안에서 포커스 대상 요소 셀렉터(첫 매치).
// refUnit      : 그 요소의 "시각 인터랙티브 단위"(closest 로 탐색). 없으면 root.
// refSetup     : 원본에서 펼침 등 상태 부여([{sel, add, remove}]).
// implFocusable: 구현 root(impl.rootSelector) 안에서 포커스 대상 셀렉터(root 자체 매칭 포함).
// implUnit     : 구현 측 시각 단위(closest). 없으면 root.
// note         : 비고(트리거형/링크형 등).
const CONFIG = {
  accordion: {
    refFocusable: ".btn-accordion",
    refUnit: ".accordion-header",
    refSetup: [
      { sel: ".accordion-item", add: "active" },
      { sel: ".btn-accordion", add: "active" },
      { sel: ".accordion-collapse", add: "show", remove: "collapse" },
    ],
    implFocusable: "button",
    implUnit: "[data-slot='krds-accordion-header']",
  },
  tab: {
    refFocusable: ".btn-tab",
    refUnit: "li[role='tab']",
    implFocusable: "[role='tab'], button",
    implUnit: "[role='tab']",
  },
  disclosure: {
    refFocusable: ".btn-conts-expand",
    refUnit: ".krds-disclosure",
    implFocusable: "button",
  },
  pagination: {
    refFocusable: "a.page-link",
    refUnit: "a.page-link",
    implFocusable: "a, button",
  },
  breadcrumb: {
    refFocusable: ".breadcrumb a",
    refUnit: "li",
    implFocusable: "a",
  },
  "skip-link": {
    refFocusable: "a",
    refUnit: "a",
    implFocusable: "a",
  },
  "side-navigation": {
    refFocusable: "a, button",
    implFocusable: "a, button",
  },
  "main-menu": {
    refFocusable: "a, button",
    implFocusable: "a, button",
  },
  "in-page-navigation": {
    refFocusable: "a, button",
    implFocusable: "a, button",
  },
  link: {
    refFocusable: "a.krds-btn",
    refUnit: "a.krds-btn",
    implFocusable: "a",
  },
  button: {
    refFocusable: "button.krds-btn",
    refUnit: "button.krds-btn",
    implFocusable: "button",
  },
  select: {
    refFocusable: "select.krds-form-select",
    refUnit: ".form-conts",
    implFocusable: "select, [role='combobox'], button",
  },
  checkbox: {
    refFocusable: "input[type='checkbox']",
    refUnit: ".krds-form-check",
    implFocusable: "input[type='checkbox'], button[role='checkbox']",
    implUnit: ".krds-form-check, label",
  },
  "radio-group": {
    refFocusable: "input[type='radio']",
    refUnit: ".krds-form-check",
    implFocusable: "input[type='radio'], button[role='radio']",
    implUnit: ".krds-form-check, label",
  },
  "toggle-switch": {
    refFocusable: "input[type='checkbox']",
    refUnit: ".krds-form-toggle-switch",
    implFocusable: "input[type='checkbox'], button[role='switch']",
    implUnit: "label, [data-slot='krds-toggle-switch']",
  },
  tag: {
    refFocusable: ".btn-delete",
    refUnit: ".krds-btn-tag",
    implScope: "[data-slot='example-preview']",
    implFocusable: "button",
    implUnit: "[data-slot='krds-tag']",
    note: "삭제 가능 태그의 .btn-delete 기준(없으면 n/a)",
  },
  "text-input": {
    refFocusable: "input.krds-input",
    refUnit: ".form-conts",
    implFocusable: "input",
  },
  textarea: {
    refFocusable: "textarea",
    refUnit: ".textarea-wrap",
    implFocusable: "textarea",
  },
  "date-input": {
    refFocusable: "input.krds-input",
    refUnit: ".calendar-input",
    implFocusable: "input",
  },
  "file-upload": {
    refFocusable: ".file-upload-btn-wrap button, button.krds-btn",
    refUnit: ".file-upload-btn-wrap",
    implFocusable: "button",
  },
  modal: {
    refFocusable: "button, a[href]",
    implScope: "[data-slot='krds-modal-trigger']",
    implFocusable: "button, [data-slot='krds-modal-trigger']",
    note: "트리거 버튼 기준(원본은 fragment 첫 focusable)",
  },
  "help-panel": {
    refFocusable: "button, a[href]",
    implScope: "[data-slot='krds-help-panel-trigger']",
    implFocusable: "button, [data-slot='krds-help-panel-trigger']",
    note: "트리거 버튼 기준",
  },
  "tutorial-panel": {
    refFocusable: "button, a[href]",
    implScope: "[data-slot='krds-tutorial-panel-trigger']",
    implFocusable: "button, [data-slot='krds-tutorial-panel-trigger']",
    note: "트리거 버튼 기준",
  },
  tooltip: {
    refFocusable: "button, a[href]",
    implScope: "[data-slot='example-preview']",
    implFocusable: "button, a[href]",
    note: "트리거 버튼 기준",
  },
  "step-indicator": {
    refFocusable: "a[href], button, [tabindex]:not([tabindex='-1'])",
    refUnit: "li",
    implFocusable: "a[href], button, [tabindex]:not([tabindex='-1'])",
    implUnit: "li",
    note: "링크형 step 에만 focusable 존재",
  },
}

const GENERIC_FOCUSABLE =
  "a[href], button:not([disabled]), input:not([type='hidden']):not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])"

// 대상 컴포넌트 = CONFIG 키. component-map 에서 route / refHtml / rootSelector 결합.
const TARGETS = Object.keys(CONFIG)
  .map((key) => {
    const comp = map.components.find((c) => c.componentKey === key)
    if (!comp) return null
    return {
      key,
      cfg: CONFIG[key],
      refHtml: comp.reference?.htmlFile,
      route: comp.impl?.route,
      implRoot: comp.impl?.rootSelector,
    }
  })
  .filter(Boolean)

// ── 페이지 내 측정/마커 함수(브라우저 컨텍스트에서 실행되는 직렬화 가능 함수들) ──

// 포커스 대상 선정 + 측정 + 마커 부착을 한 번에. scope 안에서 preferSel(없으면 generic) 첫 가시 요소.
// 반환: { ok, reason?, focus:{rect,padding,radius,outline...}, unit:{rect} }
const PAGE_MEASURE = function (params) {
  const [scopeSel, preferSel, unitSel, genericSel, markerColor] = params
  function visible(el) {
    if (!el) return false
    const r = el.getBoundingClientRect()
    const cs = getComputedStyle(el)
    if (cs.display === "none" || cs.visibility === "hidden") return false
    return r.width > 0 || r.height > 0 || el.tagName === "A"
  }
  function pick(scope, sel) {
    if (!sel) return null
    const list = []
    if (scope.matches && scope.matches(sel)) list.push(scope)
    scope.querySelectorAll(sel).forEach((e) => list.push(e))
    return list.find(visible) || list[0] || null
  }
  // scope 결정.
  let scope = scopeSel ? document.querySelector(scopeSel) : document.body
  if (!scope) return { ok: false, reason: "no-scope:" + scopeSel }

  let focusable = pick(scope, preferSel)
  if (!focusable) focusable = pick(scope, genericSel)
  if (!focusable) return { ok: false, reason: "no-focusable" }

  // 시각 단위: unitSel 을 focusable.closest 로 탐색 → 못 찾으면 scope.querySelector → scope 자신.
  let unit = null
  if (unitSel) {
    unit = focusable.closest(unitSel)
    if (!unit) unit = scope.querySelector(unitSel)
  }
  if (!unit) unit = scope

  // 측정을 위해 포커스 + 뷰포트 진입.
  try {
    focusable.scrollIntoView({ block: "center", inline: "center" })
  } catch (e) {
    /* noop */
  }
  try {
    focusable.focus({ preventScroll: true })
  } catch (e) {
    /* noop */
  }

  const cs = getComputedStyle(focusable)
  const r = focusable.getBoundingClientRect()
  const ur = unit.getBoundingClientRect()

  // 마커 오버레이(포커스 요소 경계, dashed). position:fixed + 뷰포트 좌표(스크롤 보정 불필요) →
  // 레이아웃(예: body padding)과 무관하게 포커스 요소 위에 정확히 정렬된다. 이전 마커 제거.
  document.querySelectorAll("[data-focus-marker]").forEach((m) => m.remove())
  const mk = document.createElement("div")
  mk.setAttribute("data-focus-marker", "1")
  mk.style.position = "fixed"
  mk.style.left = r.left + "px"
  mk.style.top = r.top + "px"
  mk.style.width = r.width + "px"
  mk.style.height = r.height + "px"
  mk.style.border = "2px dashed " + (markerColor || "#e11")
  mk.style.boxSizing = "border-box"
  mk.style.pointerEvents = "none"
  mk.style.zIndex = "2147483647"
  document.body.appendChild(mk)

  return {
    ok: true,
    tag: focusable.tagName.toLowerCase(),
    cls: focusable.getAttribute("class") || "",
    focus: {
      rect: {
        top: r.top + window.scrollY,
        left: r.left + window.scrollX,
        width: r.width,
        height: r.height,
      },
      paddingTop: cs.paddingTop,
      paddingRight: cs.paddingRight,
      paddingBottom: cs.paddingBottom,
      paddingLeft: cs.paddingLeft,
      radiusTL: cs.borderTopLeftRadius,
      radiusTR: cs.borderTopRightRadius,
      radiusBR: cs.borderBottomRightRadius,
      radiusBL: cs.borderBottomLeftRadius,
      outlineWidth: cs.outlineWidth,
      outlineStyle: cs.outlineStyle,
      outlineColor: cs.outlineColor,
      outlineOffset: cs.outlineOffset,
      boxShadow: cs.boxShadow,
    },
    unit: {
      rect: {
        top: ur.top + window.scrollY,
        left: ur.left + window.scrollX,
        width: ur.width,
        height: ur.height,
      },
    },
    // 스크린샷용 뷰포트 좌표 클립(scrollIntoView 이후 기준). 단위 박스가 비정상(0)이면 포커스 박스로 폴백.
    clip: {
      top: ur.height > 2 ? ur.top : r.top,
      left: ur.width > 2 ? ur.left : r.left,
      width: ur.width > 2 ? ur.width : r.width,
      height: ur.height > 2 ? ur.height : r.height,
    },
  }
}

// CDP 로 focus/focus-visible 의사상태를 강제(프로그램 focus 로는 :focus-visible 룰이 안 걸릴 수 있음).
async function forceFocusVisible(cdp, scopeSel, preferSel, genericSel) {
  try {
    const { root } = await cdp.send("DOM.getDocument", { depth: -1 })
    const scopeNode = scopeSel
      ? await cdp.send("DOM.querySelector", { nodeId: root.nodeId, selector: scopeSel })
      : { nodeId: root.nodeId }
    if (!scopeNode.nodeId) return
    let target = await cdp
      .send("DOM.querySelector", { nodeId: scopeNode.nodeId, selector: preferSel })
      .catch(() => ({}))
    if (!target.nodeId)
      target = await cdp.send("DOM.querySelector", { nodeId: scopeNode.nodeId, selector: genericSel }).catch(() => ({}))
    if (!target.nodeId) return
    await cdp.send("CSS.enable").catch(() => {})
    await cdp.send("CSS.forcePseudoState", {
      nodeId: target.nodeId,
      forcedPseudoClasses: ["focus", "focus-visible"],
    })
  } catch (e) {
    /* noop */
  }
}

// ── 수치 헬퍼 ──────────────────────────────────────────────
const px = (v) => {
  const n = parseFloat(String(v))
  return Number.isFinite(n) ? Math.round(n * 10) / 10 : 0
}
const round1 = (n) => Math.round(n * 10) / 10

function summarizeMeasure(m) {
  if (!m || !m.ok) return null
  const f = m.focus
  return {
    tag: m.tag,
    cls: m.cls,
    height: round1(f.rect.height),
    width: round1(f.rect.width),
    padding: [px(f.paddingTop), px(f.paddingRight), px(f.paddingBottom), px(f.paddingLeft)],
    radius: [px(f.radiusTL), px(f.radiusTR), px(f.radiusBR), px(f.radiusBL)],
    outlineWidth: px(f.outlineWidth),
    outlineStyle: f.outlineStyle,
    outlineColor: normalizeValue("outline-color", f.outlineColor),
    outlineOffset: px(f.outlineOffset),
    boxShadow: normalizeValue("box-shadow", f.boxShadow),
    unitHeight: round1(m.unit.rect.height),
    unitWidth: round1(m.unit.rect.width),
    // coverage: 포커스 요소가 시각 단위 높이를 얼마나 채우는가(범위 신호).
    coverage: m.unit.rect.height > 0 ? round1(f.rect.height / m.unit.rect.height) : 1,
  }
}

// 불일치 판정.
const HEIGHT_ABS = 4
const HEIGHT_RATIO = 0.12
const RADIUS_TOL = 2
const PADDING_TOL = 4
const COVERAGE_TOL = 0.15
const OFFSET_TOL = 1

// useCoverage: 원본·구현 양쪽에 **명시적·동등한** 시각 단위 셀렉터가 있을 때만 coverage 를 판정에 반영한다.
// (한쪽이 root 폴백이면 단위 정의가 달라 coverage 가 거짓신호가 됨 → 기하만으로 판정.)
function classify(orig, impl, useCoverage) {
  if (!orig && !impl) return { severity: "n/a", scopeMatch: null, reasons: ["both-missing"] }
  if (!orig) return { severity: "n/a", scopeMatch: null, reasons: ["original-missing"] }
  if (!impl) return { severity: "n/a", scopeMatch: null, reasons: ["impl-missing"] }

  // 네이티브 컨트롤이 시각적으로 은닉(opacity0/1px)된 경우(checkbox/radio/toggle): focus는 input에
  // 걸리지만 ring은 label/pseudo(::before)에 그려진다 → input 기하 직접비교는 의미 없음. 스샷으로 판단.
  if (orig.height < 3 || impl.height < 3) {
    return {
      severity: "n/a",
      scopeMatch: null,
      reasons: ["네이티브 컨트롤 시각 은닉(ring은 label/pseudo) — 기하 직접비교 불가, 스샷 참조"],
    }
  }

  const reasons = []
  const hDelta = Math.abs(orig.height - impl.height)
  const hRatio = hDelta / Math.max(orig.height, impl.height, 1)
  const padDelta = Math.max(...orig.padding.map((o, i) => Math.abs(o - impl.padding[i])))
  const radDelta = Math.max(...orig.radius.map((o, i) => Math.abs(o - impl.radius[i])))
  const offDelta = Math.abs(orig.outlineOffset - impl.outlineOffset)
  const covDelta = useCoverage ? Math.abs(orig.coverage - impl.coverage) : 0

  // ring 은 border-box 를 (outline-offset/box-shadow spread 만큼 띄워) 감싼다. 따라서 ring 범위는
  // border-box 의 height/width/radius + outline-offset + coverage 로 결정된다. padding 은 border-box
  // *내부* 라 ring 외곽을 바꾸지 않으므로(높이 변화는 이미 height 에 반영됨) 판정에서 제외하고 표에 정보로만 남긴다.
  if (hDelta > HEIGHT_ABS) reasons.push(`height ${orig.height}→${impl.height} (Δ${round1(hDelta)})`)
  if (radDelta > RADIUS_TOL) reasons.push(`radius ${orig.radius.join("/")}→${impl.radius.join("/")}`)
  if (offDelta > OFFSET_TOL) reasons.push(`outline-offset ${orig.outlineOffset}→${impl.outlineOffset}`)
  if (covDelta > COVERAGE_TOL) reasons.push(`coverage ${orig.coverage}→${impl.coverage}`)

  // High: ring 범위가 눈에 띄게 다름 — 높이 큰 차이 또는 coverage 큰 차이.
  const isHigh = (hDelta > 8 && hRatio > 0.2) || covDelta > 0.25
  // Medium: radius/outline-offset/소폭 높이 차이.
  const isMedium = radDelta > RADIUS_TOL || hDelta > HEIGHT_ABS || offDelta > OFFSET_TOL || covDelta > COVERAGE_TOL

  let severity = "OK"
  if (isHigh) severity = "High"
  else if (isMedium) severity = "Medium"

  const scopeMatch = severity === "OK"
  if (scopeMatch) reasons.push("scope match")
  return {
    severity,
    scopeMatch,
    reasons,
    metrics: { hDelta: round1(hDelta), padDelta, radDelta, offDelta, covDelta: round1(covDelta) },
  }
}

// ── 원본(reference) 캡처 ───────────────────────────────────
function buildHarness(fragmentHtml) {
  const styles = REFERENCE_CSS.map((p) => `<style>\n${readFileSync(p, "utf8")}\n</style>`).join("\n")
  return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=1280">
${styles}
<style>
  html,body{background:#fff;margin:0;padding:32px;}
  #harness-root{max-width:1100px;}
</style>
</head>
<body>
<div id="harness-root">
${fragmentHtml}
</div>
</body>
</html>`
}

async function captureReference(page, cdp, tmpRoot, target, severityShots) {
  const { key, cfg, refHtml } = target
  const result = { ok: false }
  if (!refHtml) {
    result.reason = "no-refHtml"
    return result
  }
  let fragmentHtml
  try {
    fragmentHtml = readFileSync(join(REFERENCE_BASE, refHtml), "utf8")
  } catch {
    result.reason = "fragment-read-failed"
    return result
  }
  const harnessPath = join(tmpRoot, `${key}.html`)
  writeFileSync(harnessPath, buildHarness(fragmentHtml), "utf8")
  await page.goto(pathToFileURL(harnessPath).href, { waitUntil: "load" })
  await page.waitForTimeout(120)

  // 상태 부여(펼침 등).
  if (cfg.refSetup) {
    await page.evaluate((setup) => {
      for (const s of setup) {
        document.querySelectorAll(s.sel).forEach((el) => {
          if (s.add) el.classList.add(s.add)
          if (s.remove) el.classList.remove(s.remove)
        })
      }
    }, cfg.refSetup)
  }

  const scopeSel = "#harness-root"
  const preferSel = cfg.refFocusable
  const unitSel = cfg.refUnit ?? null
  await forceFocusVisible(cdp, scopeSel, preferSel, GENERIC_FOCUSABLE)
  const measure = await page.evaluate(PAGE_MEASURE, [scopeSel, preferSel, unitSel, GENERIC_FOCUSABLE, "#e11"])
  if (!measure.ok) {
    result.reason = "ref:" + measure.reason
    return result
  }

  // 스크린샷(마커 포함). 클립 = 시각 단위 + 여백.
  const shotPath = join(SHOTS_DIR, `${key}__orig.png`)
  await screenshotClip(page, measure.clip, shotPath)

  result.ok = true
  result.measure = summarizeMeasure(measure)
  result.shot = shotPath
  return result
}

// ── 구현(impl) 캡처 ────────────────────────────────────────
async function captureImpl(page, cdp, target) {
  const { key, cfg, route, implRoot } = target
  const result = { ok: false }
  if (!route) {
    result.reason = "no-route"
    return result
  }
  try {
    await page.goto(`${BASE_URL}${route}`, { waitUntil: "domcontentloaded", timeout: 60000 })
  } catch (e) {
    result.reason = "goto-failed:" + e.message
    return result
  }
  const scopeSel = cfg.implScope ?? implRoot
  await page.waitForSelector(scopeSel, { timeout: 6000 }).catch(() => {})
  await page.waitForFunction(() => (document.fonts ? document.fonts.ready.then(() => true) : true)).catch(() => {})
  await page.waitForTimeout(250)

  const preferSel = cfg.implFocusable ?? cfg.refFocusable
  const unitSel = cfg.implUnit ?? null
  await forceFocusVisible(cdp, scopeSel, preferSel, GENERIC_FOCUSABLE)
  const measure = await page.evaluate(PAGE_MEASURE, [scopeSel, preferSel, unitSel, GENERIC_FOCUSABLE, "#06f"])
  if (!measure.ok) {
    result.reason = "impl:" + measure.reason
    return result
  }

  const shotPath = join(SHOTS_DIR, `${key}__impl.png`)
  await screenshotClip(page, measure.clip, shotPath)

  result.ok = true
  result.measure = summarizeMeasure(measure)
  result.shot = shotPath
  return result
}

// clipRect 는 **뷰포트 좌표**(scrollIntoView 이후). position:fixed 마커도 뷰포트 좌표라 정확히 정렬됨.
// fullPage 대신 뷰포트 스크린샷 + 뷰포트 클립을 사용해 마커/콘텐츠 정렬을 보장.
async function screenshotClip(page, clipRect, path) {
  const pad = 48
  const dims = page.viewportSize() || { width: 1280, height: 1400 }
  let x = Math.max(0, clipRect.left - pad)
  let y = Math.max(0, clipRect.top - pad)
  let w = Math.min(clipRect.width + pad * 2, dims.width - x)
  let h = Math.min(clipRect.height + pad * 2, dims.height - y)
  w = Math.max(8, w)
  h = Math.max(8, h)
  try {
    await page.screenshot({ path, clip: { x, y, width: w, height: h } })
  } catch (e) {
    try {
      await page.screenshot({ path })
    } catch (e2) {
      /* noop */
    }
  }
}

// ── 메인 ───────────────────────────────────────────────────
async function run() {
  mkdirSync(OUT_DIR, { recursive: true })
  mkdirSync(SHOTS_DIR, { recursive: true })
  const tmpRoot = mkdtempSync(join(os.tmpdir(), "krds-focus-"))

  const browser = await chromium.launch({ headless: true })

  // 원본 컨텍스트(file://, 라이트).
  const refContext = await browser.newContext({
    viewport: { width: 1280, height: 1400 },
    ignoreHTTPSErrors: true,
    deviceScaleFactor: 1,
  })
  const refPage = await refContext.newPage()
  refPage.on("pageerror", () => {})
  refPage.on("console", () => {})
  const refCdp = await refContext.newCDPSession(refPage)

  // 구현 컨텍스트(dev 서버, krds-ui-system=krds, light).
  const implContext = await browser.newContext({
    viewport: { width: 1280, height: 1400 },
    ignoreHTTPSErrors: true,
    deviceScaleFactor: 1,
  })
  await implContext.addInitScript(() => {
    try {
      localStorage.setItem("krds-ui-system", "krds")
      localStorage.setItem("theme", "light")
      document.documentElement.classList.remove("dark")
    } catch (e) {
      /* noop */
    }
  })
  const implPage = await implContext.newPage()
  implPage.on("pageerror", () => {})
  implPage.on("console", () => {})
  const implCdp = await implContext.newCDPSession(implPage)

  const rows = []
  for (const target of TARGETS) {
    const ref = await captureReference(refPage, refCdp, tmpRoot, target)
    const imp = await captureImpl(implPage, implCdp, target)
    // coverage 는 양쪽 단위가 명시적으로 동등할 때만 신뢰(아니면 root 폴백 → 거짓신호).
    const useCoverage = !!(target.cfg.refUnit && target.cfg.implUnit)
    const verdict = classify(ref.measure, imp.measure, useCoverage)

    rows.push({
      key: target.key,
      note: target.cfg.note ?? "",
      route: target.route,
      refHtml: target.refHtml,
      original: ref.ok ? ref.measure : { error: ref.reason },
      impl: imp.ok ? imp.measure : { error: imp.reason },
      verdict,
      shots: {
        original: ref.ok ? relShot(ref.shot) : null,
        impl: imp.ok ? relShot(imp.shot) : null,
      },
    })
    const flag =
      verdict.severity === "High"
        ? "🔴"
        : verdict.severity === "Medium"
          ? "🟡"
          : verdict.severity === "OK"
            ? "🟢"
            : "⚪"
    console.log(`${flag} ${target.key.padEnd(20)} sev=${verdict.severity.padEnd(7)} ${shortReason(ref, imp, verdict)}`)
  }

  await browser.close()
  rmSync(tmpRoot, { recursive: true, force: true })

  // 산출물 작성.
  writeReports(rows)
}

function relShot(p) {
  return p ? p.replace(REPO_ROOT + "/", "") : null
}
function shortReason(ref, imp, verdict) {
  if (!ref.ok) return `ref:${ref.reason}`
  if (!imp.ok) return `impl:${imp.reason}`
  return `orig h${ref.measure.height}/r${ref.measure.radius[0]} cov${ref.measure.coverage} vs impl h${imp.measure.height}/r${imp.measure.radius[0]} cov${imp.measure.coverage}`
}

function writeReports(rows) {
  // JSON.
  writeFileSync(
    join(OUT_DIR, "focus-scope-report.json"),
    JSON.stringify({ generatedFrom: BASE_URL, rows }, null, 2),
    "utf8"
  )

  // 심각도 랭킹: High > Medium > OK > n/a.
  const rank = { High: 0, Medium: 1, OK: 2, "n/a": 3 }
  const sorted = [...rows].sort(
    (a, b) => rank[a.verdict.severity] - rank[b.verdict.severity] || a.key.localeCompare(b.key)
  )

  const high = sorted.filter((r) => r.verdict.severity === "High")
  const medium = sorted.filter((r) => r.verdict.severity === "Medium")
  const ok = sorted.filter((r) => r.verdict.severity === "OK")
  const na = sorted.filter((r) => r.verdict.severity === "n/a")

  const lines = []
  lines.push("# KRDS Focus-Ring Scope Audit (원본 ↔ 구현)")
  lines.push("")
  lines.push(`- 생성: \`node scripts/krds/style-audit/capture-focus-scope.mjs\``)
  lines.push(`- 구현 소스: ${BASE_URL} (krds-ui-system=krds, light)`)
  lines.push(`- 원본 소스: KRDS CSS 3종 인라인 + html/code fragment`)
  lines.push(
    `- 측정 축: **포커스 요소의 높이/패딩/radius + 시각 단위 대비 coverage**(ring 범위). 속성-값 감사(box-shadow 색/두께)와 별개 차원.`
  )
  lines.push("")
  lines.push(
    `**요약**: 🔴 High ${high.length} · 🟡 Medium ${medium.length} · 🟢 OK ${ok.length} · ⚪ n/a ${na.length} (총 ${rows.length})`
  )
  lines.push("")

  const tableHeader = [
    "| 컴포넌트 | 심각도 | 원본 focusable (h·pad·radius·cov) | 구현 focusable (h·pad·radius·cov) | ring 범위 | 근본원인 추정 | 스샷(orig·impl) |",
    "|---|---|---|---|---|---|---|",
  ]

  function fmtMeasure(m) {
    if (!m || m.error) return `(${m?.error ?? "missing"})`
    return `${m.tag} · h${m.height} · pad[${m.padding.join(",")}] · r[${m.radius.join(",")}] · cov${m.coverage}`
  }
  function rootCause(r) {
    if (r.verdict.severity === "n/a") return r.verdict.reasons.join("; ")
    if (r.verdict.severity === "OK") return "—"
    const o = r.original,
      i = r.impl
    if (!o || o.error || !i || i.error) return "측정 불가"
    const covCounted = r.verdict.reasons.some((x) => x.startsWith("coverage"))
    if (i.height < o.height - 8 && o.height / Math.max(o.unitHeight, 1) >= 0.85)
      return "원본은 컨트롤이 패딩을 품어 시각 단위를 채움 / 구현은 패딩이 래퍼로 가고 컨트롤은 텍스트 줄만 → ring이 좁게 감쌈 (accordion형)"
    if (covCounted && o.coverage >= 0.85 && i.coverage < 0.7)
      return "원본 컨트롤은 시각 단위를 채우나 구현 컨트롤은 단위 일부만 차지 → ring 범위 축소"
    if (Math.abs(o.height - i.height) > HEIGHT_ABS) return "포커스 컨트롤 border-box 높이 차이로 ring 세로 범위가 다름"
    if (Math.abs(o.radius[0] - i.radius[0]) > RADIUS_TOL) return "radius 차이로 ring 모서리 곡률이 다름"
    if (Math.abs(o.outlineOffset - i.outlineOffset) > OFFSET_TOL) return "outline-offset 차이로 ring 이격거리가 다름"
    return r.verdict.reasons.join("; ")
  }

  function rowLine(r) {
    const sevIcon =
      r.verdict.severity === "High"
        ? "🔴 High"
        : r.verdict.severity === "Medium"
          ? "🟡 Medium"
          : r.verdict.severity === "OK"
            ? "🟢 OK"
            : "⚪ n/a"
    const scope = r.verdict.scopeMatch === null ? "—" : r.verdict.scopeMatch ? "일치" : "**불일치**"
    const shots = `${r.shots.original ? `[orig](${r.shots.original})` : "—"} · ${r.shots.impl ? `[impl](${r.shots.impl})` : "—"}`
    return `| \`${r.key}\`${r.note ? ` <br><sub>${r.note}</sub>` : ""} | ${sevIcon} | ${fmtMeasure(r.original)} | ${fmtMeasure(r.impl)} | ${scope} | ${rootCause(r)} | ${shots} |`
  }

  lines.push("## 불일치 (심각도순)")
  lines.push("")
  lines.push(...tableHeader)
  for (const r of [...high, ...medium]) lines.push(rowLine(r))
  if (high.length + medium.length === 0) lines.push("| (없음) | | | | | | |")
  lines.push("")

  lines.push("## 일치 (OK)")
  lines.push("")
  lines.push(...tableHeader)
  for (const r of ok) lines.push(rowLine(r))
  if (ok.length === 0) lines.push("| (없음) | | | | | | |")
  lines.push("")

  lines.push("## 측정 불가 / 해당 없음 (n/a)")
  lines.push("")
  lines.push(...tableHeader)
  for (const r of na) lines.push(rowLine(r))
  if (na.length === 0) lines.push("| (없음) | | | | | | |")
  lines.push("")

  // accordion sanity anchor.
  const acc = rows.find((r) => r.key === "accordion")
  lines.push("## Sanity anchor: accordion")
  lines.push("")
  if (acc && acc.original && !acc.original.error && acc.impl && !acc.impl.error) {
    lines.push(
      `- 원본 focusable(\`.btn-accordion\`): h=${acc.original.height}, radius=${acc.original.radius[0]}, coverage=${acc.original.coverage}`
    )
    lines.push(
      `- 구현 focusable(trigger): h=${acc.impl.height}, radius=${acc.impl.radius[0]}, coverage=${acc.impl.coverage}`
    )
    lines.push(`- 판정: **${acc.verdict.severity}** — ${acc.verdict.reasons.join("; ")}`)
    lines.push(`- 기대: 원본 h≈74/radius≈10 (헤더 전체 감쌈) vs 구현 h≈29/radius≈0 (텍스트 줄만) → High mismatch.`)
  } else {
    lines.push("- accordion 측정 실패(위 표 참고).")
  }
  lines.push("")

  writeFileSync(join(OUT_DIR, "focus-scope-report.md"), lines.join("\n"), "utf8")

  console.log("─".repeat(60))
  console.log(`focus-scope 리포트 작성:`)
  console.log(`  ${join(OUT_DIR, "focus-scope-report.md")}`)
  console.log(`  ${join(OUT_DIR, "focus-scope-report.json")}`)
  console.log(`  shots/: ${rows.filter((r) => r.shots.original || r.shots.impl).length} 쌍`)
  console.log(`요약: High ${high.length} · Medium ${medium.length} · OK ${ok.length} · n/a ${na.length}`)
  console.log("─".repeat(60))
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})

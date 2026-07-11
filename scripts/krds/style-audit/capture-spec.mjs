// capture-spec.mjs — KRDS style-audit 공유 스펙 모듈 (ESM, 단일 진실원).
//
// capture-reference.mjs(원본 기준) 와 capture-impl.mjs(구현 실측) 가 모두 import 하여
// 동일한 CSS 속성 집합·상태 집합·정규화 규칙·캡처 절차를 강제한다.
// 두 캡처 산출물이 byte-compatible 한 key 구조를 갖도록 보장하는 것이 목적.
//
// 결과 JSON 구조 (JSON_SCHEMA_DOC 참고):
//   { [componentKey]: { [variant]: { [state]: { light: {prop:val}, dark: {prop:val} } } } }
//
// 사용 측(capture-reference / capture-impl)은:
//   import { PROPERTIES, STATES, normalizeValue, capturePseudoStates, JSON_SCHEMA_DOC } from "./capture-spec.mjs";
// Playwright(chromium) 기반: const cdp = await context.newCDPSession(page);

/**
 * 캡처할 CSS 속성(롱핸드 우선). getComputedStyle 로 읽어 normalizeValue 후 저장.
 * 약 30개. 색/배경/테두리(색·두께·스타일)/radius/패딩·마진(4방향)/gap/타이포/아웃라인/그림자/투명도/display.
 */
export const PROPERTIES = [
  "color",
  "background-color",
  "border-top-width",
  "border-right-width",
  "border-bottom-width",
  "border-left-width",
  "border-top-style",
  "border-right-style",
  "border-bottom-style",
  "border-left-style",
  "border-top-color",
  "border-right-color",
  "border-bottom-color",
  "border-left-color",
  "border-top-left-radius",
  "border-top-right-radius",
  "border-bottom-right-radius",
  "border-bottom-left-radius",
  "padding-top",
  "padding-right",
  "padding-bottom",
  "padding-left",
  "margin-top",
  "margin-right",
  "margin-bottom",
  "margin-left",
  "row-gap",
  "column-gap",
  "font-family",
  "font-size",
  "font-weight",
  "font-style",
  "line-height",
  "letter-spacing",
  "text-decoration-line",
  "text-decoration-color",
  "outline-width",
  "outline-style",
  "outline-color",
  "outline-offset",
  "box-shadow",
  "opacity",
  "display",
]

/**
 * 캡처할 상태 집합. diff 엔진의 focus/상태 전용 섹션이 이 키들을 소비한다.
 * - default      : 의사상태 강제 없음(평상시).
 * - hover        : :hover 강제.
 * - focus        : :focus 강제. (원본 KRDS 는 대개 :focus 에 outline/box-shadow 부여)
 * - focus-visible: :focus-visible 강제. (우리 구현은 focus-visible 에 krds-focus-ring 이중 링)
 * - active       : :active 강제.
 * - disabled     : 의사클래스가 아니라 "요소가 실제로 disabled 인 케이스"로 처리.
 *                  forcedPseudoClasses=[] 로 리셋하고, 대상 요소가 [disabled]/[aria-disabled] 인 변형을 캡처.
 * - visited      : best-effort. 브라우저 프라이버시 제약으로 색상 등 일부만 반영될 수 있음(주석 참고).
 */
export const STATES = ["default", "hover", "focus", "focus-visible", "active", "disabled", "visited"]

/** forcedPseudoClasses 로 강제 가능한 상태 → CDP 의사클래스 이름 매핑. */
const FORCEABLE_PSEUDO = {
  hover: ["hover"],
  focus: ["focus"],
  "focus-visible": ["focus", "focus-visible"],
  active: ["active"],
  visited: ["visited"],
  // default / disabled 는 forcedPseudoClasses=[] (강제 없음).
}

const HEX_RE = /^#([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i
// 임베디드(복합값 내부) hex 매칭용: 앵커 없는 전역 정규식. 워드바운더리로 부분매치 방지.
const HEX_EMBEDDED_RE = /#([0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{4}|[0-9a-f]{3})\b/gi
const PX_RE = /(-?\d+\.?\d*)px/g

/** 폰트 스택 정규화: 따옴표 제거, 소문자, 공백 정리. 토큰(예: Pretendard GOV) 비교 안정화. */
function normalizeFontFamily(value) {
  return value
    .split(",")
    .map((f) =>
      f
        .trim()
        .replace(/^["']|["']$/g, "")
        .toLowerCase()
    )
    .filter(Boolean)
    .join(", ")
}

/** #rgb/#rrggbb/#rrggbbaa → rgb()/rgba() 문자열. */
function hexToRgb(hex) {
  let h = hex.slice(1)
  if (h.length === 3)
    h = h
      .split("")
      .map((c) => c + c)
      .join("")
  if (h.length === 4)
    h = h
      .split("")
      .map((c) => c + c)
      .join("")
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  if (h.length === 8) {
    const a = parseInt(h.slice(6, 8), 16) / 255
    return `rgba(${r}, ${g}, ${b}, ${round1(a)})`
  }
  return `rgb(${r}, ${g}, ${b})`
}

/** 소수 첫째 자리 반올림. */
function round1(n) {
  return Math.round(n * 10) / 10
}

/**
 * oklab()/oklch() → rgb()/rgba() 변환.
 * 우리 구현(impl)은 Tailwind v4 라 색이 oklab/oklch 로 computed 되는 경우가 있고,
 * 원본(reference) KRDS CSS 는 hex/rgb 라서, 변환 없이 비교하면 시각적으로 같은 색도
 * 표현 차이만으로 전부 불일치(거짓양성 High)가 된다. 동일 rgb 공간으로 맞춰 비교.
 * computed 형식 예: "oklab(0.628 0.225 0.126 / 0.5)", "oklch(0.628 0.258 29.23)".
 */
function oklabToRgb(L, a, b, alpha) {
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b
  const s_ = L - 0.0894841775 * a - 1.291485548 * b
  const l = l_ * l_ * l_
  const m = m_ * m_ * m_
  const s = s_ * s_ * s_
  let R = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s
  let G = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s
  let B = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s
  const gamma = (c) => {
    const v = c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055
    return Math.min(255, Math.max(0, Math.round(v * 255)))
  }
  R = gamma(R)
  G = gamma(G)
  B = gamma(B)
  if (alpha != null && alpha < 1) return `rgba(${R}, ${G}, ${B}, ${round1(alpha)})`
  return `rgb(${R}, ${G}, ${B})`
}

/** "L a b / alpha" 또는 "L C H / alpha" 토큰 파싱. %·deg 처리. */
function parseColorComps(inner, isLch) {
  const slash = inner.split("/")
  const main = slash[0].trim().split(/\s+/).filter(Boolean)
  let alpha = 1
  if (slash[1] != null) {
    const at = slash[1].trim()
    alpha = at.endsWith("%") ? parseFloat(at) / 100 : parseFloat(at)
  }
  const parseL = (t) => (t.endsWith("%") ? parseFloat(t) / 100 : parseFloat(t))
  const L = parseL(main[0])
  if (isLch) {
    const C = main[1].endsWith("%") ? (parseFloat(main[1]) / 100) * 0.4 : parseFloat(main[1])
    const Hraw = main[2] ?? "0"
    const H = parseFloat(Hraw) // deg 단위(또는 무단위=deg)
    const hr = (H * Math.PI) / 180
    return { L, a: C * Math.cos(hr), b: C * Math.sin(hr), alpha }
  }
  return { L, a: parseFloat(main[1]), b: parseFloat(main[2]), alpha }
}

/** oklab()/oklch() 문자열 하나를 rgb 로. 파싱 실패 시 원본 반환. */
function convertOklab(match) {
  try {
    const isLch = /^oklch/i.test(match)
    const inner = match.replace(/^okl(ab|ch)\(/i, "").replace(/\)$/, "")
    const { L, a, b, alpha } = parseColorComps(inner, isLch)
    if ([L, a, b].some((n) => Number.isNaN(n))) return match
    return oklabToRgb(L, a, b, alpha)
  } catch {
    return match
  }
}

const OKLAB_RE = /okl(?:ab|ch)\([^)]*\)/gi

/**
 * CSS lab()/lch() → rgb()/rgba(). CSS Color 4 정의(D50 기준) → Bradford D50→D65 → linear sRGB → sRGB.
 * Tailwind v4 impl 이 일부 색을 lab()/lch() 로 computed 함(원본은 rgb) → 표현차 거짓양성 방지.
 */
function labToRgb(L, a, b, alpha) {
  const kappa = 24389 / 27
  const eps = 216 / 24389
  const f1 = (L + 16) / 116
  const fx = f1 + a / 500
  const fz = f1 - b / 200
  const xr = fx ** 3 > eps ? fx ** 3 : (116 * fx - 16) / kappa
  const yr = L > kappa * eps ? f1 ** 3 : L / kappa
  const zr = fz ** 3 > eps ? fz ** 3 : (116 * fz - 16) / kappa
  // D50 reference white.
  let X = xr * 0.9642956764295677
  let Y = yr * 1.0
  let Z = zr * 0.8251046025104602
  // Bradford adaptation D50 → D65.
  const X65 = 0.9554734527042182 * X - 0.023098536874261423 * Y + 0.0632593086610217 * Z
  const Y65 = -0.028369706963208136 * X + 1.0099954580058226 * Y + 0.021041398966943008 * Z
  const Z65 = 0.012314001688319899 * X - 0.020507696433477912 * Y + 1.3303659366080753 * Z
  // XYZ(D65) → linear sRGB.
  let r = 3.2409699419045226 * X65 - 1.537383177570094 * Y65 - 0.4986107602930034 * Z65
  let g = -0.9692436362808796 * X65 + 1.8759675015077202 * Y65 + 0.04155505740717559 * Z65
  let bl = 0.05563007969699366 * X65 - 0.20397695888897652 * Y65 + 1.0569715142428786 * Z65
  const gamma = (c) => {
    const s = c < 0 ? -1 : 1
    const ac = Math.abs(c)
    const v = ac <= 0.0031308 ? 12.92 * ac : 1.055 * Math.pow(ac, 1 / 2.4) - 0.055
    return Math.min(255, Math.max(0, Math.round(s * v * 255)))
  }
  r = gamma(r)
  g = gamma(g)
  bl = gamma(bl)
  if (alpha != null && alpha < 1) return `rgba(${r}, ${g}, ${bl}, ${round1(alpha)})`
  return `rgb(${r}, ${g}, ${bl})`
}

/** lab()/lch() 문자열 하나를 rgb 로. 파싱 실패 시 원본 반환. */
function convertLab(match) {
  try {
    const isLch = /^lch/i.test(match)
    const inner = match.replace(/^l(ab|ch)\(/i, "").replace(/\)$/, "")
    const slash = inner.split("/")
    const main = slash[0].trim().split(/\s+/).filter(Boolean)
    let alpha = 1
    if (slash[1] != null) {
      const at = slash[1].trim()
      alpha = at.endsWith("%") ? parseFloat(at) / 100 : parseFloat(at)
    }
    const L = main[0].endsWith("%") ? parseFloat(main[0]) : parseFloat(main[0])
    let a, b
    if (isLch) {
      const C = parseFloat(main[1])
      const H = parseFloat(main[2] ?? "0")
      const hr = (H * Math.PI) / 180
      a = C * Math.cos(hr)
      b = C * Math.sin(hr)
    } else {
      a = parseFloat(main[1])
      b = parseFloat(main[2])
    }
    if ([L, a, b].some((n) => Number.isNaN(n))) return match
    return labToRgb(L, a, b, alpha)
  } catch {
    return match
  }
}

// lab()/lch() 매칭(oklab/oklch 와 구분: 앞에 'ok' 가 없어야 함).
const LAB_RE = /(?<![a-z])l(?:ab|ch)\([^)]*\)/gi

/** rgb()/rgba() 내부 수치 정규화(공백/알파 일관화). */
function normalizeRgb(value) {
  const nums = value.match(/-?\d*\.?\d+/g)
  if (!nums) return value
  if (value.startsWith("rgba") || nums.length === 4) {
    const [r, g, b, a = "1"] = nums
    const alpha = round1(parseFloat(a))
    if (alpha === 1) return `rgb(${+r}, ${+g}, ${+b})`
    return `rgba(${+r}, ${+g}, ${+b}, ${alpha})`
  }
  const [r, g, b] = nums
  return `rgb(${+r}, ${+g}, ${+b})`
}

/**
 * 비교용 값 정규화.
 * - 색(color/*-color, box-shadow 내 색 포함): hex→rgb(), rgb/rgba 수치/알파 일관화.
 * - 길이(px 포함): 소수 첫째 자리 반올림.
 * - font-family: 따옴표 제거·소문자.
 * - 그 외: trim.
 * @param {string} prop  CSS 속성명
 * @param {string} value getComputedStyle 결과 문자열
 * @returns {string} 정규화 값
 */
export function normalizeValue(prop, value) {
  if (value == null) return ""
  let v = String(value).trim()
  if (v === "") return v

  if (prop === "font-family") return normalizeFontFamily(v)

  // 순수 hex 색(값 전체가 단일 hex).
  if (HEX_RE.test(v)) return hexToRgb(v)

  // 순수 oklab/oklch 색(값 전체가 단일 색).
  if (/^okl(ab|ch)\([^)]*\)$/i.test(v)) return convertOklab(v)

  // 순수 lab/lch 색(oklab/oklch 와 구분 — 'ok' 접두 없음).
  if (/^l(ab|ch)\([^)]*\)$/i.test(v)) return convertLab(v)

  // 순수 rgb/rgba(값 전체가 단일 색). 앵커로 복합값(다중 box-shadow 등) 오매칭 방지.
  if (/^rgba?\([^)]*\)$/i.test(v)) return normalizeRgb(v)

  // 색을 포함할 수 있는 복합값(box-shadow, text-decoration-color 등): 내부 oklab/lab/hex/rgb 정규화.
  if (prop === "box-shadow" || prop.endsWith("color")) {
    v = v.replace(OKLAB_RE, (m) => convertOklab(m))
    v = v.replace(LAB_RE, (m) => convertLab(m))
    v = v.replace(HEX_EMBEDDED_RE, (m) => hexToRgb(m))
    v = v.replace(/rgba?\([^)]*\)/gi, (m) => normalizeRgb(m))
  }

  // 길이 px 반올림(font-size/line-height/letter-spacing/패딩/마진/radius/outline/gap 등).
  if (PX_RE.test(v)) {
    v = v.replace(PX_RE, (_m, n) => `${round1(parseFloat(n))}px`)
  }

  return v.replace(/\s+/g, " ").trim()
}

/**
 * 주어진 셀렉터 요소에 대해 각 상태를 CDP 로 강제한 뒤 PROPERTIES 를 읽어 반환.
 *
 * @param {import('playwright').Page} page         Playwright Page
 * @param {import('playwright').CDPSession} cdpSession  await context.newCDPSession(page) 로 생성
 * @param {string} selector  querySelector 로 해석 가능한 CSS 셀렉터(component-map 의 selector)
 * @param {string[]} [states=STATES]  캡처할 상태 부분집합
 * @returns {Promise<Object>} { [state]: { [prop]: normalizedValue } }. 요소 없으면 빈 객체.
 *
 * 절차(CDP):
 *   const { root } = await cdp.send('DOM.getDocument');
 *   const { nodeId } = await cdp.send('DOM.querySelector', { nodeId: root.nodeId, selector });
 *   await cdp.send('CSS.enable');
 *   await cdp.send('CSS.forcePseudoState', { nodeId, forcedPseudoClasses: [...] });
 * 읽기는 page.evaluate(getComputedStyle) 로 수행(강제된 의사상태가 computed 에 반영됨).
 *
 * 주의:
 *  - disabled 는 의사클래스가 아니므로 forcedPseudoClasses=[] 로 두고,
 *    호출 측이 실제 disabled 요소를 selector 로 지정해야 의미가 있다(여기서는 default 와 동일 절차).
 *  - visited 는 브라우저 프라이버시 제약으로 color 등 일부만 반영될 수 있다(best-effort).
 *  - focus-visible 은 ['focus','focus-visible'] 를 함께 강제해야 :focus-visible 룰이 적용된다.
 */
export async function capturePseudoStates(page, cdpSession, selector, states = STATES) {
  const result = {}

  // DOM 문서 루트 노드 확보.
  const { root } = await cdpSession.send("DOM.getDocument", { depth: -1 })
  const { nodeId } = await cdpSession.send("DOM.querySelector", {
    nodeId: root.nodeId,
    selector,
  })

  if (!nodeId) {
    // 요소 없음 → 빈 객체 반환(diff 엔진이 "캡처 누락"으로 분류).
    return result
  }

  await cdpSession.send("CSS.enable").catch(() => {})

  for (const state of states) {
    const forced = FORCEABLE_PSEUDO[state] ?? []
    try {
      await cdpSession.send("CSS.forcePseudoState", {
        nodeId,
        forcedPseudoClasses: forced,
      })
    } catch {
      // 강제 실패(노드 무효 등) → 해당 상태 스킵.
      continue
    }

    // 강제된 상태에서 computed style 읽기.
    const styles = await page.evaluate(
      ({ sel, props }) => {
        const el = document.querySelector(sel)
        if (!el) return null
        const cs = getComputedStyle(el)
        const out = {}
        for (const p of props) out[p] = cs.getPropertyValue(p)
        return out
      },
      { sel: selector, props: PROPERTIES }
    )

    if (styles) {
      const normalized = {}
      for (const p of PROPERTIES) normalized[p] = normalizeValue(p, styles[p])
      result[state] = normalized
    }
  }

  // 의사상태 강제 해제(다음 요소 캡처에 누수 방지).
  try {
    await cdpSession.send("CSS.forcePseudoState", { nodeId, forcedPseudoClasses: [] })
  } catch {
    /* noop */
  }

  return result
}

/**
 * 결과 JSON 구조 문서. capture-reference / capture-impl 산출물과 diff 엔진이 공유.
 */
export const JSON_SCHEMA_DOC = `
KRDS style-audit 캡처 산출물 스키마 (krds-reference.json / krds-impl.json 공통):

{
  "<componentKey>": {            // component-map.json 의 components[].componentKey (예: "button")
    "<variant>": {               // component-map.json 의 variants[].key (예: "primary")
      "<state>": {               // STATES 중 하나: default|hover|focus|focus-visible|active|disabled|visited
        "light": {               // ?theme=light(또는 라이트 모드)에서 캡처
          "<cssProp>": "<normalizedValue>"   // PROPERTIES 의 각 속성 → normalizeValue 적용 값
        },
        "dark": {                // ?theme=dark(또는 다크/high-contrast 모드)에서 캡처
          "<cssProp>": "<normalizedValue>"
        }
      }
    }
  }
}

규칙:
- componentKey/variant/state 키는 component-map.json 및 STATES 와 정확히 일치해야 한다(byte-compatible).
- 특정 state 가 캡처되지 않으면(요소 부재 등) 해당 state 키를 생략한다 → diff 엔진이 "캡처 누락"으로 분류.
- light/dark 두 테마 모두 캡처. 한쪽 테마만 있으면 diff 엔진이 누락으로 표기.
- 값은 반드시 normalizeValue 를 거친 비교 가능 형태로 저장(색=rgb, 길이=px 소수1자리, font-family=정규화).
- 색 정규화는 hex/rgb 뿐 아니라 oklab()/oklch()(Tailwind v4 impl)도 rgb 로 변환한다 → 원본(rgb)과 표현차 거짓양성 방지.
- visited 는 best-effort(프라이버시 제약), disabled 는 실제 disabled 요소 캡처(의사클래스 아님).
`

export default {
  PROPERTIES,
  STATES,
  normalizeValue,
  capturePseudoStates,
  JSON_SCHEMA_DOC,
}

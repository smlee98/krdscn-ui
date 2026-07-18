// 원본(:4173/view/*) vs 우리(:8080/docs/components/*) 상태별 캡처.
// 판정은 스크립트가 아니라 모델 눈으로 쌍별 비교한다 (memory: krds-render-compare-harness).
// usage: node capture-compare.mjs <target> [--dark]
import { chromium } from "playwright-core"
import path from "node:path"
import { fileURLToPath } from "node:url"

const OUT = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "..",
  "..",
  ".omc",
  "artifacts",
  "render-compare"
)
const ORIG = "http://localhost:4173/view"
const OURS = "https://localhost:8080/docs/components"

// 각 타깃: 원본 조각 / 우리 문서 슬러그 / 상태별 액션
const TARGETS = {
  select: {
    orig: `${ORIG}/select`,
    ours: `${OURS}/select`,
    oursReadySlot: "krds-select",
    shots: [
      { name: "default", action: null },
      {
        name: "open",
        action: async (page, side) => {
          if (side === "ours") {
            await page.locator('[data-slot="krds-select-trigger"]').first().click()
          } else {
            // 원본은 네이티브 select — 열림 팝업은 OS 렌더라 캡처 불가, focus 상태로 대체
            await page.locator("select.krds-form-select").first().focus()
          }
          await page.waitForTimeout(400)
        },
      },
    ],
  },
  calendar: {
    orig: `${ORIG}/calendar`,
    ours: `${OURS}/calendar`,
    oursReadySlot: "krds-calendar",
    shots: [
      {
        name: "default",
        action: async (page, side) => {
          // 원본은 datepicker 필드 — 레이어를 열어야 달력이 보인다. 우리는 상시 렌더.
          // 레이어가 위쪽으로 열리므로(bottom-anchored) 상단 패딩으로 뷰포트 안에 넣는다.
          if (side === "orig") {
            await page.addStyleTag({ content: "body{padding-top:620px}" })
            await page.locator(".form-btn-datepicker").first().click()
            await page.waitForTimeout(500)
          }
        },
      },
      {
        name: "dropdown-open",
        action: async (page, side) => {
          if (side === "ours") {
            // 월/연 드롭다운 (KRDS Select sorting 변형으로 졸업한 부분)
            await page.locator('[data-slot="krds-calendar-dropdown"]').first().click()
          } else {
            const yearSwitch = page.locator(".btn-cal-switch.year:visible").first()
            await yearSwitch.scrollIntoViewIfNeeded()
            await yearSwitch.click({ force: true, timeout: 10000 })
          }
          await page.waitForTimeout(400)
        },
      },
    ],
  },
  "date-input": {
    orig: `${ORIG}/date_input`,
    ours: `${OURS}/date-input`,
    oursReadySlot: "krds-date-input",
    shots: [
      { name: "default", action: null },
      {
        name: "popover-open",
        action: async (page, side) => {
          if (side === "ours") {
            await page.locator('[data-slot="krds-date-input-trigger"]').first().click()
          } else {
            await page.addStyleTag({ content: "body{padding-top:620px}" })
            await page.locator(".form-btn-datepicker").first().click()
          }
          await page.waitForTimeout(600)
        },
      },
    ],
  },
  header: {
    orig: `${ORIG}/header`,
    ours: `${OURS}/header`,
    oursReadySlot: "krds-header",
    shots: [
      { name: "default", action: null },
      {
        name: "dropdown-open",
        action: async (page, side) => {
          if (side === "ours") {
            const trig = page.locator('[data-slot="krds-header"] button', { hasText: "나의GOV" }).first()
            if (await trig.count()) await trig.click()
            else await page.locator('[data-slot^="krds-header-utility-dropdown"] button').first().click()
          } else {
            const trig = page.locator("#header .drop-wrap button, .header-utility button").first()
            if (await trig.count()) await trig.click()
          }
          await page.waitForTimeout(500)
        },
      },
    ],
  },
  resize: {
    orig: `${ORIG}/resize`,
    ours: `${OURS}/resize`,
    oursReadySlot: "krds-resize",
    shots: [
      { name: "default", action: null },
      {
        name: "open",
        action: async (page, side) => {
          if (side === "ours") {
            await page.locator('[data-slot="krds-resize"] button').first().click()
          } else {
            await page.locator(".krds-resize .drop-btn").first().click()
          }
          await page.waitForTimeout(500)
        },
      },
    ],
  },
}

async function launch() {
  for (const channel of ["chrome", "msedge"]) {
    try {
      return await chromium.launch({ channel })
    } catch {
      /* try next */
    }
  }
  throw new Error("chrome/msedge 채널 모두 실패")
}

const targetName = process.argv[2]
const dark = process.argv.includes("--dark")
const target = TARGETS[targetName]
if (!target) {
  console.error(`unknown target: ${targetName}. one of: ${Object.keys(TARGETS).join(", ")}`)
  process.exit(1)
}

const browser = await launch()
const ctx = await browser.newContext({
  ignoreHTTPSErrors: true,
  viewport: { width: 1440, height: 1000 },
  deviceScaleFactor: 1,
})

async function shoot(side, url, readySlot) {
  const page = await ctx.newPage()
  if (side === "ours" && dark) {
    // next-themes(class 전략)는 런타임에 html class를 소유하므로 저장소 키로 주입
    await page.addInitScript(() => localStorage.setItem("theme", "dark"))
  }
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 120000 })
  if (side === "ours") {
    await page.waitForSelector(`[data-slot="${readySlot}"]`, { timeout: 120000 })
    await page.locator(`[data-slot="${readySlot}"]`).first().scrollIntoViewIfNeeded()
  } else {
    await page.waitForTimeout(800) // ui-script init
  }
  for (const shot of target.shots) {
    if (shot.action) await shot.action(page, side)
    await page.mouse.move(5, 5) // hover 잔상 제거
    await page.waitForTimeout(250)
    const file = path.join(OUT, `${targetName}${dark ? "-dark" : ""}-${shot.name}-${side}.png`)
    await page.screenshot({ path: file, fullPage: side === "orig" })
    console.log(`saved ${file}`)
  }
  await page.close()
}

await shoot("orig", target.orig, null)
await shoot("ours", target.ours, target.oursReadySlot)
await browser.close()
console.log("done")

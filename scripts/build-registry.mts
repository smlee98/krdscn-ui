// build-registry.mts — shadcn 레지스트리 파이프라인.
//
// registry/krds/ui/*.tsx 전 파일을 엔트리로 import 그래프를 재귀 탐색해
// 각 컴포넌트의 파일 목록·npm 의존성·registryDependencies 를 자동 산출하고,
// 루트 registry.json 을 생성한다. 이후 `shadcn build` 가 public/r/*.json 을 만든다.
//
// 배포 모델 (shadcn 관례):
//  - 파일 target 은 하드코딩 경로 대신 @ui/ @lib/ @hooks/ 플레이스홀더 — 소비자
//    components.json aliases 로 해석된다.
//  - KRDS → KRDS import 는 파일 동봉 대신 registryDependencies(항목 URL) 로 선언.
//  - KRDS → shadcn 베이스(components/ui/*) import 는 공식 shadcn 레지스트리 이름
//    ("calendar" 등) registryDependency 로 선언 — 소비자의 기존 커스텀을 덮어쓰지 않는다.
//  - krds-theme 은 app/krds.css 를 파싱해 cssVars(theme/light/dark) + css(@utility,
//    @media) 필드로 배포 — 설치 시 소비자 CSS 에 자동 주입된다(수동 @import 불필요).
//
// 항목 구성:
//  - <component> × N — registry/krds/ui/*.tsx
//  - krds-theme      — KRDS 토큰 (registry:theme, cssVars/css)
//  - krds-utils      — lib/utils.ts (cn)
//  - use-mobile      — lib/hooks/use-mobile.ts
//  - krds-all        — 전체 묶음 (registry:block)
//
// 실행: yarn registry:build  (= tsx scripts/build-registry.mts && shadcn build)

import { promises as fs } from "node:fs"
import path from "node:path"

// CJS/ESM interop 때문에 named import 대신 동적 import
let COMPONENT_COPY: Record<string, { intro: string }> = {}
try {
  const mod = (await import("../lib/component-copy")) as {
    COMPONENT_COPY?: typeof COMPONENT_COPY
    default?: { COMPONENT_COPY?: typeof COMPONENT_COPY }
  }
  COMPONENT_COPY = mod.COMPONENT_COPY ?? mod.default?.COMPONENT_COPY ?? {}
} catch {
  console.warn("⚠ lib/component-copy 로드 실패 — description 없이 생성합니다.")
}

const ROOT = process.cwd()
const REGISTRY_NAME = "krdscn-ui"
const HOMEPAGE = "https://krdscn-ui.smlee.info"
// 항목 간 참조(registryDependencies) base URL — 로컬 E2E 테스트 시 KRDS_REGISTRY_URL 로 오버라이드
const REGISTRY_URL = process.env.KRDS_REGISTRY_URL ?? `${HOMEPAGE}/r`
const KRDS_UI_DIR = path.join(ROOT, "registry/krds/ui")
const KRDS_UI_PREFIX = "@/registry/krds/ui/"
const SHADCN_BASE_PREFIX = "@/components/ui/"

// 프레임워크/런타임 제공 — 레지스트리 dependencies 에서 제외
const EXCLUDED_PACKAGES = new Set(["react", "react-dom", "next"])

type RegistryFile = { path: string; type: string; target?: string }
type RegistryItem = {
  name: string
  type: string
  title?: string
  description?: string
  dependencies?: string[]
  registryDependencies?: string[]
  files?: RegistryFile[]
  cssVars?: Record<string, Record<string, string>>
  css?: Record<string, unknown>
}

const pkg = JSON.parse(await fs.readFile(path.join(ROOT, "package.json"), "utf8"))
const DEP_VERSIONS: Record<string, string> = { ...pkg.dependencies }

function toPosix(p: string) {
  return p.split(path.sep).join("/")
}

/** import 스펙에서 npm 패키지 루트 이름 추출 ("@radix-ui/react-slot/x" → "@radix-ui/react-slot") */
function packageRoot(spec: string) {
  const parts = spec.split("/")
  return spec.startsWith("@") ? parts.slice(0, 2).join("/") : (parts[0] ?? spec)
}

async function fileExists(p: string) {
  try {
    await fs.stat(p)
    return true
  } catch {
    return false
  }
}

/** "@/..." 또는 상대 import 를 실제 파일 경로로 해석. 실패 시 예외. */
async function resolveSourceFile(spec: string, fromFile: string): Promise<string> {
  const base = spec.startsWith("@/") ? path.join(ROOT, spec.slice(2)) : path.resolve(path.dirname(fromFile), spec)
  const candidates = [base, `${base}.tsx`, `${base}.ts`, path.join(base, "index.tsx"), path.join(base, "index.ts")]
  for (const candidate of candidates) {
    if ((await fileExists(candidate)) && (await fs.stat(candidate)).isFile()) return candidate
  }
  throw new Error(`import 해석 실패: "${spec}" (from ${toPosix(path.relative(ROOT, fromFile))})`)
}

// 멀티라인 import(`import {\n ... \n} from "..."`)도 잡도록 `from "..."` 자체를 매칭
const FROM_RE = /\bfrom\s*["']([^"']+)["']/g
const SIDE_EFFECT_IMPORT_RE = /(?:^|\n)\s*import\s*["']([^"']+)["']/g

function extractImportSpecs(source: string): string[] {
  const specs: string[] = []
  for (const match of source.matchAll(FROM_RE)) if (match[1]) specs.push(match[1])
  for (const match of source.matchAll(SIDE_EFFECT_IMPORT_RE)) if (match[1]) specs.push(match[1])
  return specs
}

/**
 * 엔트리 파일에서 시작해 수집:
 *  - files: 동봉할 내부 소스 (엔트리 + lib/ 등 비-항목 파일)
 *  - packages: npm 의존성
 *  - krdsDeps: 다른 KRDS 항목 이름 (registryDependencies URL 로 선언, 동봉 안 함)
 *  - shadcnDeps: 공식 shadcn 항목 이름 (registryDependencies 이름으로 선언, 동봉 안 함)
 *  - needsUtils: @/lib/utils(cn) 사용 여부 — krds-utils 항목 의존으로 선언 (KRDS
 *    타이포 충돌 그룹을 등록한 커스텀 cn 이라 소비자 기본 utils 로 대체 불가)
 */
async function walkImportGraph(entryFile: string) {
  const files = new Set<string>()
  const packages = new Set<string>()
  const krdsDeps = new Set<string>()
  const shadcnDeps = new Set<string>()
  let needsUtils = false
  const queue = [entryFile]

  while (queue.length > 0) {
    const file = queue.shift()!
    const relative = toPosix(path.relative(ROOT, file))
    if (files.has(relative)) continue
    files.add(relative)

    const source = await fs.readFile(file, "utf8")
    for (const spec of extractImportSpecs(source)) {
      // 다른 KRDS 컴포넌트 → 항목 간 의존으로 선언 (엔트리 자신 제외)
      if (spec.startsWith(KRDS_UI_PREFIX)) {
        const name = spec.slice(KRDS_UI_PREFIX.length)
        const specFile = path.join(KRDS_UI_DIR, `${name}.tsx`)
        if (path.resolve(specFile) !== path.resolve(entryFile)) {
          if (!(await fileExists(specFile))) throw new Error(`KRDS 항목 해석 실패: "${spec}" (from ${relative})`)
          krdsDeps.add(name)
          continue
        }
      }
      // shadcn 베이스 → 공식 레지스트리 이름으로 선언 (파일 동봉 안 함)
      if (spec.startsWith(SHADCN_BASE_PREFIX)) {
        shadcnDeps.add(spec.slice(SHADCN_BASE_PREFIX.length))
        continue
      }
      // cn 유틸 → krds-utils 항목 의존으로 선언 (파일 동봉 안 함)
      if (spec === "@/lib/utils") {
        needsUtils = true
        continue
      }
      if (spec.startsWith("@/") || spec.startsWith(".")) {
        queue.push(await resolveSourceFile(spec, file))
        continue
      }
      const root = packageRoot(spec)
      if (!EXCLUDED_PACKAGES.has(root)) packages.add(root)
    }
  }

  return {
    files: [...files],
    packages: [...packages].sort(),
    krdsDeps: [...krdsDeps].sort(),
    shadcnDeps: [...shadcnDeps].sort(),
    needsUtils,
  }
}

/** 저장소 경로 → registry 파일 타입 */
function fileType(relative: string) {
  if (relative.startsWith("registry/krds/ui/")) return "registry:ui"
  if (relative.startsWith("lib/hooks/")) return "registry:hook"
  if (relative.startsWith("lib/")) return "registry:lib"
  if (relative.startsWith("components/")) return "registry:component"
  return "registry:file"
}

/** 설치 위치 — 소비자 aliases 로 해석되는 플레이스홀더 target */
function fileTarget(relative: string): string | undefined {
  if (relative.startsWith("registry/krds/ui/")) return `@ui/${relative.slice("registry/krds/ui/".length)}`
  if (relative.startsWith("lib/hooks/")) return `@hooks/${relative.slice("lib/hooks/".length)}`
  if (relative.startsWith("lib/")) return `@lib/${relative.slice("lib/".length)}`
  return undefined
}

function toRegistryFile(relative: string): RegistryFile {
  const target = fileTarget(relative)
  return { path: relative, type: fileType(relative), ...(target ? { target } : {}) }
}

/** package.json 의 버전 범위를 붙여 의존성 표기 ("radix-ui@^1.4.3") */
function toDependency(name: string) {
  const range = DEP_VERSIONS[name]
  return range && /^[\^~]?\d/.test(range) ? `${name}@${range}` : name
}

function itemRef(name: string) {
  return `${REGISTRY_URL}/${name}.json`
}

// ── krds.css → cssVars / css 필드 파싱 ──────────────────────────────────────────
// app/krds.css 는 규칙적 구조를 유지해야 한다:
//   @utility <name> { ... } / @theme inline { ... } / :root { ... }
//   @media (min-width: 1024px) { :root { ... } } / .dark { ... }
// 새 최상위 블록 형태를 추가하면 이 파서도 함께 갱신할 것 (미인식 블록은 에러).

function stripCssComments(css: string) {
  return css.replace(/\/\*[\s\S]*?\*\//g, "")
}

/** "prop: value; ..." 본문 → 선언 객체. cssVars 용은 앞의 "--" 를 벗긴다. */
function parseDeclarations(body: string, { stripVarPrefix = false } = {}): Record<string, string> {
  const out: Record<string, string> = {}
  for (const decl of body.split(";")) {
    const idx = decl.indexOf(":")
    if (idx === -1) continue
    const prop = decl.slice(0, idx).trim()
    const value = decl.slice(idx + 1).trim()
    if (!prop || !value) continue
    out[stripVarPrefix ? prop.replace(/^--/, "") : prop] = value
  }
  return out
}

/** 최상위 블록(selector { body })을 중괄호 균형으로 순회 */
function* topLevelBlocks(css: string): Generator<{ selector: string; body: string }> {
  let i = 0
  while (i < css.length) {
    const open = css.indexOf("{", i)
    if (open === -1) break
    const selector = css.slice(i, open).trim()
    let depth = 1
    let j = open + 1
    while (j < css.length && depth > 0) {
      if (css[j] === "{") depth++
      else if (css[j] === "}") depth--
      j++
    }
    yield { selector, body: css.slice(open + 1, j - 1) }
    i = j
  }
}

async function buildThemeFields() {
  const raw = await fs.readFile(path.join(ROOT, "app/krds.css"), "utf8")
  const css = stripCssComments(raw)

  const cssVars: Record<string, Record<string, string>> = {}
  const cssField: Record<string, unknown> = {}

  for (const { selector, body } of topLevelBlocks(css)) {
    if (selector.startsWith("@utility ")) {
      cssField[selector] = parseDeclarations(body)
    } else if (selector === "@theme inline") {
      cssVars.theme = parseDeclarations(body, { stripVarPrefix: true })
    } else if (selector === ":root") {
      cssVars.light = parseDeclarations(body, { stripVarPrefix: true })
    } else if (selector === ".dark") {
      cssVars.dark = parseDeclarations(body, { stripVarPrefix: true })
    } else if (selector.startsWith("@media")) {
      const inner: Record<string, Record<string, string>> = {}
      for (const block of topLevelBlocks(body)) {
        inner[block.selector] = parseDeclarations(block.body)
      }
      cssField[selector] = inner
    } else {
      throw new Error(`krds.css 파서가 모르는 최상위 블록: "${selector}" — buildThemeFields() 를 갱신하세요.`)
    }
  }

  for (const section of ["theme", "light", "dark"] as const) {
    if (!cssVars[section] || Object.keys(cssVars[section]).length === 0) {
      throw new Error(`krds.css 파싱 결과 cssVars.${section} 이 비어 있습니다 — 구조 변경 여부를 확인하세요.`)
    }
  }

  return { cssVars, css: cssField }
}

// COMPONENT_COPY 는 SidebarItemId(문서 사이드바 최상위 항목)로만 타입이 고정돼 있어
// 별도 문서 페이지가 없는 레지스트리 아이템은 description 이 비게 된다:
//  - field-message: text-input/select/textarea/date-input 이 공유하는 힌트·에러 메시지 파트 (자체 사이드바 항목 없음)
//  - main-menu-mobile: main-menu 문서 페이지 안에 두 번째 예제로만 포함되는 모바일 GNB 드로어
// 새 사이드바 항목을 만들 정도는 아니라 여기서만 보강한다.
const EXTRA_DESCRIPTIONS: Record<string, string> = {
  "field-message":
    "필드 메시지는 입력 필드 아래에 힌트·에러·성공·안내 상태를 아이콘과 함께 보여주는 공용 메시지 파트이다.",
  "main-menu-mobile":
    "모바일 메인 메뉴는 작은 화면에서 전체 메뉴·검색·로그인·서비스 바로가기를 담는 전체화면 드로어이다.",
}

// ── 컴포넌트 항목 ────────────────────────────────────────────────────────────────
const entryFiles = (await fs.readdir(KRDS_UI_DIR))
  .filter((file) => file.endsWith(".tsx"))
  .map((file) => path.join(KRDS_UI_DIR, file))
  .sort()

const componentItems: RegistryItem[] = []
for (const entryFile of entryFiles) {
  const name = path.basename(entryFile, ".tsx")
  const { files, packages, krdsDeps, shadcnDeps, needsUtils } = await walkImportGraph(entryFile)
  const copy = (COMPONENT_COPY as Record<string, { intro: string }>)[name]

  componentItems.push({
    name,
    type: "registry:ui",
    title: name,
    description: copy?.intro ?? EXTRA_DESCRIPTIONS[name],
    dependencies: packages.map(toDependency),
    registryDependencies: [
      itemRef("krds-theme"),
      ...(needsUtils ? [itemRef("krds-utils")] : []),
      ...shadcnDeps,
      ...krdsDeps.map(itemRef),
    ],
    files: files.map(toRegistryFile),
  })
}

const duplicated = componentItems.map((item) => item.name).filter((name, i, all) => all.indexOf(name) !== i)
if (duplicated.length > 0) throw new Error(`컴포넌트 이름 충돌: ${duplicated.join(", ")}`)

// ── 인프라 항목 ───────────────────────────────────────────────────────────────
const themeFields = await buildThemeFields()
const themeItem: RegistryItem = {
  name: "krds-theme",
  type: "registry:theme",
  title: "KRDS theme tokens",
  description: "KRDS 디자인 토큰(색상·타이포그래피·포커스 링). 설치 시 프로젝트 CSS에 자동 주입됩니다.",
  cssVars: themeFields.cssVars,
  css: themeFields.css,
}

const utilsItem: RegistryItem = {
  name: "krds-utils",
  type: "registry:lib",
  title: "krds-utils",
  description: "컴포넌트에서 사용하는 cn(clsx + tailwind-merge) 유틸리티.",
  dependencies: ["clsx", "tailwind-merge"].map(toDependency),
  files: [toRegistryFile("lib/utils.ts")],
}

const useMobileItem: RegistryItem = {
  name: "use-mobile",
  type: "registry:hook",
  title: "use-mobile",
  description: "반응형 컴포넌트를 위한 모바일 뷰포트 감지 훅.",
  files: [toRegistryFile("lib/hooks/use-mobile.ts")],
}

const allItem: RegistryItem = {
  name: "krds-all",
  type: "registry:block",
  title: "krds-all",
  description: "KRDS 전체 UI 컴포넌트 묶음.",
  registryDependencies: [itemRef("krds-theme"), ...componentItems.map((item) => itemRef(item.name))],
}

// ── registry.json 출력 ────────────────────────────────────────────────────────
const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: REGISTRY_NAME,
  homepage: HOMEPAGE,
  items: [themeItem, utilsItem, useMobileItem, ...componentItems, allItem],
}

// 간단 자기 검증: 하드코딩 저장소 경로 target 금지
for (const item of registry.items) {
  for (const file of item.files ?? []) {
    if (file.target && !file.target.startsWith("@") && !file.target.startsWith("~")) {
      throw new Error(`플레이스홀더가 아닌 target: ${item.name} → ${file.target}`)
    }
  }
}

await fs.writeFile(path.join(ROOT, "registry.json"), `${JSON.stringify(registry, null, 2)}\n`, "utf8")

const fileCount = new Set(componentItems.flatMap((item) => item.files?.map((f) => f.path) ?? [])).size
console.log(
  `✅ registry.json — ${registry.items.length} items (컴포넌트 ${componentItems.length}, 소스 파일 ${fileCount})`
)

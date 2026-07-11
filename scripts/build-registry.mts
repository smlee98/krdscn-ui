// build-registry.mts — shadcn 레지스트리 파이프라인 (Z:\portfolio 구조 참고).
//
// components/ui/krds/(그룹)/*.tsx 42개를 엔트리로 import 그래프를 재귀 탐색해
// 각 컴포넌트의 파일 목록(내부 소스)과 npm 의존성을 자동 산출하고,
// 루트 registry.json 을 생성한다. 이후 `shadcn build` 가 public/r/*.json 을 만든다.
//
// 항목 구성:
//  - <component> × 42     — 컴포넌트 소스 + 전이 의존 파일(dynamic/*, base ui, lib)
//  - krds-theme           — app/krds.css (KRDS 토큰; 모든 컴포넌트의 registryDependencies)
//  - krds-utils           — lib/cn.ts
//  - use-mobile           — lib/hooks/use-mobile.ts
//  - krds-all             — 전체 묶음(registryDependencies 로 42개 전부 참조)
//
// 실행: yarn registry:build  (= tsx scripts/build-registry.mts && shadcn build)

import { promises as fs } from "node:fs"
import path from "node:path"

// CJS/ESM interop 때문에 named import 대신 동적 import (실패 시 설명 없이 진행)
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
const KRDS_DIR = path.join(ROOT, "components/ui/krds")

// 프레임워크/런타임 제공 — 레지스트리 dependencies 에서 제외
const EXCLUDED_PACKAGES = new Set(["react", "react-dom", "next"])

type RegistryFile = { path: string; type: string; target: string }
type RegistryItem = {
  name: string
  type: string
  title?: string
  description?: string
  dependencies?: string[]
  registryDependencies?: string[]
  files?: RegistryFile[]
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

/** 엔트리 파일에서 시작해 내부 소스 파일과 npm 의존성을 전이적으로 수집 */
async function walkImportGraph(entryFile: string) {
  const files = new Set<string>()
  const packages = new Set<string>()
  const queue = [entryFile]

  while (queue.length > 0) {
    const file = queue.shift()!
    const relative = toPosix(path.relative(ROOT, file))
    if (files.has(relative)) continue
    files.add(relative)

    const source = await fs.readFile(file, "utf8")
    for (const spec of extractImportSpecs(source)) {
      if (spec.startsWith("@/") || spec.startsWith(".")) {
        queue.push(await resolveSourceFile(spec, file))
        continue
      }
      const root = packageRoot(spec)
      if (!EXCLUDED_PACKAGES.has(root)) packages.add(root)
    }
  }

  return { files: [...files], packages: [...packages].sort() }
}

/** 저장소 경로 → registry 파일 타입 */
function fileType(relative: string) {
  if (relative.startsWith("components/ui/")) return "registry:ui"
  if (relative.startsWith("components/")) return "registry:component"
  if (relative.startsWith("lib/hooks/")) return "registry:hook"
  if (relative.startsWith("lib/")) return "registry:lib"
  return "registry:file"
}

function toRegistryFile(relative: string): RegistryFile {
  // 설치 위치를 저장소 구조 그대로 유지해야 파일 간 "@/..." import 가 깨지지 않는다.
  return { path: relative, type: fileType(relative), target: relative }
}

/** package.json 의 버전 범위를 붙여 의존성 표기 ("radix-ui@^1.4.3") */
function toDependency(name: string) {
  const range = DEP_VERSIONS[name]
  return range && /^[\^~]?\d/.test(range) ? `${name}@${range}` : name
}

function themeRef() {
  return `${REGISTRY_URL}/krds-theme.json`
}

// ── 컴포넌트 항목 42개 ────────────────────────────────────────────────────────
const groups = await fs.readdir(KRDS_DIR, { withFileTypes: true })
const entryFiles: string[] = []
for (const group of groups) {
  if (!group.isDirectory()) continue
  for (const file of await fs.readdir(path.join(KRDS_DIR, group.name))) {
    if (file.endsWith(".tsx")) entryFiles.push(path.join(KRDS_DIR, group.name, file))
  }
}
entryFiles.sort()

const componentItems: RegistryItem[] = []
for (const entryFile of entryFiles) {
  const name = path.basename(entryFile, ".tsx")
  const { files, packages } = await walkImportGraph(entryFile)
  const copy = (COMPONENT_COPY as Record<string, { intro: string }>)[name]

  componentItems.push({
    name,
    type: "registry:ui",
    title: name,
    description: copy?.intro,
    dependencies: packages.map(toDependency),
    registryDependencies: [themeRef()],
    files: files.map(toRegistryFile),
  })
}

const duplicated = componentItems.map((item) => item.name).filter((name, i, all) => all.indexOf(name) !== i)
if (duplicated.length > 0) throw new Error(`컴포넌트 이름 충돌: ${duplicated.join(", ")}`)

// ── 인프라 항목 ───────────────────────────────────────────────────────────────
const themeItem: RegistryItem = {
  name: "krds-theme",
  type: "registry:item",
  title: "KRDS theme tokens",
  description: "KRDS 디자인 토큰(색상·타이포그래피·포커스 링)을 담은 Tailwind CSS v4 스타일시트.",
  files: [{ path: "app/krds.css", type: "registry:file", target: "app/krds.css" }],
}

const utilsItem: RegistryItem = {
  name: "krds-utils",
  type: "registry:lib",
  title: "krds-utils",
  description: "컴포넌트에서 사용하는 cn(clsx + tailwind-merge) 유틸리티.",
  dependencies: ["clsx", "tailwind-merge"].map(toDependency),
  files: [{ path: "lib/cn.ts", type: "registry:lib", target: "lib/cn.ts" }],
}

const useMobileItem: RegistryItem = {
  name: "use-mobile",
  type: "registry:hook",
  title: "use-mobile",
  description: "반응형 컴포넌트를 위한 모바일 뷰포트 감지 훅.",
  files: [{ path: "lib/hooks/use-mobile.ts", type: "registry:hook", target: "lib/hooks/use-mobile.ts" }],
}

const allItem: RegistryItem = {
  name: "krds-all",
  type: "registry:item",
  title: "krds-all",
  description: "KRDS 전체 UI 컴포넌트 묶음.",
  registryDependencies: [themeRef(), ...componentItems.map((item) => `${REGISTRY_URL}/${item.name}.json`)],
}

// ── registry.json 출력 ────────────────────────────────────────────────────────
const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: REGISTRY_NAME,
  homepage: HOMEPAGE,
  items: [themeItem, utilsItem, useMobileItem, ...componentItems, allItem],
}

await fs.writeFile(path.join(ROOT, "registry.json"), `${JSON.stringify(registry, null, 2)}\n`, "utf8")

const fileCount = new Set(componentItems.flatMap((item) => item.files?.map((f) => f.path) ?? [])).size
console.log(
  `✅ registry.json — ${registry.items.length} items (컴포넌트 ${componentItems.length}, 소스 파일 ${fileCount})`
)

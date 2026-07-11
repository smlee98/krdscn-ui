// Generates fumadocs component MDX from the project's own data sources:
//   - SIDEBAR_GROUPS      (taxonomy + Korean/English labels)
//   - EXAMPLES_CONFIG     (per-slug example component names)
//   - EXAMPLE_TITLES      (per-example display titles)
//   - COMPONENT_COPY      (per-slug Korean intro/usage prose)
//
// Output: content/docs/components/<slug>.mdx, index.mdx, meta.json
// Each example renders via <ComponentPreview slug name /> which resolves
// against EXAMPLE_REGISTRY (loadExample) and getExampleSource.
//
// Run: yarn tsx scripts/generate-docs-mdx.ts

import * as fs from "node:fs"
import * as path from "node:path"

import { EXAMPLES_CONFIG } from "@/components/examples/examples-config"
import { COMPONENT_COPY } from "@/lib/component-copy"
import { EXAMPLE_TITLES } from "@/lib/example-titles"
import { SIDEBAR_GROUPS } from "@/lib/sidebar-nav"

const ROOT = process.cwd()
const OUT_DIR = path.join(ROOT, "content", "docs", "components")

// 프리뷰 폭은 shadcn 방식을 따른다: ComponentPreview는 폭 플래그를 두지 않고,
// 각 예제(demo) 루트가 직접 width(w-full / max-w-*)를 선언한다.

// props 문서(data/props-data.json)에 존재하는 키 집합. 키는 Krds<PascalCase(파일명)> 형식.
const PROPS_KEYS: Set<string> = (() => {
  try {
    const raw = fs.readFileSync(path.join(ROOT, "data", "props-data.json"), "utf8")
    return new Set(Object.keys(JSON.parse(raw) as Record<string, unknown>))
  } catch {
    return new Set<string>()
  }
})()

function toPascalCase(slug: string): string {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("")
}

type Copy = { intro: string; usage: string }

function esc(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')
}

function exampleTitle(slug: string, name: string): string {
  const titles = (EXAMPLE_TITLES as Record<string, Record<string, string>>)[slug]
  return (titles && titles[name]) || name
}

function buildPage(slug: string, labelKo: string, labelEn: string): string {
  const copy = (COMPONENT_COPY as Record<string, Copy>)[slug]
  const names = (EXAMPLES_CONFIG as Record<string, readonly string[]>)[slug] ?? []

  const intro = copy?.intro ?? ""
  const usage = copy?.usage ?? ""
  const description = intro || labelEn

  const lines: string[] = []
  lines.push("---")
  lines.push(`title: ${labelKo}`)
  lines.push(`description: "${esc(description)}"`)
  lines.push("---")
  lines.push("")
  if (intro) {
    lines.push(intro)
    lines.push("")
  }
  if (usage) {
    lines.push("## 사용 지침")
    lines.push("")
    lines.push(usage)
    lines.push("")
  }
  if (names.length > 0) {
    lines.push("## 예제")
    lines.push("")
    for (const name of names) {
      lines.push(`### ${exampleTitle(slug, name)}`)
      lines.push("")
      lines.push(`<ComponentPreview slug="${slug}" name="${name}" />`)
      lines.push("")
    }
  }

  const propsKey = `Krds${toPascalCase(slug)}`
  if (PROPS_KEYS.has(propsKey)) {
    lines.push("## 속성")
    lines.push("")
    lines.push(`<PropsTable name="${propsKey}" />`)
    lines.push("")
  }
  return lines.join("\n")
}

function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true })

  const metaPages: string[] = ["index"]
  let pageCount = 0
  const skipped: string[] = []

  for (const group of SIDEBAR_GROUPS) {
    metaPages.push(`---${group.title}---`)
    for (const item of group.items) {
      const hasData = item.id in EXAMPLES_CONFIG || item.id in COMPONENT_COPY
      if (!hasData) {
        skipped.push(item.id)
        continue
      }
      const mdx = buildPage(item.id, item.labelKo, item.labelEn)
      fs.writeFileSync(path.join(OUT_DIR, `${item.id}.mdx`), mdx + "\n", "utf8")
      metaPages.push(item.id)
      pageCount++
    }
  }

  // index overview
  const indexMdx = [
    "---",
    "title: 컴포넌트",
    'description: "KRDS 디자인 가이드라인을 따르는 컴포넌트 모음입니다."',
    "---",
    "",
    "KRDS 디자인 가이드라인을 따르는 컴포넌트 소스를 분류별로 제공합니다.",
    "",
    "<ComponentsList />",
    "",
  ].join("\n")
  fs.writeFileSync(path.join(OUT_DIR, "index.mdx"), indexMdx, "utf8")

  // meta.json
  const meta = { title: "컴포넌트", pages: metaPages }
  fs.writeFileSync(path.join(OUT_DIR, "meta.json"), JSON.stringify(meta, null, 2) + "\n", "utf8")

  console.log(`Generated ${pageCount} component MDX pages.`)
  if (skipped.length) console.log(`Skipped (no data): ${skipped.join(", ")}`)
}

main()

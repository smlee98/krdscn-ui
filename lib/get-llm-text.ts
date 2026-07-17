import { readFile } from "node:fs/promises"
import { join } from "node:path"

import type { InferPageType } from "fumadocs-core/source"

import type { source } from "@/lib/source"

function stripFrontmatter(raw: string): string {
  if (!raw.startsWith("---")) return raw

  const end = raw.indexOf("\n---", 3)
  if (end === -1) return raw

  const afterDelimiter = raw.indexOf("\n", end + 4)
  if (afterDelimiter === -1) return ""

  return raw.slice(afterDelimiter + 1).replace(/^\n+/, "")
}

export async function getLLMText(page: InferPageType<typeof source>) {
  const filePath = join(process.cwd(), "content/docs", page.path)
  const raw = await readFile(filePath, "utf-8")
  const content = stripFrontmatter(raw)

  return `# ${page.data.title}

${page.data.description ?? ""}

${content}`
}

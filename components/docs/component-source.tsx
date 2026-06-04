import { CodeBlock } from "@/components/docs/code-block"
import { getExampleSource } from "@/lib/get-example-source"

export async function ComponentSource({
  slug,
  name,
  title,
  maxLines,
  language = "tsx",
}: {
  slug?: string
  name?: string
  src?: string
  title?: string
  language?: string
  styleName?: string
  collapsible?: boolean
  className?: string
  maxLines?: number
}) {
  if (!slug || !name) {
    return null
  }

  let code: string
  try {
    code = getExampleSource(slug, name)
  } catch {
    return (
      <div className="my-6 rounded-xl border bg-muted/30 p-4 text-sm text-muted-foreground">
        소스 <code>{slug}/{name}</code>를 찾을 수 없습니다.
      </div>
    )
  }

  if (maxLines) {
    code = code.split("\n").slice(0, maxLines).join("\n")
  }

  return <CodeBlock title={title ?? `${name}.${language === "ts" ? "ts" : "tsx"}`} code={code} language={language} />
}

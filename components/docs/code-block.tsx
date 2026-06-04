import { highlight } from "fumadocs-core/highlight"

import { CopyButton } from "@/components/docs/copy-button"
import { cn } from "@/lib/cn"

export async function CodeBlock({
  code,
  title,
  className,
  maxHeight = true,
  language = "tsx",
}: {
  code: string
  title?: string
  className?: string
  maxHeight?: boolean
  language?: string
}) {
  const value = code.trimEnd()
  const highlighted = await highlight(value, {
    lang: language,
    fallbackLanguage: "tsx",
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
  })

  return (
    <figure
      data-rehype-pretty-code-figure=""
      className={cn("relative overflow-hidden rounded-xl border bg-code text-sm text-code-foreground shadow-none", className)}
    >
      {title ? (
        <figcaption
          data-rehype-pretty-code-title=""
          className="flex items-center gap-2 border-b border-border/30 px-4 py-2.5 font-mono text-sm text-code-foreground"
        >
          {title}
        </figcaption>
      ) : null}
      <CopyButton value={value} className="bg-code" />
      <div className={cn("no-scrollbar overflow-auto px-4 py-3.5", maxHeight && "max-h-96")}>
        {highlighted}
      </div>
    </figure>
  )
}

import type { TOCItemType } from "fumadocs-core/toc"

import { cn } from "@/lib/cn"

type TocItem = TOCItemType & {
  url?: string
  href?: string
  depth?: number
  title?: React.ReactNode
  name?: React.ReactNode
}

function getHref(item: TocItem) {
  return item.url ?? item.href ?? "#"
}

function getTitle(item: TocItem) {
  return item.title ?? item.name ?? ""
}

export function DocsTableOfContents({ toc }: { toc?: TOCItemType[] }) {
  if (!toc?.length) {
    return null
  }

  return (
    <div className="grid gap-2 text-sm">
      <p className="font-medium text-foreground">이 페이지에서</p>
      <div className="grid gap-1">
        {toc.map((rawItem) => {
          const item = rawItem as TocItem
          return (
            <a
              key={`${getHref(item)}-${String(getTitle(item))}`}
              href={getHref(item)}
              className={cn(
                "line-clamp-1 text-xs text-muted-foreground transition-colors hover:text-foreground",
                (item.depth ?? 2) > 2 && "pl-3"
              )}
            >
              {getTitle(item)}
            </a>
          )
        })}
      </div>
    </div>
  )
}

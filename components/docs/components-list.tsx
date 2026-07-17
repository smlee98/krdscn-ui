import Link from "next/link"

import { getPagesFromFolder, type PageTreeFolder } from "@/lib/page-tree"
import { getComponentTaxonomy } from "@/lib/docs-component-taxonomy"
import { cn } from "@/lib/utils"

function TaxonomyMarker({ slug }: { slug?: string | null }) {
  const taxonomy = getComponentTaxonomy(slug)

  if (!taxonomy) {
    return null
  }

  const isExtended = taxonomy.kind === "extended"
  const isDocsOnly = taxonomy.kind === "docs-only"

  return (
    <span
      className={cn(
        "inline-flex h-5 items-center rounded-full border px-1.5 text-[10px] leading-none font-medium no-underline",
        isExtended && "border-primary/30 bg-primary/10 text-primary",
        isDocsOnly && "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300",
        !isExtended && !isDocsOnly && "border-border bg-muted text-muted-foreground"
      )}
      title={taxonomy.description}
      aria-label={taxonomy.label}
    >
      {isExtended ? "KRDS" : isDocsOnly ? "Docs" : "Native"}
    </span>
  )
}

export function ComponentsList({ componentsFolder }: { componentsFolder: PageTreeFolder; currentBase?: string }) {
  const list = getPagesFromFolder(componentsFolder)

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-x-8 lg:gap-x-16 lg:gap-y-6 xl:gap-x-20">
      {list.map((component) => (
        <Link
          key={component.$id ?? component.url}
          href={component.url}
          className="inline-flex items-center gap-2 text-lg font-medium underline-offset-4 hover:underline md:text-base"
        >
          {component.name}
          <TaxonomyMarker slug={component.$id} />
        </Link>
      ))}
    </div>
  )
}

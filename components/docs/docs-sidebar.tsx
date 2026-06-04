"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { getAllPagesFromFolder, getPagesFromFolder, normalizePath } from "@/lib/page-tree"
import type { PageTreeFolder, PageTreeNode, PageTreePage } from "@/lib/page-tree"
import type { source } from "@/lib/source"
import { getComponentTaxonomy } from "@/lib/docs-component-taxonomy"
import { cn } from "@/lib/cn"

const sections = [
  { title: "소개", href: "/docs" },
  { title: "설치", href: "/docs/installation" },
  { title: "테마", href: "/docs/theming" },
]

function itemClass(active: boolean) {
  return cn(
    "flex h-8 w-fit items-center rounded-md px-2 text-sm text-foreground transition-colors hover:bg-muted/60",
    active && "bg-muted font-medium"
  )
}

function isPage(node: PageTreeNode): node is PageTreePage {
  return node.type === "page"
}

function isFolder(node: PageTreeNode): node is PageTreeFolder {
  return node.type === "folder"
}

function getFolderHref(folder: PageTreeFolder) {
  const pages = getAllPagesFromFolder(folder)
  return pages.find((page) => page.$id === "index")?.url ?? pages[0]?.url ?? "/docs"
}

function isFolderActive(folder: PageTreeFolder, pathname: string) {
  return getAllPagesFromFolder(folder).some((page) => {
    const url = normalizePath(page.url)
    return pathname === url || pathname.startsWith(`${url}/`)
  })
}

function ComponentSidebarMarker({ slug }: { slug?: string | null }) {
  const taxonomy = getComponentTaxonomy(slug)

  if (!taxonomy || taxonomy.kind === "native") {
    return null
  }

  return (
    <span
      className={cn(
        "ml-auto rounded-full border px-1.5 text-[10px] font-medium leading-4",
        taxonomy.kind === "extended" && "border-primary/30 bg-primary/10 text-primary",
        taxonomy.kind === "docs-only" && "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300"
      )}
      title={taxonomy.description}
      aria-label={taxonomy.label}
    >
      {taxonomy.kind === "extended" ? "KRDS" : "Docs"}
    </span>
  )
}

function TreeLinks({
  nodes,
  pathname,
  depth = 0,
  expandAll = false,
}: {
  nodes: PageTreeNode[]
  pathname: string
  depth?: number
  expandAll?: boolean
}) {
  return (
    <div className="grid gap-1">
      {nodes.map((node) => {
        if (isPage(node)) {
          const active = pathname === normalizePath(node.url)

          return (
            <Link
              key={node.url}
              href={node.url}
              className={cn(itemClass(active), depth > 0 && "text-muted-foreground")}
              style={{ paddingLeft: `${0.5 + depth * 0.75}rem` }}
            >
              {node.name}
            </Link>
          )
        }

        if (isFolder(node)) {
          const href = getFolderHref(node)
          const active = isFolderActive(node, pathname)

          return (
            <div key={String(node.$id ?? href)} className="grid gap-1">
              <Link
                href={href}
                className={cn(itemClass(active), depth > 0 && "text-muted-foreground")}
                style={{ paddingLeft: `${0.5 + depth * 0.75}rem` }}
              >
                {node.name}
              </Link>
              {active || expandAll ? (
                <TreeLinks
                  nodes={node.children as PageTreeNode[]}
                  pathname={pathname}
                  depth={depth + 1}
                  expandAll={expandAll}
                />
              ) : null}
            </div>
          )
        }

        return null
      })}
    </div>
  )
}

export function DocsSidebar({ tree }: { tree: typeof source.pageTree }) {
  const pathname = normalizePath(usePathname())
  const componentsFolder = tree.children.find((item) => item.$id === "components" && item.type === "folder")
  const componentPages = componentsFolder?.type === "folder" ? getPagesFromFolder(componentsFolder) : []
  const blocksFolder = tree.children.find((item) => item.$id === "blocks" && item.type === "folder")
  const blockPages = blocksFolder?.type === "folder" ? getPagesFromFolder(blocksFolder) : []
  const krdsFolder = tree.children.find((item) => item.$id === "krds-guideline" && item.type === "folder")
  const showKrdsTree = pathname === "/docs/krds-guideline" || pathname.startsWith("/docs/krds-guideline/")
  const showBlocksTree = pathname === "/docs/blocks" || pathname.startsWith("/docs/blocks/")

  return (
    <aside className="sticky top-[calc(var(--header-height)+0.6rem)] z-30 hidden h-[calc(100svh-5rem)] w-72 shrink-0 overscroll-none bg-transparent lg:block">
      <div className="absolute top-0 z-10 h-8 w-56 bg-linear-to-b from-background via-background/80 to-background/50" />
      <div className="absolute top-8 right-2 bottom-0 hidden w-px bg-linear-to-b from-transparent via-border to-transparent lg:flex" />
      <div className="no-scrollbar h-full w-56 overflow-y-auto px-2 pb-28 pt-8">
        {showKrdsTree && krdsFolder?.type === "folder" ? (
          <div>
            <h4 className="mb-2 px-2 text-xs font-medium text-muted-foreground">KRDS 가이드라인</h4>
            <TreeLinks nodes={krdsFolder.children as PageTreeNode[]} pathname={pathname} expandAll />
          </div>
        ) : showBlocksTree && blocksFolder?.type === "folder" ? (
          <div>
            <h4 className="mb-2 px-2 text-xs font-medium text-muted-foreground">블록</h4>
            <div className="grid gap-1">
              {blockPages.map((page) => {
                const active = pathname === normalizePath(page.url)
                return (
                  <Link key={page.url} href={page.url} className={cn(itemClass(active), "w-full")}>
                    <span className="truncate">{page.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h4 className="mb-2 px-2 text-xs font-medium text-muted-foreground">섹션</h4>
              <div className="grid gap-1">
                {sections.map((item) => {
                  const href = normalizePath(item.href)
                  const active = href === "/docs" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`)
                  return (
                    <Link key={item.href} href={item.href} className={itemClass(active)}>
                      {item.title}
                    </Link>
                  )
                })}
              </div>
            </div>
            <div>
              <h4 className="mb-2 px-2 text-xs font-medium text-muted-foreground">컴포넌트</h4>
              <div className="grid gap-1">
                {componentPages.map((page) => {
                  const active = pathname === normalizePath(page.url)
                  return (
                    <Link key={page.url} href={page.url} className={cn(itemClass(active), "w-full")}>
                      <span className="truncate">{page.name}</span>
                      <ComponentSidebarMarker slug={page.$id} />
                    </Link>
                  )
                })}
              </div>
            </div>
          </>
        )}
      </div>
      <div className="pointer-events-none absolute bottom-0 h-10 w-56 bg-linear-to-t from-background to-transparent" />
    </aside>
  )
}

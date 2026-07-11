import { notFound } from "next/navigation"
import { findNeighbour } from "fumadocs-core/page-tree"
import { CopyIcon } from "lucide-react"

import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { DocsTableOfContents } from "@/components/docs/docs-toc"
import { Button } from "@/components/ui/button"
import { getMDXComponents } from "@/mdx-components"
import { source } from "@/lib/source"

export const dynamic = "force-static"
export const dynamicParams = false

export function generateStaticParams() {
  const params = source.generateParams()
  return params.some((param) => param.slug?.length === 0) ? params : [{ slug: [] }, ...params]
}

export async function generateMetadata(props: { params: Promise<{ slug?: string[] }> }) {
  const params = await props.params
  const page = source.getPage(params.slug)

  if (!page) {
    notFound()
  }

  return {
    title: page.data.title,
    description: page.data.description,
  }
}

export default async function Page(props: { params: Promise<{ slug?: string[] }> }) {
  const params = await props.params
  const page = source.getPage(params.slug)

  if (!page) {
    notFound()
  }

  const MDX = page.data.body
  const neighbours = findNeighbour(source.pageTree, page.url)

  return (
    <div data-slot="docs" className="flex scroll-mt-24 items-stretch pb-8 text-[1.05rem] sm:text-[15px] xl:w-full">
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="h-4 shrink-0" />
        <article className="mx-auto flex w-full max-w-160 min-w-0 flex-1 flex-col gap-6 px-4 py-6 text-neutral-800 md:px-0 lg:py-8 dark:text-neutral-300">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between md:items-start">
              <h1 className="scroll-m-24 text-3xl font-semibold tracking-tight sm:text-3xl">{page.data.title}</h1>
              <div className="docs-nav flex items-center gap-2">
                <Button variant="ghost" size="icon" className="hidden size-8 shadow-none sm:inline-flex md:size-7">
                  <CopyIcon className="size-3.5" />
                  <span className="sr-only">페이지 복사</span>
                </Button>
              </div>
            </div>
            {page.data.description ? (
              <p className="text-muted-foreground text-[1.05rem] sm:max-w-[80%] sm:text-base sm:text-balance">
                {page.data.description}
              </p>
            ) : null}
          </div>
          <div className="docs-content w-full flex-1 pb-16 sm:pb-0">
            <MDX components={getMDXComponents()} />
          </div>
          <DocsPageNav previous={neighbours.previous} next={neighbours.next} />
        </article>
      </div>
      <aside className="sticky top-[calc(var(--header-height)+1px)] z-30 ml-auto hidden h-[90svh] w-72 flex-col gap-4 overflow-hidden overscroll-none pb-8 xl:flex">
        <div className="h-4 shrink-0" />
        <div className="no-scrollbar flex flex-col gap-8 overflow-y-auto px-8 pt-8">
          <DocsTableOfContents toc={page.data.toc} />
        </div>
      </aside>
    </div>
  )
}

import { findNeighbour } from "fumadocs-core/page-tree"
import { notFound } from "next/navigation"

import { LLMCopyButtonWithViewOptions } from "@/components/docs/doc-page-actions"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { DocsTableOfContents } from "@/components/docs/docs-toc"
import { source } from "@/lib/source"
import { getMDXComponents } from "@/mdx-components"

export const dynamic = "force-static"
export const dynamicParams = false

function normalizeBasePath(value?: string) {
  if (!value) return ""
  const withLeadingSlash = value.startsWith("/") ? value : `/${value}`
  return withLeadingSlash.replace(/\/$/, "")
}

const basePath = normalizeBasePath(process.env.GITHUB_PAGES_BASE_PATH)

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
        <article className="mx-auto flex w-full max-w-4xl min-w-0 flex-1 flex-col gap-6 px-4 py-6 text-neutral-800 md:px-0 lg:py-8 dark:text-neutral-300">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between md:items-start">
              <h1 className="scroll-m-24 text-3xl font-semibold tracking-tight sm:text-3xl">{page.data.title}</h1>
              <div className="docs-nav hidden items-center gap-2 sm:flex">
                <LLMCopyButtonWithViewOptions
                  markdownUrl={`${basePath}/llms.mdx/${page.slugs.length ? page.slugs.join("/") : "index"}.md`}
                  isComponent={page.slugs?.[0] === "components"}
                />
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

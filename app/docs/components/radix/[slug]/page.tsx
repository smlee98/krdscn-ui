import Link from "next/link"
import { notFound } from "next/navigation"

import { Button } from "@/components/ui/button"
import { getPagesFromFolder } from "@/lib/page-tree"
import { source } from "@/lib/source"

export const dynamic = "force-static"
export const dynamicParams = false

function getComponentSlugs() {
  const componentsFolder = source.pageTree.children.find((item) => item.$id === "components" && item.type === "folder")

  if (!componentsFolder || componentsFolder.type !== "folder") {
    return []
  }

  return getPagesFromFolder(componentsFolder).map((page) => page.url.split("/").filter(Boolean).at(-1)).filter(Boolean) as string[]
}

export function generateStaticParams() {
  return getComponentSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params

  return {
    title: "Docs가 이동되었습니다",
    alternates: {
      canonical: `/docs/components/${slug}`,
    },
  }
}

export default async function LegacyComponentPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const slugs = getComponentSlugs()

  if (!slugs.includes(slug)) {
    notFound()
  }

  const relativeTarget = `../../${slug}/`
  const target = `/docs/components/${slug}`

  return (
    <div className="mx-auto flex min-h-[50svh] w-full max-w-[40rem] flex-col items-start justify-center gap-4 px-4 py-10">
      <meta httpEquiv="refresh" content={`0;url=${relativeTarget}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.location.replace(${JSON.stringify(relativeTarget)})`,
        }}
      />
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Docs가 이동되었습니다</h1>
        <p className="mt-2 text-muted-foreground">이전 컴포넌트 경로는 새 경로로 자동 이동됩니다.</p>
      </div>
      <Button asChild>
        <Link href={target}>새 Docs로 이동</Link>
      </Button>
    </div>
  )
}

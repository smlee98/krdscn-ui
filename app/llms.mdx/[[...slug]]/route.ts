import { notFound } from "next/navigation"

import { getLLMText } from "@/lib/get-llm-text"
import { source } from "@/lib/source"

export const revalidate = false
export const dynamic = "force-static"
export const dynamicParams = false

// 정적 export 는 라우트 핸들러를 요청 경로 그대로의 "평면 파일"로 내보낸다.
// 상위 인덱스(/llms.mdx/components)가 파일로, 그 하위(/llms.mdx/components/button)가
// 같은 이름의 디렉터리로 내보내지면 파일/디렉터리 충돌(EPERM)이 나므로,
// 모든 경로의 마지막 세그먼트에 `.md` 확장자를 붙여 충돌을 원천 차단한다.
// (components.md 파일 ↔ components/ 디렉터리는 공존 가능)
export function generateStaticParams() {
  const params = source.generateParams()
  const withRoot = params.some((param) => param.slug?.length === 0) ? params : [{ slug: [] }, ...params]
  return withRoot.map(({ slug }) => {
    const segments = slug ?? []
    if (segments.length === 0) return { slug: ["index.md"] }
    return { slug: [...segments.slice(0, -1), `${segments[segments.length - 1]}.md`] }
  })
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params
  const segments = slug ?? []
  const last = segments[segments.length - 1]
  if (!last?.endsWith(".md")) {
    notFound()
  }
  const trimmed = last.slice(0, -".md".length)
  const pageSlug = trimmed === "index" && segments.length === 1 ? [] : [...segments.slice(0, -1), trimmed]
  const page = source.getPage(pageSlug)

  if (!page) {
    notFound()
  }

  return new Response(await getLLMText(page), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  })
}

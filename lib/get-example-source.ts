// rsc:server-only
import "server-only"
import fs from "node:fs"
import path from "node:path"

export { getExampleSource }

function getExampleSource(slug: string, exampleName: string): string {
  const filePath = path.join(process.cwd(), "components", "examples", slug, `${exampleName}.tsx`)
  try {
    const source = fs.readFileSync(filePath, "utf8")
    // 저장소 내부 경로 → 소비자 설치 후 경로로 변환해 표시 (shadcn 문서 사이트와 동일).
    // shadcn CLI가 설치 시 @/registry/krds/ui/* import를 소비자 ui alias로 재작성한다.
    return source.replaceAll("@/registry/krds/ui/", "@/components/ui/")
  } catch {
    throw new Error(`Example source not found: ${slug}/${exampleName}.tsx (looked at ${filePath})`)
  }
}

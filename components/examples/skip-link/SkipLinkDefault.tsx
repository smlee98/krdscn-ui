import { SkipLink } from "@/registry/krds/ui/skip-link"

export default function SkipLinkDefault() {
  return (
    <div className="border-krds-gray-20 bg-krds-gray-5 relative flex flex-col gap-3 rounded-md border p-6">
      <p className="text-krds-gray-70 text-sm">
        평소에는 화면에 보이지 않다가, Tab 키로 포커스하면 화면 최상단에 나타나 본문으로 즉시 이동할 수 있습니다. 이
        영역을 클릭한 뒤 Tab 키를 눌러 확인해 보세요.
      </p>
      <SkipLink href="#main-content">본문 바로가기</SkipLink>
      <main id="main-content" tabIndex={-1} className="rounded bg-white p-4 text-sm">
        주요 콘텐츠 영역 (main).
      </main>
    </div>
  )
}

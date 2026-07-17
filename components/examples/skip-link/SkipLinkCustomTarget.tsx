import { SkipLink } from "@/registry/krds/ui/skip-link"

export default function SkipLinkCustomTarget() {
  return (
    <div className="border-krds-gray-20 bg-krds-gray-5 relative flex flex-col gap-3 rounded-md border p-6">
      <p className="text-krds-gray-70 text-sm">
        사용자 정의 타겟 ID를 지정하여 특정 섹션으로 즉시 이동하는 스킵 링크입니다. Tab 키로 포커스했을 때만 화면
        최상단에 나타납니다.
      </p>
      <SkipLink href="#main-navigation">메뉴 바로가기</SkipLink>
      <section id="main-navigation" tabIndex={-1} className="rounded bg-white p-4 text-sm">
        사용자 정의 타겟 콘텐츠 섹션입니다.
      </section>
    </div>
  )
}

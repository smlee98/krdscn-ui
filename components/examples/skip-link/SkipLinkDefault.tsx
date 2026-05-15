import { SkipLink } from "@/components/ui/krds/skip-link";

export default function SkipLinkDefault() {
  return (
    <div className="border-krds-gray-20 bg-krds-gray-5 relative flex flex-col gap-3 rounded-md border p-6">
      <p className="text-krds-gray-70 text-sm">Tab 키를 누르면 좌상단에 “본문 바로가기” 링크가 나타납니다.</p>
      <SkipLink href="#main-content">본문 바로가기</SkipLink>
      <main id="main-content" tabIndex={-1} className="rounded bg-white p-4 text-sm">
        주요 콘텐츠 영역 (main).
      </main>
    </div>
  );
}

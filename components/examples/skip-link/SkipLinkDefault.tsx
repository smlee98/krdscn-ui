import { SkipLink } from "@/components/ui/krds/(navigation)/skip-link";

export default function SkipLinkDefault() {
  return (
    <div className="border-krds-gray-20 bg-krds-gray-5 relative flex flex-col gap-3 rounded-md border p-6">
      <p className="text-krds-gray-70 text-sm">
        페이지 최상단에 항상 노출되어 본문으로 즉시 이동할 수 있도록 돕습니다.
      </p>
      <SkipLink href="#main-content">본문 바로가기</SkipLink>
      <main id="main-content" tabIndex={-1} className="rounded bg-white p-4 text-sm">
        주요 콘텐츠 영역 (main).
      </main>
    </div>
  );
}

import { SkipLink } from "@/components/ui/krds/skip-link";

export default function SkipLinkMultiple() {
  return (
    <div className="border-krds-gray-20 bg-krds-gray-5 relative flex flex-col gap-3 rounded-md border p-6">
      <p className="text-krds-gray-70 text-sm">다수의 스킵 링크를 등록할 수 있습니다. Tab 키로 순차 확인해 보세요.</p>
      <SkipLink href="#nav">주 메뉴 바로가기</SkipLink>
      <SkipLink href="#main">본문 바로가기</SkipLink>
      <SkipLink href="#footer">하단 정보 바로가기</SkipLink>
      <nav id="nav" tabIndex={-1} className="rounded bg-white p-3 text-sm">
        주 메뉴
      </nav>
      <main id="main" tabIndex={-1} className="rounded bg-white p-3 text-sm">
        본문
      </main>
      <footer id="footer" tabIndex={-1} className="rounded bg-white p-3 text-sm">
        하단
      </footer>
    </div>
  );
}

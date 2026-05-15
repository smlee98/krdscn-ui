import { Disclosure, DisclosureTrigger, DisclosureContent } from "@/components/ui/krds";

export default function DisclosureMultiple() {
  return (
    <div className="flex flex-col gap-3">
      <Disclosure defaultOpen>
        <DisclosureTrigger>신청 방법</DisclosureTrigger>
        <DisclosureContent>
          <p className="text-krds-gray-70 text-sm">
            온라인 신청: 정부24 홈페이지 접속 후 서비스 검색 → 신청서 작성 → 제출
          </p>
        </DisclosureContent>
      </Disclosure>
      <Disclosure>
        <DisclosureTrigger>제출 서류</DisclosureTrigger>
        <DisclosureContent>
          <ul className="text-krds-gray-70 list-disc space-y-1 pl-4 text-sm">
            <li>신분증 사본</li>
            <li>소득 증빙 서류 (최근 3개월)</li>
            <li>주민등록등본</li>
          </ul>
        </DisclosureContent>
      </Disclosure>
      <Disclosure>
        <DisclosureTrigger>처리 기간</DisclosureTrigger>
        <DisclosureContent>
          <p className="text-krds-gray-70 text-sm">
            접수 후 영업일 기준 7일 이내 처리되며, 결과는 문자 및 이메일로 안내됩니다.
          </p>
        </DisclosureContent>
      </Disclosure>
    </div>
  );
}

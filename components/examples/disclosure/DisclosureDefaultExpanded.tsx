import { Disclosure, DisclosureTrigger, DisclosureContent } from "@/components/ui/dynamic/disclosure";

export default function DisclosureDefaultExpanded() {
  return (
    <Disclosure defaultOpen>
      <DisclosureTrigger>서비스 상세 정보</DisclosureTrigger>
      <DisclosureContent>
        <div>
          <h4>서비스 이용 안내</h4>
          <p>본 서비스는 정부24를 통해 제공되는 전자정부 서비스입니다.</p>
          <ul className="text-krds-gray-70 list-disc space-y-1 pl-4 text-sm">
            <li>이용 시간: 24시간 연중무휴</li>
            <li>문의 전화: 1588-2188</li>
            <li>홈페이지: www.gov.kr</li>
          </ul>
        </div>
      </DisclosureContent>
    </Disclosure>
  );
}

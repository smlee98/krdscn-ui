import { Disclosure, DisclosureTrigger, DisclosureContent } from "@/components/ui/krds";

export default function DisclosureDefault() {
  return (
    <Disclosure defaultOpen>
      <DisclosureTrigger>신청 자격 요건 안내</DisclosureTrigger>
      <DisclosureContent>
        <ul className="text-krds-gray-70 list-disc space-y-1 pl-4 text-sm">
          <li>대한민국 국적을 보유한 만 19세 이상 성인</li>
          <li>주민등록 상 주소지가 신청 지역에 해당하는 분</li>
          <li>소득 기준 중위소득 80% 이하 가구</li>
        </ul>
      </DisclosureContent>
    </Disclosure>
  );
}

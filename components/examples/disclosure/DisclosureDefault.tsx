import { Disclosure, DisclosureTrigger, DisclosureContent } from "@/registry/krds/ui/disclosure"

export default function DisclosureDefault() {
  return (
    <Disclosure className="w-full">
      <DisclosureTrigger>신청 서비스안내</DisclosureTrigger>
      <DisclosureContent>
        <ul className="text-krds-gray-70 list-disc space-y-1 pl-4 text-sm">
          <li>하나의 아이디로 안전하고 편리하게 여러 전자정부 서비스를 이용할 수 있는 서비스입니다.</li>
          <li>디지털원패스 이용문의 : 1533-3713 (평일9~18시, 공휴일제외)</li>
        </ul>
      </DisclosureContent>
    </Disclosure>
  )
}

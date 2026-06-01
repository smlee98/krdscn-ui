import {
  InPageNavigation,
  InPageNavigationEyebrow,
  InPageNavigationHeader,
  InPageNavigationItem,
  InPageNavigationList,
  InPageNavigationTitle
} from "@/components/ui/dynamic/in-page-navigation";

export default function InPageNavigationLongItems() {
  return (
    <InPageNavigation>
      <InPageNavigationHeader>
        <InPageNavigationEyebrow>이 페이지의 구성</InPageNavigationEyebrow>
        <InPageNavigationTitle>긴 텍스트 네비게이션</InPageNavigationTitle>
      </InPageNavigationHeader>
      <InPageNavigationList>
        <InPageNavigationItem href="#section_01" active>
          매우 긴 네비게이션 아이템 텍스트가 있는 경우
        </InPageNavigationItem>
        <InPageNavigationItem href="#section_02">두 번째 긴 텍스트 아이템</InPageNavigationItem>
        <InPageNavigationItem href="#section_03">세 번째 긴 텍스트 아이템</InPageNavigationItem>
        <InPageNavigationItem href="#section_04">네 번째 긴 텍스트 아이템</InPageNavigationItem>
      </InPageNavigationList>
    </InPageNavigation>
  );
}

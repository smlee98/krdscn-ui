import {
  InPageNavigation,
  InPageNavigationEyebrow,
  InPageNavigationHeader,
  InPageNavigationItem,
  InPageNavigationList,
  InPageNavigationTitle
} from "@/components/ui/krds/(navigation)/in-page-navigation";

export default function InPageNavigationWithoutAction() {
  return (
    <InPageNavigation>
      <InPageNavigationHeader>
        <InPageNavigationEyebrow>이 페이지의 구성</InPageNavigationEyebrow>
        <InPageNavigationTitle>서비스 안내</InPageNavigationTitle>
      </InPageNavigationHeader>
      <InPageNavigationList>
        <InPageNavigationItem href="#intro" active>
          서비스 개요
        </InPageNavigationItem>
        <InPageNavigationItem href="#guide">이용 방법</InPageNavigationItem>
        <InPageNavigationItem href="#terms">이용 약관</InPageNavigationItem>
        <InPageNavigationItem href="#privacy">개인정보 처리방침</InPageNavigationItem>
        <InPageNavigationItem href="#contact">문의하기</InPageNavigationItem>
      </InPageNavigationList>
    </InPageNavigation>
  );
}

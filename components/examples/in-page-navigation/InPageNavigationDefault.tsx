import {
  InPageNavigation,
  InPageNavigationEyebrow,
  InPageNavigationHeader,
  InPageNavigationItem,
  InPageNavigationList,
  InPageNavigationTitle
} from "@/components/ui/krds/(navigation)/in-page-navigation";

export default function InPageNavigationDefault() {
  return (
    <InPageNavigation>
      <InPageNavigationHeader>
        <InPageNavigationEyebrow>이 페이지의 구성</InPageNavigationEyebrow>
        <InPageNavigationTitle>장애아동수당</InPageNavigationTitle>
      </InPageNavigationHeader>
      <InPageNavigationList>
        <InPageNavigationItem href="#overview" active>
          제도 개요
        </InPageNavigationItem>
        <InPageNavigationItem href="#eligibility">신청 자격</InPageNavigationItem>
        <InPageNavigationItem href="#apply">신청 방법</InPageNavigationItem>
        <InPageNavigationItem href="#amount">지급 금액</InPageNavigationItem>
        <InPageNavigationItem href="#schedule">지급일 안내</InPageNavigationItem>
        <InPageNavigationItem href="#documents">증명서 발급</InPageNavigationItem>
        <InPageNavigationItem href="#faq">자주 묻는 질문</InPageNavigationItem>
      </InPageNavigationList>
    </InPageNavigation>
  );
}

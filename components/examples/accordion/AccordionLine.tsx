import { Accordion, AccordionItem, AccordionHeader, AccordionPanel } from "@/components/ui/krds";

export default function AccordionLine() {
  return (
    <Accordion variant="line" defaultValue={["line-1"]}>
      <AccordionItem value="line-1">
        <AccordionHeader>신청 자격 확인</AccordionHeader>
        <AccordionPanel>
          만 19세 이상 대한민국 국민이면 누구나 신청하실 수 있습니다. 단, 일부 서비스는 별도 자격 요건이 있을 수
          있습니다.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem value="line-2">
        <AccordionHeader>필요 서류 준비</AccordionHeader>
        <AccordionPanel>
          신분증 사본, 주민등록등본, 소득 증빙 서류가 기본적으로 필요합니다. 서비스별 추가 서류는 해당 민원 상세
          페이지를 참고해 주세요.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem value="line-3">
        <AccordionHeader>온라인 신청 방법</AccordionHeader>
        <AccordionPanel>정부24 접속 → 서비스 검색 → 신청서 작성 → 본인인증 → 제출 순서로 진행합니다.</AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

import { Accordion, AccordionItem, AccordionHeader, AccordionPanel } from "@/components/ui/krds";

export default function AccordionDefault() {
  return (
    <Accordion defaultValue={["item-1"]}>
      <AccordionItem value="item-1">
        <AccordionHeader>서비스 이용 요금이 있나요?</AccordionHeader>
        <AccordionPanel>
          정부24의 민원 서비스는 대부분 무료로 제공됩니다. 일부 수수료가 발생하는 서비스는 신청 전 안내 페이지에서
          확인하실 수 있습니다.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionHeader>공인인증서 없이 신청할 수 있나요?</AccordionHeader>
        <AccordionPanel>
          간편인증(카카오, 네이버 등)을 통해 별도의 공인인증서 없이도 대부분의 민원을 신청하실 수 있습니다.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionHeader>처리 결과는 어떻게 확인하나요?</AccordionHeader>
        <AccordionPanel>
          마이페이지 → 나의 민원 → 처리 현황에서 실시간으로 처리 상태를 확인하실 수 있습니다.
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

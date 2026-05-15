import { Accordion, AccordionItem, AccordionHeader, AccordionPanel } from "@/components/ui/krds";

export default function AccordionNested() {
  return (
    <Accordion defaultValue={["cat-1"]}>
      <AccordionItem value="cat-1">
        <AccordionHeader>주민 서비스</AccordionHeader>
        <AccordionPanel>
          <Accordion variant="line" defaultValue={["sub-1"]}>
            <AccordionItem value="sub-1">
              <AccordionHeader>주민등록 관련</AccordionHeader>
              <AccordionPanel>주민등록등본, 주민등록초본, 전입신고 등의 서비스를 제공합니다.</AccordionPanel>
            </AccordionItem>
            <AccordionItem value="sub-2">
              <AccordionHeader>가족관계 관련</AccordionHeader>
              <AccordionPanel>가족관계증명서, 혼인관계증명서, 출생신고 서비스를 제공합니다.</AccordionPanel>
            </AccordionItem>
          </Accordion>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem value="cat-2">
        <AccordionHeader>부동산 서비스</AccordionHeader>
        <AccordionPanel>
          <Accordion variant="line">
            <AccordionItem value="sub-3">
              <AccordionHeader>등기 관련</AccordionHeader>
              <AccordionPanel>등기부등본 열람 및 발급 서비스를 제공합니다.</AccordionPanel>
            </AccordionItem>
            <AccordionItem value="sub-4">
              <AccordionHeader>지적 관련</AccordionHeader>
              <AccordionPanel>토지대장, 건축물대장 발급 서비스를 제공합니다.</AccordionPanel>
            </AccordionItem>
          </Accordion>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

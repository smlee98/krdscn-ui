import { Accordion, AccordionItem, AccordionHeader, AccordionPanel } from "@/components/ui/dynamic/accordion";

export default function AccordionWithComplexContent() {
  return (
    <Accordion defaultValue={["complex1"]}>
      <AccordionItem value="complex1">
        <AccordionHeader>아코디언 타이틀 영역</AccordionHeader>
        <AccordionPanel>
          <div className="text-krds-gray-70 flex flex-col gap-2 text-sm">
            <p>아코디언 내용 영역입니다. 여기에 다양한 콘텐츠를 넣을 수 있습니다.</p>
            <ul className="list-disc space-y-1 pl-4">
              <li>목록 항목 1</li>
              <li>목록 항목 2</li>
              <li>목록 항목 3</li>
            </ul>
          </div>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem value="complex2">
        <AccordionHeader>두 번째 아코디언 타이틀</AccordionHeader>
        <AccordionPanel>
          <div className="text-krds-gray-70 flex flex-col gap-2 text-sm">
            <p>두 번째 아코디언의 내용입니다. 이 영역에는 텍스트뿐만 아니라 다른 컴포넌트도 포함할 수 있습니다.</p>
          </div>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem value="complex3">
        <AccordionHeader>세 번째 아코디언</AccordionHeader>
        <AccordionPanel>세 번째 아코디언 내용입니다.</AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

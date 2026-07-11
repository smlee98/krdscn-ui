import { Accordion, AccordionItem, AccordionHeader, AccordionPanel } from "@/components/ui/dynamic/accordion"

export default function AccordionDefault() {
  return (
    <Accordion className="w-full" defaultValue={["item1"]}>
      <AccordionItem value="item1">
        <AccordionHeader>아코디언 타이틀 영역</AccordionHeader>
        <AccordionPanel>아코디언 내용 영역입니다. 여기에 다양한 콘텐츠를 넣을 수 있습니다.</AccordionPanel>
      </AccordionItem>
      <AccordionItem value="item2">
        <AccordionHeader>두 번째 아코디언 타이틀</AccordionHeader>
        <AccordionPanel>
          두 번째 아코디언의 내용입니다. 이 영역에는 텍스트뿐만 아니라 다른 컴포넌트도 포함할 수 있습니다.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem value="item3">
        <AccordionHeader>세 번째 아코디언</AccordionHeader>
        <AccordionPanel>세 번째 아코디언 내용입니다.</AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}

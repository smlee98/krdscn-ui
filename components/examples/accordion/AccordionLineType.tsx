"use client"

import { Accordion, AccordionHeader, AccordionItem, AccordionPanel } from "@/registry/krds/ui/accordion"

export default function AccordionLineType() {
  return (
    <Accordion variant="line" className="w-full" defaultValue={["item1"]}>
      <AccordionItem value="item1">
        <AccordionHeader>아코디언 타이틀 영역</AccordionHeader>
        <AccordionPanel>아코디언 내용 영역입니다. 라인형은 배경 채움 없이 구분선으로 아이템을 나눕니다.</AccordionPanel>
      </AccordionItem>
      <AccordionItem value="item2">
        <AccordionHeader>두 번째 아코디언 타이틀</AccordionHeader>
        <AccordionPanel>두 번째 아코디언의 내용입니다.</AccordionPanel>
      </AccordionItem>
      <AccordionItem value="item3">
        <AccordionHeader>세 번째 아코디언</AccordionHeader>
        <AccordionPanel>세 번째 아코디언의 내용입니다.</AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}

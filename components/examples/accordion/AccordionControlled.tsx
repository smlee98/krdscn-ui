"use client"

import * as React from "react"
import { Button } from "@/registry/krds/ui/button"
import { Accordion, AccordionItem, AccordionHeader, AccordionPanel } from "@/registry/krds/ui/accordion"

const ITEMS = ["faq-1", "faq-2", "faq-3"]

export default function AccordionControlled() {
  const [openValues, setOpenValues] = React.useState<string[]>(["faq-1"])

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex gap-2">
        <Button variant="secondary" size="sm" onClick={() => setOpenValues(ITEMS)}>
          모두 펼치기
        </Button>
        <Button variant="tertiary" size="sm" onClick={() => setOpenValues([])}>
          모두 접기
        </Button>
      </div>
      <Accordion value={openValues} onChange={setOpenValues}>
        <AccordionItem value="faq-1">
          <AccordionHeader>비밀번호를 잊어버렸어요</AccordionHeader>
          <AccordionPanel>
            로그인 화면에서 &apos;비밀번호 찾기&apos;를 클릭하고 본인인증을 완료하면 새 비밀번호를 설정할 수 있습니다.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="faq-2">
          <AccordionHeader>회원 탈퇴는 어떻게 하나요?</AccordionHeader>
          <AccordionPanel>
            마이페이지 → 회원정보 → 회원탈퇴에서 탈퇴를 신청할 수 있습니다. 처리 중인 민원이 있는 경우 탈퇴가 제한될 수
            있습니다.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="faq-3">
          <AccordionHeader>서비스 이용 시간은 언제인가요?</AccordionHeader>
          <AccordionPanel>
            24시간 365일 서비스가 제공됩니다. 단, 시스템 점검 시간에는 일시 중단될 수 있습니다.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

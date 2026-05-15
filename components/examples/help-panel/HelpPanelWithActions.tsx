"use client";

import * as React from "react";
import {
  HelpPanel,
  HelpPanelDescription,
  HelpPanelLink,
  HelpPanelLinks,
  HelpPanelTitle
} from "@/components/ui/krds/help-panel";
import { Button } from "@/components/ui/krds/button";

export default function HelpPanelWithActions() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-2">
      <p className="text-krds-gray-70 text-sm">외부 상태 제어 (open: {open ? "열림" : "닫힘"})</p>
      <HelpPanel open={open} onOpenChange={setOpen} trigger={<Button variant="primary">신청 방법 자세히 보기</Button>}>
        <HelpPanelTitle>온라인 신청 절차</HelpPanelTitle>
        <HelpPanelDescription>
          1) 본인 인증 → 2) 신청서 작성 → 3) 증빙 서류 첨부 → 4) 제출 및 접수번호 확인. 접수번호는 SMS로도 발송됩니다.
        </HelpPanelDescription>
        <HelpPanelLinks>
          <HelpPanelLink href="#flow">전체 흐름도</HelpPanelLink>
          <HelpPanelLink href="#docs">필요 서류 목록</HelpPanelLink>
        </HelpPanelLinks>
      </HelpPanel>
    </div>
  );
}

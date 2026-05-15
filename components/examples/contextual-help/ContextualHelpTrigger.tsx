"use client";

import * as React from "react";
import { ContextualHelp } from "@/components/ui/krds/contextual-help";

export default function ContextualHelpTrigger() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="text-krds-gray-90 text-sm font-medium">소득 구간</span>
        <ContextualHelp
          open={open}
          onOpenChange={setOpen}
          title="소득 구간 산정 방법"
          content="최근 1년 간의 평균 월소득을 기준으로 1~10분위로 산정합니다. 비정기 수입은 합산하지 않습니다."
          triggerLabel="소득 구간 도움말"
        />
        <span className="text-krds-gray-50 text-xs">({open ? "열림" : "닫힘"})</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-krds-gray-90 text-sm font-medium">기본 공제액</span>
        <ContextualHelp defaultOpen title="기본 공제액" content="가구원 1인당 500,000원이 자동 공제됩니다." />
      </div>
    </div>
  );
}

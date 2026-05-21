"use client";
import { Button } from "@/components/ui/krds/(action)/button";
import { Tooltip } from "@/components/ui/krds/(help)/tooltip";

export default function TooltipKeyboard() {
  return (
    <div className="flex flex-col gap-5">
      <p className="text-[15px] leading-[1.5] text-[#1e2124]">Tab 포커스, ESC key 로 제어</p>
      <Tooltip text="키보드로 포커스하면 툴팁이 표시됩니다" variant="vertical">
        <Button variant="primary">접근성 테스트</Button>
      </Tooltip>
    </div>
  );
}

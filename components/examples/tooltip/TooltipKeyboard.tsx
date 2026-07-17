"use client"
import { Button } from "@/registry/krds/ui/button"
import { Tooltip } from "@/registry/krds/ui/tooltip"

export default function TooltipKeyboard() {
  return (
    <div className="flex flex-col gap-5">
      <p className="text-krds-body-sm text-krds-foreground">Tab 포커스, ESC key 로 제어</p>
      <Tooltip text="키보드로 포커스하면 툴팁이 표시됩니다" variant="vertical">
        <Button variant="default">접근성 테스트</Button>
      </Tooltip>
    </div>
  )
}

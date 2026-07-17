"use client"
import { Button } from "@/registry/krds/ui/button"
import { Tooltip } from "@/registry/krds/ui/tooltip"

export default function TooltipBox() {
  return (
    <Tooltip text="박스형 툴팁입니다. 긴 텍스트를 표시할 때 사용합니다." variant="box">
      <Button variant="default">박스형 툴팁</Button>
    </Tooltip>
  )
}

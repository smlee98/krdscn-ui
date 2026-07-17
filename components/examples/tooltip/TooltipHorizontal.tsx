"use client"
import { Button } from "@/registry/krds/ui/button"
import { Tooltip } from "@/registry/krds/ui/tooltip"

export default function TooltipHorizontal() {
  return (
    <Tooltip text="가로형 툴팁입니다" variant="horizontal">
      <Button variant="default">가로형 툴팁</Button>
    </Tooltip>
  )
}

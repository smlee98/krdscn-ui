"use client"
import { Button } from "@/registry/krds/ui/button"
import { Tooltip } from "@/registry/krds/ui/tooltip"

export default function TooltipVertical() {
  return (
    <Tooltip text="세로형 툴팁입니다" variant="vertical">
      <Button variant="default">세로형 툴팁</Button>
    </Tooltip>
  )
}

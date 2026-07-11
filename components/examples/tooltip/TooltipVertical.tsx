"use client"
import { Button } from "@/components/ui/dynamic/button"
import { Tooltip } from "@/components/ui/dynamic/tooltip"

export default function TooltipVertical() {
  return (
    <Tooltip text="세로형 툴팁입니다" variant="vertical">
      <Button variant="default">세로형 툴팁</Button>
    </Tooltip>
  )
}

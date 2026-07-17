"use client"
import { CircleHelp } from "lucide-react"
import { Tooltip } from "@/registry/krds/ui/tooltip"

export default function TooltipWithIcon() {
  return (
    <Tooltip text="아이콘과 함께 사용하는 툴팁" variant="vertical">
      <button
        type="button"
        aria-label="도움말"
        className="text-krds-foreground hover:bg-krds-surface-subtler focus-visible:outline-krds-border-primary inline-flex h-8 w-8 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <CircleHelp className="h-5 w-5" aria-hidden />
      </button>
    </Tooltip>
  )
}

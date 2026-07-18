"use client"

import * as React from "react"
import { DateInput } from "@/registry/krds/ui/date-input"

export default function DateInputControlled() {
  const [value, setValue] = React.useState("2024.12.25")
  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false)

  return (
    <div className="w-[360px]">
      <DateInput
        label="레이블"
        value={value}
        isCalendarOpen={isCalendarOpen}
        onValueChange={setValue}
        onCalendarOpenChange={setIsCalendarOpen}
      />
      <div className="bg-krds-surface-subtler text-krds-body-sm text-krds-foreground mt-4 rounded-[4px] p-4">
        입력된 날짜: {value || "없음"}
      </div>
    </div>
  )
}

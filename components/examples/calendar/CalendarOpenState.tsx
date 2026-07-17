"use client"

import * as React from "react"
import { Calendar } from "@/registry/krds/ui/calendar"

export default function CalendarOpenState() {
  const [value, setValue] = React.useState("2024.03.15")

  return (
    <div className="flex flex-col gap-3">
      <p className="text-krds-gray-50 text-xs">달력이 열린 상태를 시연합니다.</p>
      <Calendar mode="single" value={value} onChange={setValue} />
    </div>
  )
}

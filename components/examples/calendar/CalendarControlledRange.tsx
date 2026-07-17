"use client"

import * as React from "react"
import { Calendar } from "@/registry/krds/ui/calendar"

export default function CalendarControlledRange() {
  const [rangeStart, setRangeStart] = React.useState("")
  const [rangeEnd, setRangeEnd] = React.useState("")

  return (
    <div className="flex flex-col gap-3">
      <Calendar
        mode="range"
        startDate={rangeStart}
        endDate={rangeEnd}
        onRangeChange={(s, e) => {
          setRangeStart(s)
          setRangeEnd(e)
        }}
      />
      {rangeStart && rangeEnd && (
        <p className="text-krds-gray-50 text-sm">
          선택 기간: {rangeStart} ~ {rangeEnd}
        </p>
      )}
    </div>
  )
}

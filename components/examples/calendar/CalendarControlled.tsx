"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/dynamic/calendar"

export default function CalendarControlled() {
  const [selected, setSelected] = React.useState("2024.03.15")

  return (
    <div className="flex flex-col gap-3">
      <Calendar mode="single" value={selected} onChange={setSelected} />
      {selected && <p className="text-krds-gray-50 text-sm">선택된 날짜: {selected}</p>}
    </div>
  )
}

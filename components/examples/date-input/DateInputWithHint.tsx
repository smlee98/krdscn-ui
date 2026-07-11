"use client"

import { DateInput } from "@/components/ui/dynamic/date-input"

export default function DateInputWithHint() {
  return (
    <div className="w-[360px]">
      <DateInput label="레이블" hint="도움말" />
    </div>
  )
}

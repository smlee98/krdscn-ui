"use client"

import { DateInput } from "@/registry/krds/ui/date-input"

export default function DateInputWithHint() {
  return (
    <div className="w-[360px]">
      <DateInput label="레이블" hint="도움말" />
    </div>
  )
}

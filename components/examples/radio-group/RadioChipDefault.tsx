"use client"

import { RadioChip, RadioGroup } from "@/registry/krds/ui/radio-group"

export default function RadioChipDefault() {
  return (
    <RadioGroup
      name="radio-chip-demo"
      defaultValue="checked"
      column={false}
      className="w-full items-center justify-center py-4"
    >
      <RadioChip value="default">chip 상태 : default</RadioChip>
      <RadioChip value="checked">chip 상태 : checked</RadioChip>
      <RadioChip value="disabled" disabled>
        chip 상태 : disabled
      </RadioChip>
    </RadioGroup>
  )
}

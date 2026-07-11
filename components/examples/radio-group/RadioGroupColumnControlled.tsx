"use client"

import { useState } from "react"
import { Radio, RadioGroup } from "@/components/ui/dynamic/radio-group"

export default function RadioGroupColumnControlled() {
  const [value, setValue] = useState("option1")

  return (
    <RadioGroup name="example-group-column" column value={value} onChange={(v) => setValue(v)}>
      <Radio value="option1" description="부가적인 설명이 들어갑니다.">
        라디오버튼
      </Radio>
      <Radio value="option2" description="부가적인 설명이 들어갑니다.">
        라디오버튼
      </Radio>
    </RadioGroup>
  )
}

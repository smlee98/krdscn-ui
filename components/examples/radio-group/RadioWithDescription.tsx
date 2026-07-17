import { Radio, RadioGroup } from "@/registry/krds/ui/radio-group"

export default function RadioWithDescription() {
  return (
    <RadioGroup name="radio-group">
      <Radio value="default" description="부가적인 설명이 들어갑니다.">
        라디오 버튼
      </Radio>
    </RadioGroup>
  )
}

import { Radio, RadioGroup } from "@/components/ui/dynamic/radio-group"

export default function RadioGroupExample() {
  return (
    <RadioGroup name="example-group" defaultValue="option4">
      <Radio value="option1">기본</Radio>
      <Radio value="option2">선택됨</Radio>
      <Radio value="option3" disabled>
        비활성화
      </Radio>
      <Radio value="option4" disabled>
        선택된 비활성화
      </Radio>
    </RadioGroup>
  )
}

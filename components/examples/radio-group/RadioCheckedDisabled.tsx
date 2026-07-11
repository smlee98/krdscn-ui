import { Radio, RadioGroup } from "@/components/ui/dynamic/radio-group"

export default function RadioCheckedDisabled() {
  return (
    <RadioGroup name="radio-group" defaultValue="x">
      <Radio value="x" disabled>
        선택된 비활성화
      </Radio>
    </RadioGroup>
  )
}

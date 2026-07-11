import { Radio, RadioGroup } from "@/components/ui/dynamic/radio-group"

export default function RadioDisabled() {
  return (
    <RadioGroup name="radio-group">
      <Radio value="default" disabled>
        비활성화
      </Radio>
    </RadioGroup>
  )
}

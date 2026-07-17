import { Radio, RadioGroup } from "@/registry/krds/ui/radio-group"

export default function RadioDisabled() {
  return (
    <RadioGroup name="radio-group">
      <Radio value="default" disabled>
        비활성화
      </Radio>
    </RadioGroup>
  )
}

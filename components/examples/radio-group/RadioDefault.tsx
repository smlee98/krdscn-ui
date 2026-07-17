import { Radio, RadioGroup } from "@/registry/krds/ui/radio-group"

export default function RadioDefault() {
  return (
    <RadioGroup name="radio-group">
      <Radio value="default">라디오 버튼</Radio>
    </RadioGroup>
  )
}

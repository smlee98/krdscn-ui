import { Radio, RadioGroup } from "@/components/ui/dynamic/radio-group";

export default function RadioDefault() {
  return (
    <RadioGroup name="radio-group">
      <Radio value="default">라디오 버튼</Radio>
    </RadioGroup>
  );
}

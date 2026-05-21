import { Radio, RadioGroup } from "@/components/ui/krds/(selection)/radio-group";

export default function RadioGroupColumn() {
  return (
    <RadioGroup name="example-group-column" column defaultValue="option1">
      <Radio value="option1" description="부가적인 설명이 들어갑니다.">
        라디오버튼
      </Radio>
      <Radio value="option2" description="부가적인 설명이 들어갑니다.">
        라디오버튼
      </Radio>
    </RadioGroup>
  );
}

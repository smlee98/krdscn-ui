import { Radio, RadioGroup } from "@/components/ui/krds/(selection)/radio-group";

export default function RadioSize() {
  return (
    <RadioGroup name="example-group-size" defaultValue="option1">
      <Radio value="option1" size="medium">
        사이즈 : medium
      </Radio>
      <Radio value="option2" size="large">
        사이즈 : large
      </Radio>
    </RadioGroup>
  );
}

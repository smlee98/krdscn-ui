import { Radio, RadioChip, RadioGroup } from "@/components/ui/krds/radio-group";

export default function RadioGroupHorizontal() {
  return (
    <div className="flex flex-col gap-6">
      <RadioGroup name="size" defaultValue="medium" column={false}>
        <Radio value="small">소형</Radio>
        <Radio value="medium">중형</Radio>
        <Radio value="large">대형</Radio>
      </RadioGroup>
      <RadioGroup name="region" defaultValue="seoul" column={false}>
        <RadioChip value="seoul">서울</RadioChip>
        <RadioChip value="incheon">인천</RadioChip>
        <RadioChip value="busan">부산</RadioChip>
        <RadioChip value="daegu">대구</RadioChip>
      </RadioGroup>
    </div>
  );
}

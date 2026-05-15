import { Radio, RadioGroup } from "@/components/ui/krds/radio-group";

export default function RadioGroupDisabled() {
  return (
    <div className="flex flex-col gap-6">
      <RadioGroup name="plan" defaultValue="basic">
        <Radio value="basic">기본 (무료)</Radio>
        <Radio value="standard" disabled description="현재 신청 마감되었습니다.">
          표준 (월 9,900원)
        </Radio>
        <Radio value="premium" disabled description="법인 전용 상품">
          프리미엄 (월 29,900원)
        </Radio>
      </RadioGroup>
      <RadioGroup name="size-large" defaultValue="m">
        <Radio value="s" size="large">
          대형 크기 / S
        </Radio>
        <Radio value="m" size="large">
          대형 크기 / M
        </Radio>
        <Radio value="l" size="large" disabled>
          대형 크기 / L (재고 없음)
        </Radio>
      </RadioGroup>
    </div>
  );
}

import { Checkbox } from "@/components/ui/krds/(selection)/checkbox";

export default function CheckboxWithDescription() {
  return (
    <div className="flex flex-col gap-3">
      <Checkbox label="이용약관에 동의합니다." description="필수 항목입니다." />
      <Checkbox label="개인정보 수집·이용에 동의합니다." description="서비스 제공을 위해 필요합니다." defaultValue />
    </div>
  );
}

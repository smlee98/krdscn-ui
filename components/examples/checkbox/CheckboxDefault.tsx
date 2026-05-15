import { Checkbox } from "@/components/ui/krds/checkbox";

export default function CheckboxDefault() {
  return (
    <div className="flex flex-col gap-3">
      <Checkbox label="이용약관에 동의합니다." />
      <Checkbox label="개인정보 수집·이용에 동의합니다." description="필수 항목입니다." />
      <Checkbox label="마케팅 알림 수신에 동의합니다 (선택)" defaultValue />
    </div>
  );
}

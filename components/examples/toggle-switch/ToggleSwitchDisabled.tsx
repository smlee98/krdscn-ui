import { ToggleSwitch } from "@/components/ui/krds/toggle-switch";

export default function ToggleSwitchDisabled() {
  return (
    <div className="flex flex-col gap-3">
      <ToggleSwitch label="비활성 (OFF)" disabled />
      <ToggleSwitch label="비활성 (ON)" disabled defaultChecked />
      <ToggleSwitch label="자동 저장 (관리자만 변경 가능)" size="large" disabled defaultChecked />
    </div>
  );
}

import { ToggleSwitch } from "@/components/ui/krds/(selection)/toggle-switch";

export default function ToggleSwitchLarge() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <ToggleSwitch size="large" label="스위치" />
      <ToggleSwitch size="large" label="스위치" defaultChecked />
    </div>
  );
}

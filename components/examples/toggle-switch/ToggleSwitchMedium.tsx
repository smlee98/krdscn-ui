import { ToggleSwitch } from "@/components/ui/dynamic/toggle-switch";

export default function ToggleSwitchMedium() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <ToggleSwitch size="medium" label="스위치" />
      <ToggleSwitch size="medium" label="스위치" defaultChecked />
    </div>
  );
}

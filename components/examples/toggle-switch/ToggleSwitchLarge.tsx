import { ToggleSwitch } from "@/registry/krds/ui/toggle-switch"

export default function ToggleSwitchLarge() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <ToggleSwitch size="large" label="스위치" />
      <ToggleSwitch size="large" label="스위치" defaultChecked />
    </div>
  )
}

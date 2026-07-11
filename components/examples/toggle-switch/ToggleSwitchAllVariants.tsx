import { ToggleSwitch } from "@/components/ui/dynamic/toggle-switch"

export default function ToggleSwitchAllVariants() {
  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-4">
      {/* Header row */}
      <span className="text-krds-gray-70 text-sm font-medium">Medium</span>
      <span className="text-krds-gray-70 text-sm font-medium">Large</span>

      {/* Off */}
      <ToggleSwitch size="medium" label="스위치" />
      <ToggleSwitch size="large" label="스위치" />

      {/* On */}
      <ToggleSwitch size="medium" label="스위치" defaultChecked />
      <ToggleSwitch size="large" label="스위치" defaultChecked />

      {/* Disabled off */}
      <ToggleSwitch size="medium" label="스위치" disabled />
      <ToggleSwitch size="large" label="스위치" disabled />

      {/* Disabled on */}
      <ToggleSwitch size="medium" label="스위치" disabled defaultChecked />
      <ToggleSwitch size="large" label="스위치" disabled defaultChecked />
    </div>
  )
}

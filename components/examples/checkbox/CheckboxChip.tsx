import { CheckboxChip as KrdsCheckboxChip, CheckboxGroup as KrdsCheckboxGroup } from "@/components/ui/dynamic/checkbox"

export default function CheckboxChip() {
  return (
    <KrdsCheckboxGroup>
      <KrdsCheckboxChip defaultValue={false}>chip 상태 : default</KrdsCheckboxChip>
      <KrdsCheckboxChip defaultValue={true}>chip 상태 : checked</KrdsCheckboxChip>
      <KrdsCheckboxChip disabled>chip 상태 : disabled</KrdsCheckboxChip>
    </KrdsCheckboxGroup>
  )
}

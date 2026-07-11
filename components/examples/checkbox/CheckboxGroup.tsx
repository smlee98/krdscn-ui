import { Checkbox, CheckboxGroup as KrdsCheckboxGroup } from "@/components/ui/dynamic/checkbox"

export default function CheckboxGroup() {
  return (
    <KrdsCheckboxGroup>
      <Checkbox label="공지사항 알림" defaultValue />
      <Checkbox label="민원 처리 결과 알림" defaultValue />
      <Checkbox label="이벤트 안내" />
    </KrdsCheckboxGroup>
  )
}

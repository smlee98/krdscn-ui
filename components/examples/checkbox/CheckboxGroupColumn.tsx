import { Checkbox, CheckboxGroup as KrdsCheckboxGroup } from "@/components/ui/krds/(selection)/checkbox";

export default function CheckboxGroupColumn() {
  return (
    <KrdsCheckboxGroup column>
      <Checkbox label="공지사항 알림" description="새 공지가 등록되면 알려드립니다." defaultValue />
      <Checkbox label="민원 처리 결과 알림" description="민원 상태가 변경될 때 알려드립니다." defaultValue />
      <Checkbox label="이벤트 안내" description="신규 이벤트 정보를 받아보세요." />
    </KrdsCheckboxGroup>
  );
}

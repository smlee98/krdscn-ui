import { Checkbox } from "@/components/ui/krds/checkbox";

export default function CheckboxDisabled() {
  return (
    <div className="flex flex-col gap-3">
      <Checkbox label="비활성 (체크 안 됨)" disabled />
      <Checkbox label="비활성 (체크됨)" checked disabled />
      <Checkbox label="권한이 필요합니다" description="관리자 권한이 있어야 변경할 수 있습니다." disabled />
    </div>
  );
}

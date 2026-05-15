import { DateInput } from "@/components/ui/krds/date-input";

export default function DateInputDisabled() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <DateInput
        label="신청 마감일 (변경 불가)"
        defaultValue="2026-05-31"
        disabled
        hint="공고 등록 시 자동 설정되어 변경할 수 없습니다."
      />
      <DateInput label="등록 일자" defaultValue="2026-01-02" readOnly />
    </div>
  );
}

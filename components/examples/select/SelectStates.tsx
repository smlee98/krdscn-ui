import { Select } from "@/components/ui/krds/(selection)/select";
import { FieldHint, FieldError } from "@/components/ui/krds/(input)/field-message";

const options = [
  { value: "option1", label: "항목1" },
  { value: "option2", label: "항목2" },
  { value: "option3", label: "항목3" },
  { value: "option4", label: "항목4" }
];

const withSelected = [{ value: "selected", label: "선택완료 상태" }, ...options];

export default function SelectStates() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <div className="flex w-full flex-col gap-2">
        <Select options={options} label="레이블" placeholder="선택해주세요." />
        <FieldHint>도움말</FieldHint>
      </div>
      <div className="flex w-full flex-col gap-2">
        <Select options={withSelected} label="레이블" defaultValue="selected" />
        <FieldHint>도움말</FieldHint>
      </div>
      <div className="flex w-full flex-col gap-2">
        <Select options={options} label="레이블" aria-invalid placeholder="선택해주세요." />
        <FieldError>에러 메시지</FieldError>
      </div>
      <div className="flex w-full flex-col gap-2">
        <Select options={options} label="레이블" disabled defaultValue="option1" />
        <FieldHint>도움말</FieldHint>
      </div>
    </div>
  );
}

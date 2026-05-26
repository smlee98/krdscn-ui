import { Select } from "@/components/ui/krds/(selection)/select";
import { FieldHint } from "@/components/ui/krds/(input)/field-message";

const options = [
  { value: "option1", label: "항목1" },
  { value: "option2", label: "항목2" },
  { value: "option3", label: "항목3" },
  { value: "option4", label: "항목4" }
];

export default function SelectDefault() {
  return (
    <div className="w-full max-w-sm">
      <div className="flex w-full flex-col gap-2">
        <Select options={options} label="레이블" defaultValue="option1" />
        <FieldHint>도움말</FieldHint>
      </div>
    </div>
  );
}

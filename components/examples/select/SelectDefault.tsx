import { Select } from "@/components/ui/krds/(selection)/select";

const options = [
  { value: "option1", label: "항목1" },
  { value: "option2", label: "항목2" },
  { value: "option3", label: "항목3" },
  { value: "option4", label: "항목4" }
];

export default function SelectDefault() {
  return (
    <div className="w-full max-w-sm">
      <Select options={options} label="레이블" hint="도움말" defaultValue="option1" />
    </div>
  );
}

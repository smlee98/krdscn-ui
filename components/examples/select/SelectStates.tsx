import { Select } from "@/components/ui/dynamic/select"

const options = [
  { value: "option1", label: "항목1" },
  { value: "option2", label: "항목2" },
  { value: "option3", label: "항목3" },
  { value: "option4", label: "항목4" },
]

const withSelected = [{ value: "selected", label: "선택완료 상태" }, ...options]

export default function SelectStates() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Select options={options} label="레이블" placeholder="선택해주세요." hint="도움말" />
      <Select options={withSelected} label="레이블" defaultValue="selected" hint="도움말" />
      <Select options={options} label="레이블" placeholder="선택해주세요." error="에러 메시지" />
      <Select options={options} label="레이블" disabled defaultValue="option1" hint="도움말" />
    </div>
  )
}

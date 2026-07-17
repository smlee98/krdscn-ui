import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/krds/ui/select"

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
      <Select label="레이블" hint="도움말">
        <SelectTrigger>
          <SelectValue placeholder="선택해주세요." />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o.value} value={o.value}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select label="레이블" defaultValue="selected" hint="도움말">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {withSelected.map((o) => (
            <SelectItem key={o.value} value={o.value}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select label="레이블" error="에러 메시지">
        <SelectTrigger>
          <SelectValue placeholder="선택해주세요." />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o.value} value={o.value}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select label="레이블" disabled defaultValue="option1" hint="도움말">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o.value} value={o.value}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

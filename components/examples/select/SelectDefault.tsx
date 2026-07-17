import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/krds/ui/select"
import { FieldHint } from "@/registry/krds/ui/field-message"

const options = [
  { value: "option1", label: "항목1" },
  { value: "option2", label: "항목2" },
  { value: "option3", label: "항목3" },
  { value: "option4", label: "항목4" },
]

export default function SelectDefault() {
  return (
    <div className="w-full max-w-sm">
      <div className="flex w-full flex-col gap-2">
        <Select label="레이블" defaultValue="option1">
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
        <FieldHint>도움말</FieldHint>
      </div>
    </div>
  )
}

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/krds/ui/select"

const sortOptions = [
  { value: "option1", label: "항목1" },
  { value: "option2", label: "항목2" },
  { value: "option3", label: "항목3" },
]

function SortSelect({ size, defaultValue }: { size: "small" | "medium" | "large"; defaultValue: string }) {
  return (
    <Select variant="sorting" size={size} defaultValue={defaultValue}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map((o) => (
          <SelectItem key={o.value} value={o.value}>
            {o.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default function SelectSorting() {
  return (
    <div className="flex items-center gap-4">
      <SortSelect size="small" defaultValue="option3" />
      <SortSelect size="medium" defaultValue="option2" />
      <SortSelect size="large" defaultValue="option1" />
    </div>
  )
}

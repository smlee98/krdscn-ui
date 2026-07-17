import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/krds/ui/select"

const sizeOptions = [
  { value: "small", label: "Small" },
  { value: "medium", label: "Medium" },
  { value: "large", label: "Large" },
]

function SizeSelect({
  label,
  size,
  defaultValue,
}: {
  label: string
  size: "small" | "medium" | "large"
  defaultValue: string
}) {
  return (
    <Select label={label} size={size} defaultValue={defaultValue}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {sizeOptions.map((o) => (
          <SelectItem key={o.value} value={o.value}>
            {o.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default function SelectSizes() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <SizeSelect label="Small 크기" size="small" defaultValue="small" />
      <SizeSelect label="Medium 크기" size="medium" defaultValue="medium" />
      <SizeSelect label="Large 크기" size="large" defaultValue="large" />
    </div>
  )
}

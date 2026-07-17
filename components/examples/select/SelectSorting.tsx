import { Select } from "@/registry/krds/ui/select"

const sortOptions = [
  { value: "option1", label: "항목1" },
  { value: "option2", label: "항목2" },
  { value: "option3", label: "항목3" },
]

export default function SelectSorting() {
  return (
    <div className="flex items-center gap-4">
      <Select options={sortOptions} variant="sorting" size="small" defaultValue="option3" />
      <Select options={sortOptions} variant="sorting" size="medium" defaultValue="option2" />
      <Select options={sortOptions} variant="sorting" size="large" defaultValue="option1" />
    </div>
  )
}

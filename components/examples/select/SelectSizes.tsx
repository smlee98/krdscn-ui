import { Select } from "@/components/ui/krds/(selection)/select";

const sizeOptions = [
  { value: "small", label: "Small" },
  { value: "medium", label: "Medium" },
  { value: "large", label: "Large" }
];

export default function SelectSizes() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Select options={sizeOptions} label="Small 크기" size="small" defaultValue="small" />
      <Select options={sizeOptions} label="Medium 크기" size="medium" defaultValue="medium" />
      <Select options={sizeOptions} label="Large 크기" size="large" defaultValue="large" />
    </div>
  );
}

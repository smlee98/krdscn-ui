import { Checkbox } from "@/components/ui/krds/(selection)/checkbox";

export default function CheckboxSize() {
  return (
    <div className="flex flex-col gap-3">
      <Checkbox size="medium" label="사이즈 : medium" defaultValue />
      <Checkbox size="large" label="사이즈 : large" defaultValue />
    </div>
  );
}

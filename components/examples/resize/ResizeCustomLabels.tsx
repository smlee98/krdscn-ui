import { Resize } from "@/components/ui/krds/(settings)/resize";

export default function ResizeCustomLabels() {
  return (
    <div className="w-full max-w-md py-12">
      <Resize
        buttonText="Font Size"
        resetText="Reset"
        labels={{
          sm: "Small",
          md: "Medium",
          lg: "Large",
          xlg: "Extra Large",
          xxlg: "XXL",
        }}
      />
    </div>
  );
}

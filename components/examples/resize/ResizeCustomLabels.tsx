import { Resize } from "@/registry/krds/ui/resize"

export default function ResizeCustomLabels() {
  return (
    <div className="flex w-full max-w-md justify-center py-12">
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
  )
}

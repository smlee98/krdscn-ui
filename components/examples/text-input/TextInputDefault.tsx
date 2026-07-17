import { TextInput } from "@/registry/krds/ui/text-input"
import { FieldHint } from "@/registry/krds/ui/field-message"

export default function TextInputDefault() {
  return (
    <div className="w-full max-w-[400px]">
      <div className="flex w-full flex-col gap-2">
        <TextInput label="레이블" placeholder="플레이스홀더" />
        <FieldHint>도움말</FieldHint>
      </div>
    </div>
  )
}

import { TextInput } from "@/components/ui/dynamic/text-input"

export default function TextInputWithoutHint() {
  return (
    <div className="w-full max-w-[400px]">
      <TextInput label="도움말이 없는 입력 필드" placeholder="플레이스홀더" />
    </div>
  )
}

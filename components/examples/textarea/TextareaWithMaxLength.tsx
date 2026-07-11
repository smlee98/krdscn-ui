import { Textarea } from "@/components/ui/dynamic/textarea"

export default function TextareaWithMaxLength() {
  return (
    <div className="w-[360px]">
      <Textarea
        label="레이블"
        placeholder="플레이스홀더"
        maxLength={100}
        defaultValue="최대 100자까지 입력할 수 있습니다."
      />
    </div>
  )
}

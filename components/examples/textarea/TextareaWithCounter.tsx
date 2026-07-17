import { Textarea } from "@/registry/krds/ui/textarea"

export default function TextareaWithCounter() {
  return (
    <div className="w-[360px]">
      <Textarea label="레이블" placeholder="플레이스홀더" showCount defaultValue="글자수가 표시됩니다." />
    </div>
  )
}

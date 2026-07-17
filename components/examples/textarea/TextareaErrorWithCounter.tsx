import { Textarea } from "@/registry/krds/ui/textarea"

export default function TextareaErrorWithCounter() {
  return (
    <div className="flex w-[360px] flex-col gap-2">
      <Textarea
        label="메시지 입력"
        placeholder="메시지를 입력하세요"
        countTotal={50}
        defaultValue="이 텍스트는 50자를 초과하여 에러 메시지가 표시됩니다. 실제로 매우 긴 텍스트입니다."
        error="입력 가능한 글자수를 초과했습니다."
      />
    </div>
  )
}

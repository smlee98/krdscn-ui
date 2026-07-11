import { TextInput } from "@/components/ui/dynamic/text-input"

export default function TextInputWithClearButton() {
  return (
    <div className="w-full max-w-[400px]">
      <TextInput
        label="삭제 버튼이 있는 입력 필드"
        placeholder="내용을 입력하세요"
        showClearButton
        defaultValue="삭제 가능한 텍스트"
      />
    </div>
  )
}

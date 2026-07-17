import { TextInput } from "@/registry/krds/ui/text-input"

export default function TextInputWithMultipleButtons() {
  return (
    <div className="w-full max-w-[400px]">
      <TextInput
        type="password"
        label="다중 버튼"
        placeholder="8-12자의 영문자, 숫자, 특수문자 조합"
        defaultValue="삭제 가능한 텍스트"
        showPasswordToggle
        showClearButton
      />
    </div>
  )
}

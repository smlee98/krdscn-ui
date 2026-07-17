import { TextInput } from "@/registry/krds/ui/text-input"

export default function TextInputWithPasswordToggle() {
  return (
    <div className="w-full max-w-[400px]">
      <TextInput
        type="password"
        label="비밀번호"
        placeholder="8-12자의 영문자, 숫자, 특수문자 조합"
        defaultValue="password"
        showPasswordToggle
      />
    </div>
  )
}

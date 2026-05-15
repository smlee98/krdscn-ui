import { TextInput } from "@/components/ui/krds/text-input";

export default function TextInputWithIcon() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <TextInput
        label="이메일"
        type="email"
        placeholder="example@krds.go.kr"
        information="공식 알림이 이 메일로 발송됩니다."
      />
      <TextInput label="비밀번호" type="password" placeholder="********" showPasswordToggle showClearButton />
      <TextInput label="비활성" disabled defaultValue="수정할 수 없음" />
    </div>
  );
}

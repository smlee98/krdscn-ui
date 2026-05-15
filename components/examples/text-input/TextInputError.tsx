import { TextInput } from "@/components/ui/krds/text-input";

export default function TextInputError() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <TextInput label="아이디" defaultValue="abc" error="아이디는 4자 이상이어야 합니다." />
      <TextInput label="비밀번호" type="password" defaultValue="Krds2026!" success="안전한 비밀번호입니다." />
      <TextInput label="휴대전화" defaultValue="010-1234-5678" information="인증번호가 이 번호로 발송됩니다." />
    </div>
  );
}

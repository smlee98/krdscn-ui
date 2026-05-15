import { TextInput } from "@/components/ui/krds/text-input";

export default function TextInputPassword() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <TextInput
        label="비밀번호"
        type="password"
        placeholder="********"
        hint="영문, 숫자, 특수문자를 포함해 8자 이상 입력하세요."
      />
      <TextInput label="비밀번호 확인" type="password" placeholder="********" error="비밀번호가 일치하지 않습니다." />
    </div>
  );
}

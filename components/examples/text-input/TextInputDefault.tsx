import { TextInput } from "@/components/ui/krds/text-input";

export default function TextInputDefault() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <TextInput label="이름" placeholder="홍길동" />
      <TextInput label="이메일" type="email" placeholder="example@krds.go.kr" hint="회신용 이메일을 입력하세요." />
      <TextInput label="작은 크기" size="small" placeholder="small" />
      <TextInput label="큰 크기" size="large" placeholder="large" />
    </div>
  );
}

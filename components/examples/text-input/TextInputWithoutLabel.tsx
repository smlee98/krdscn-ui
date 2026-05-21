import { TextInput } from "@/components/ui/krds/(input)/text-input";

export default function TextInputWithoutLabel() {
  return (
    <div className="w-full max-w-[400px]">
      <TextInput placeholder="레이블이 없는 입력 필드" hint="레이블 없이도 사용할 수 있습니다" />
    </div>
  );
}

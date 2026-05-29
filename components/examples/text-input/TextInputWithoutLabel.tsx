import { TextInput } from "@/components/ui/dynamic/text-input";
import { FieldHint } from "@/components/ui/krds/(input)/field-message";

export default function TextInputWithoutLabel() {
  return (
    <div className="w-full max-w-[400px]">
      <div className="flex w-full flex-col gap-2">
        <TextInput placeholder="레이블이 없는 입력 필드" />
        <FieldHint>레이블 없이도 사용할 수 있습니다</FieldHint>
      </div>
    </div>
  );
}

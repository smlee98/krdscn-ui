import { TextInput } from "@/components/ui/dynamic/text-input";
import { FieldHint } from "@/components/ui/dynamic/field-message";

export default function TextInputUncontrolled() {
  return (
    <div className="w-full max-w-[400px]">
      <div className="flex w-full flex-col gap-2">
        <TextInput label="비제어 컴포넌트" defaultValue="기본값" placeholder="플레이스홀더" />
        <FieldHint>비제어 상태로 동작합니다</FieldHint>
      </div>
    </div>
  );
}

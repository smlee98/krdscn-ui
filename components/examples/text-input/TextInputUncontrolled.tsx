import { TextInput } from "@/components/ui/krds/(input)/text-input";

export default function TextInputUncontrolled() {
  return (
    <div className="w-full max-w-[400px]">
      <TextInput
        label="비제어 컴포넌트"
        defaultValue="기본값"
        placeholder="플레이스홀더"
        hint="비제어 상태로 동작합니다"
      />
    </div>
  );
}

import { TextInput } from "@/components/ui/dynamic/text-input";
import { FieldHint } from "@/components/ui/dynamic/field-message";

export default function TextInputSizes() {
  return (
    <div className="flex w-full max-w-[400px] flex-col gap-8">
      <div className="flex w-full flex-col gap-2">
        <TextInput size="small" label="Small" placeholder="플레이스홀더" />
        <FieldHint>도움말</FieldHint>
      </div>
      <div className="flex w-full flex-col gap-2">
        <TextInput size="medium" label="Medium" placeholder="플레이스홀더" />
        <FieldHint>도움말</FieldHint>
      </div>
      <div className="flex w-full flex-col gap-2">
        <TextInput size="large" label="Large" placeholder="플레이스홀더" />
        <FieldHint>도움말</FieldHint>
      </div>
    </div>
  );
}

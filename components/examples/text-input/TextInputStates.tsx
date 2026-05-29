import { TextInput } from "@/components/ui/dynamic/text-input";
import { FieldHint, FieldError, FieldSuccess, FieldInformation } from "@/components/ui/krds/(input)/field-message";

export default function TextInputStates() {
  return (
    <div className="flex w-full max-w-[400px] flex-col gap-8">
      <div className="flex w-full flex-col gap-2">
        <TextInput label="기본 상태" placeholder="플레이스홀더" />
        <FieldHint>도움말</FieldHint>
      </div>
      <div className="flex w-full flex-col gap-2">
        <TextInput label="에러 상태" placeholder="플레이스홀더" defaultValue="에러" aria-invalid />
        <FieldError>에러 메시지</FieldError>
      </div>
      <div className="flex w-full flex-col gap-2">
        <TextInput label="성공 상태" placeholder="플레이스홀더" defaultValue="성공" />
        <FieldSuccess>성공 메시지</FieldSuccess>
      </div>
      <div className="flex w-full flex-col gap-2">
        <TextInput label="정보 상태" placeholder="플레이스홀더" defaultValue="정보" />
        <FieldInformation>정보 메시지</FieldInformation>
      </div>
      <div className="flex w-full flex-col gap-2">
        <TextInput label="읽기 전용" placeholder="플레이스홀더" defaultValue="readonly" readOnly />
        <FieldHint>도움말</FieldHint>
      </div>
      <div className="flex w-full flex-col gap-2">
        <TextInput label="비활성화" placeholder="플레이스홀더" defaultValue="disabled" disabled />
        <FieldHint>도움말</FieldHint>
      </div>
    </div>
  );
}

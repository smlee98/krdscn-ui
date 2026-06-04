import { TextInput } from "@/components/ui/dynamic/text-input";

export default function TextInputStates() {
  return (
    <div className="flex w-full max-w-[400px] flex-col gap-8">
      <TextInput label="기본 상태" placeholder="플레이스홀더" hint="도움말" />
      <TextInput label="에러 상태" placeholder="플레이스홀더" defaultValue="에러" error="에러 메시지" />
      <TextInput label="성공 상태" placeholder="플레이스홀더" defaultValue="성공" success="성공 메시지" />
      <TextInput label="정보 상태" placeholder="플레이스홀더" defaultValue="정보" information="정보 메시지" />
      <TextInput label="읽기 전용" placeholder="플레이스홀더" defaultValue="readonly" readOnly hint="도움말" />
      <TextInput label="비활성화" placeholder="플레이스홀더" defaultValue="disabled" disabled hint="도움말" />
    </div>
  );
}

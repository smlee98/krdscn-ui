import { Textarea } from "@/components/ui/krds/(input)/textarea";

export default function TextareaStates() {
  return (
    <div className="flex w-[360px] flex-col gap-8">
      <Textarea label="기본 상태" placeholder="기본 상태의 textarea" />
      <Textarea label="Disabled 상태" placeholder="비활성화된 textarea" disabled defaultValue="비활성화된 상태" />
      <Textarea label="ReadOnly 상태" readOnly defaultValue="읽기 전용 상태" />
    </div>
  );
}

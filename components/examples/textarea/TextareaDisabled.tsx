import { Textarea } from "@/components/ui/krds/textarea";

export default function TextareaDisabled() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Textarea label="비활성 (읽기 전용)" disabled defaultValue="이 영역은 관리자 권한이 있어야 수정할 수 있습니다." />
      <Textarea
        label="읽기 전용 안내"
        readOnly
        defaultValue="제출 후에는 내용을 수정할 수 없습니다. 수정이 필요할 경우 담당자에게 문의해 주세요."
        rows={4}
      />
    </div>
  );
}

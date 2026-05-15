import { Textarea } from "@/components/ui/krds/textarea";

export default function TextareaResizable() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Textarea
        label="자유롭게 크기 조정"
        rows={4}
        placeholder="우측 하단을 끌어 입력 영역의 높이를 조절할 수 있습니다."
      />
      <Textarea label="크게 시작" rows={8} className="min-h-40 resize-y" placeholder="긴 내용을 작성할 때 좋습니다." />
    </div>
  );
}

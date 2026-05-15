import { Textarea } from "@/components/ui/krds/textarea";

export default function TextareaDefault() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Textarea label="자기 소개" placeholder="간단히 본인을 소개해주세요." />
      <Textarea label="요청 사항" rows={6} placeholder="구체적으로 작성할수록 빠른 처리가 가능합니다." />
    </div>
  );
}

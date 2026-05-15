import { StructuredList, StructuredListItem } from "@/components/ui/krds";

export default function StructuredListDense() {
  return (
    <StructuredList>
      <StructuredListItem label="사용자ID" value="user_20240315_001" className="min-h-0 [&>dd]:py-2 [&>dt]:py-2" />
      <StructuredListItem label="이메일" value="hong@korea.go.kr" className="min-h-0 [&>dd]:py-2 [&>dt]:py-2" />
      <StructuredListItem label="가입일" value="2024.01.01" className="min-h-0 [&>dd]:py-2 [&>dt]:py-2" />
      <StructuredListItem label="최근접속" value="2024.03.15 09:32" className="min-h-0 [&>dd]:py-2 [&>dt]:py-2" />
      <StructuredListItem label="계정상태" value="활성" className="min-h-0 [&>dd]:py-2 [&>dt]:py-2" />
    </StructuredList>
  );
}

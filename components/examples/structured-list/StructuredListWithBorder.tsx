import { StructuredList, StructuredListItem } from "@/components/ui/krds";

export default function StructuredListWithBorder() {
  return (
    <StructuredList className="border-krds-gray-20 overflow-hidden rounded-lg border">
      <StructuredListItem label="신청번호" value="2024-00123" />
      <StructuredListItem label="신청일자" value="2024.03.15" />
      <StructuredListItem label="처리상태" value="검토 중" />
      <StructuredListItem label="담당부서" value="민원처리과" />
      <StructuredListItem label="예상완료일" value="2024.03.22" />
    </StructuredList>
  );
}

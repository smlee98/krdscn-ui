import { StructuredList, StructuredListItem } from "@/components/ui/krds";

export default function StructuredListDefault() {
  return (
    <StructuredList>
      <StructuredListItem label="이름" value="홍길동" />
      <StructuredListItem label="소속기관" value="행정안전부" />
      <StructuredListItem label="직위" value="사무관" />
      <StructuredListItem label="연락처" value="02-1234-5678" />
    </StructuredList>
  );
}

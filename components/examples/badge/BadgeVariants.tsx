import { Badge } from "@/components/ui/krds";

export default function BadgeVariants() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="basic">일반</Badge>
      <Badge variant="primary">주요</Badge>
      <Badge variant="secondary">보조</Badge>
      <Badge variant="success">성공</Badge>
      <Badge variant="warning">경고</Badge>
      <Badge variant="danger">위험</Badge>
      <Badge variant="information">정보</Badge>
      <Badge variant="point">포인트</Badge>
      <Badge variant="gray">비활성</Badge>
      <Badge variant="disabled">사용불가</Badge>
    </div>
  );
}

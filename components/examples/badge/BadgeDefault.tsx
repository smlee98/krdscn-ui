import { Badge } from "@/components/ui/krds";

export default function BadgeDefault() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Badge>기본</Badge>
      <Badge variant="primary">주요</Badge>
      <Badge variant="success">완료</Badge>
      <Badge variant="danger">오류</Badge>
    </div>
  );
}

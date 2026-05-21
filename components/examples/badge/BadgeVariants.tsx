import { Badge } from "@/components/ui/krds/(layout)/badge";

export default function BadgeVariants() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <Badge type="solid">Solid</Badge>
        <Badge type="outline">Outline</Badge>
        <Badge type="solid-pastel">Pastel</Badge>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Badge type="solid" color="danger">
          위험
        </Badge>
        <Badge type="solid" color="warning">
          경고
        </Badge>
        <Badge type="solid" color="success">
          성공
        </Badge>
        <Badge type="solid" color="info">
          정보
        </Badge>
      </div>
    </div>
  );
}

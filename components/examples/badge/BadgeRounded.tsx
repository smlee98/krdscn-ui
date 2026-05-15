import { Badge } from "@/components/ui/krds";

export default function BadgeRounded() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex flex-col items-start gap-2">
        <span className="text-krds-gray-50 text-xs">기본형 (각진)</span>
        <div className="flex gap-2">
          <Badge variant="primary" rounded={false}>
            신규
          </Badge>
          <Badge variant="success" rounded={false}>
            완료
          </Badge>
          <Badge variant="danger" rounded={false}>
            오류
          </Badge>
        </div>
      </div>
      <div className="flex flex-col items-start gap-2">
        <span className="text-krds-gray-50 text-xs">둥근형 (pill)</span>
        <div className="flex gap-2">
          <Badge variant="primary" rounded>
            신규
          </Badge>
          <Badge variant="success" rounded>
            완료
          </Badge>
          <Badge variant="danger" rounded>
            오류
          </Badge>
        </div>
      </div>
    </div>
  );
}

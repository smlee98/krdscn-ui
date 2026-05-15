import { Badge } from "@/components/ui/krds";

export default function BadgeSizes() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-start gap-2">
        <span className="text-krds-gray-50 text-xs">소형 (small)</span>
        <Badge variant="primary" size="small">
          처리중
        </Badge>
      </div>
      <div className="flex flex-col items-start gap-2">
        <span className="text-krds-gray-50 text-xs">중형 (medium)</span>
        <Badge variant="primary" size="medium">
          처리중
        </Badge>
      </div>
      <div className="flex flex-col items-start gap-2">
        <span className="text-krds-gray-50 text-xs">대형 (large)</span>
        <Badge variant="primary" size="large">
          처리중
        </Badge>
      </div>
    </div>
  );
}

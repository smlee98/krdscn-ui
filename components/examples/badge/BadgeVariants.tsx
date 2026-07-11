import { Badge } from "@/components/ui/dynamic/badge"

export default function BadgeVariants() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <Badge type="solid">Solid</Badge>
        <Badge type="outline">Outline</Badge>
        <Badge type="pastel">Pastel</Badge>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Badge type="solid" variant="destructive">
          위험
        </Badge>
        <Badge type="solid" variant="warning">
          경고
        </Badge>
        <Badge type="solid" variant="success">
          성공
        </Badge>
        <Badge type="solid" variant="info">
          정보
        </Badge>
      </div>
    </div>
  )
}

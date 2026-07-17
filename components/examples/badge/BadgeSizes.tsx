import { Badge } from "@/registry/krds/ui/badge"

export default function BadgeSizes() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Badge type="solid" size="default">
        중형 (medium)
      </Badge>
      <Badge type="solid" size="lg">
        대형 (large)
      </Badge>
      <Badge type="solid" size="small">
        소형 (small)
      </Badge>
    </div>
  )
}

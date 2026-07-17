import { Badge } from "@/registry/krds/ui/badge"

export default function BadgeRounded() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge type="solid" variant="default">
        primary solid
      </Badge>
      <Badge type="outline" variant="default">
        primary outline
      </Badge>
      <Badge type="pastel" variant="default">
        primary pastel
      </Badge>
      <Badge type="solid" variant="destructive">
        danger solid
      </Badge>
      <Badge type="outline" variant="destructive">
        danger outline
      </Badge>
      <Badge type="pastel" variant="destructive">
        danger pastel
      </Badge>
    </div>
  )
}

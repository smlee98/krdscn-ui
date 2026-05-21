import { Badge } from "@/components/ui/krds/(layout)/badge";

export default function BadgeRounded() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge type="solid" color="primary">
        primary solid
      </Badge>
      <Badge type="outline" color="primary">
        primary outline
      </Badge>
      <Badge type="solid-pastel" color="primary">
        primary pastel
      </Badge>
      <Badge type="solid" color="danger">
        danger solid
      </Badge>
      <Badge type="outline" color="danger">
        danger outline
      </Badge>
      <Badge type="solid-pastel" color="danger">
        danger pastel
      </Badge>
    </div>
  );
}

import { Badge, type BadgeColor } from "@/components/ui/krds/(layout)/badge";

const COLORS: ReadonlyArray<BadgeColor> = [
  "primary",
  "secondary",
  "tertiary",
  "point",
  "danger",
  "warning",
  "success",
  "info"
];

export default function BadgeColors() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        {COLORS.map((color) => (
          <Badge key={`solid-${color}`} type="solid" color={color}>
            {color}
          </Badge>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {COLORS.map((color) => (
          <Badge key={`outline-${color}`} type="outline" color={color}>
            {color}
          </Badge>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {COLORS.map((color) => (
          <Badge key={`pastel-${color}`} type="solid-pastel" color={color}>
            {color}
          </Badge>
        ))}
      </div>
    </div>
  );
}

import { Badge, type BadgeVariant } from "@/components/ui/krds/(layout)/badge";

const VARIANTS: ReadonlyArray<BadgeVariant> = [
  "default",
  "secondary",
  "tertiary",
  "point",
  "destructive",
  "warning",
  "success",
  "info"
];

export default function BadgeColors() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        {VARIANTS.map((variant) => (
          <Badge key={`solid-${variant}`} type="solid" variant={variant}>
            {variant}
          </Badge>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {VARIANTS.map((variant) => (
          <Badge key={`outline-${variant}`} type="outline" variant={variant}>
            {variant}
          </Badge>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {VARIANTS.map((variant) => (
          <Badge key={`pastel-${variant}`} type="pastel" variant={variant}>
            {variant}
          </Badge>
        ))}
      </div>
    </div>
  );
}

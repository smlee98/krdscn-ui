import { Badge } from "@/components/ui/krds/(layout)/badge";

export default function BadgeSizes() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Badge type="solid" size="medium">
        중형 (medium)
      </Badge>
      <Badge type="solid" size="large">
        대형 (large)
      </Badge>
    </div>
  );
}

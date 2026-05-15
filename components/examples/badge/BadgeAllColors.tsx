import { Badge } from "@/components/ui/krds";

const BADGES = [
  { variant: "basic", label: "일반" },
  { variant: "primary", label: "주요" },
  { variant: "secondary", label: "보조" },
  { variant: "success", label: "성공" },
  { variant: "warning", label: "경고" },
  { variant: "danger", label: "위험" },
  { variant: "information", label: "정보" },
  { variant: "point", label: "포인트" },
  { variant: "gray", label: "회색" },
  { variant: "disabled", label: "비활성" }
] as const;

export default function BadgeAllColors() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {BADGES.map(({ variant, label }) => (
          <Badge key={variant} variant={variant} size="medium">
            {label}
          </Badge>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {BADGES.map(({ variant, label }) => (
          <Badge key={variant} variant={variant} size="medium" rounded>
            {label}
          </Badge>
        ))}
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/krds/button";

export default function ButtonSecondary() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="secondary">보조 버튼 (secondary)</Button>
      <Button variant="secondary" size="large">
        크게
      </Button>
      <Button variant="secondary" size="small">
        작게
      </Button>
    </div>
  );
}

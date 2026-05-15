import { Button } from "@/components/ui/krds/button";

export default function ButtonPrimary() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="primary">기본 버튼</Button>
      <Button variant="primary" size="large">
        크게 (large)
      </Button>
      <Button variant="primary" size="small">
        작게 (small)
      </Button>
    </div>
  );
}

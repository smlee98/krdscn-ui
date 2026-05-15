import { Tooltip } from "@/components/ui/krds/tooltip";
import { Button } from "@/components/ui/krds/button";

export default function TooltipPositions() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Tooltip variant="horizontal" text="오른쪽으로 표시 (horizontal)">
        <Button variant="secondary">horizontal</Button>
      </Tooltip>
      <Tooltip variant="vertical" text="위쪽으로 표시 (vertical)">
        <Button variant="secondary">vertical</Button>
      </Tooltip>
      <Tooltip variant="box" text="박스 스타일 — 긴 본문이나 안내문에 적합합니다.">
        <Button variant="secondary">box</Button>
      </Tooltip>
    </div>
  );
}

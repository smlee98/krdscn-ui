import { Tooltip } from "@/components/ui/krds/tooltip";
import { Button } from "@/components/ui/krds/button";

export default function TooltipDefault() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Tooltip text="간단한 안내 메시지">
        <Button variant="secondary">기본 툴팁</Button>
      </Tooltip>
      <Tooltip text="버튼의 동작을 설명합니다.">
        <Button variant="primary">동작 설명</Button>
      </Tooltip>
    </div>
  );
}

import { Tooltip } from "@/components/ui/krds/tooltip";
import { Button } from "@/components/ui/krds/button";

export default function TooltipDisabled() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Tooltip text="비활성 버튼은 클릭할 수 없습니다.">
        <span className="inline-flex">
          <Button variant="primary" disabled>
            비활성 버튼
          </Button>
        </span>
      </Tooltip>
      <Tooltip variant="box" text="권한이 없는 경우 안내 메시지를 함께 노출합니다.">
        <span className="inline-flex">
          <Button variant="secondary" disabled>
            권한 없음
          </Button>
        </span>
      </Tooltip>
    </div>
  );
}

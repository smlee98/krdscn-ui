import { Tooltip } from "@/components/ui/krds/tooltip";
import { Button } from "@/components/ui/krds/button";

export default function TooltipDelayed() {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-krds-gray-50 text-sm">커서를 올리거나 키보드 포커스를 두면 즉시 표시됩니다.</p>
      <div className="flex flex-wrap items-center gap-3">
        <Tooltip variant="box" text="포커스 가능한 버튼에도 동일하게 동작합니다.">
          <Button variant="primary">호버 / 포커스 모두</Button>
        </Tooltip>
        <Tooltip variant="horizontal" text="키보드 Tab 키로 시도해 보세요.">
          <Button variant="secondary">키보드 친화적</Button>
        </Tooltip>
      </div>
    </div>
  );
}

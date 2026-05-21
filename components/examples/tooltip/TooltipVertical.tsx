"use client";
import { Button } from "@/components/ui/krds/(action)/button";
import { Tooltip } from "@/components/ui/krds/(help)/tooltip";

export default function TooltipVertical() {
  return (
    <Tooltip text="세로형 툴팁입니다" variant="vertical">
      <Button variant="primary">세로형 툴팁</Button>
    </Tooltip>
  );
}

"use client";
import { Button } from "@/components/ui/krds/(action)/button";
import { Tooltip } from "@/components/ui/dynamic/tooltip";

export default function TooltipHorizontal() {
  return (
    <Tooltip text="가로형 툴팁입니다" variant="horizontal">
      <Button variant="default">가로형 툴팁</Button>
    </Tooltip>
  );
}

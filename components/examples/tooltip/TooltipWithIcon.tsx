"use client";
import { CircleHelp } from "lucide-react";
import { Tooltip } from "@/components/ui/dynamic/tooltip";

export default function TooltipWithIcon() {
  return (
    <Tooltip text="아이콘과 함께 사용하는 툴팁" variant="vertical">
      <button
        type="button"
        aria-label="도움말"
        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[#33363d] hover:bg-[#f4f5f6] focus-visible:outline-2 focus-visible:outline-[#256ef4] focus-visible:outline-offset-2"
      >
        <CircleHelp className="h-5 w-5" aria-hidden />
      </button>
    </Tooltip>
  );
}

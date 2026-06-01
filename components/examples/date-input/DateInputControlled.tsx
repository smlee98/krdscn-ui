"use client";

import * as React from "react";
import { DateInput } from "@/components/ui/dynamic/date-input";

export default function DateInputControlled() {
  const [value, setValue] = React.useState("2024.12.25");
  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false);

  return (
    <div className="w-[360px]">
      <DateInput
        label="레이블"
        value={value}
        isCalendarOpen={isCalendarOpen}
        onChange={setValue}
        onCalendarOpenChange={setIsCalendarOpen}
      />
      <div className="mt-4 rounded-[4px] bg-krds-surface-subtler p-4 text-krds-body-sm text-krds-foreground">
        입력된 날짜: {value || "없음"}
      </div>
    </div>
  );
}

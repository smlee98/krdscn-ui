"use client";

import * as React from "react";
import { DateInput } from "@/components/ui/krds/date-input";

export default function DateInputRange() {
  const [start, setStart] = React.useState("2026-05-01");
  const [end, setEnd] = React.useState("");

  const startInvalid = Boolean(start) && Boolean(end) && new Date(start) > new Date(end);

  return (
    <div className="flex w-full max-w-xl flex-col gap-4 sm:flex-row sm:items-end">
      <DateInput label="시작일" value={start} onChange={setStart} />
      <span className="text-krds-gray-50 hidden sm:inline">~</span>
      <DateInput
        label="종료일"
        value={end}
        onChange={setEnd}
        error={startInvalid ? "종료일은 시작일 이후여야 합니다." : undefined}
      />
    </div>
  );
}

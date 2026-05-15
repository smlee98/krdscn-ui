"use client";

import * as React from "react";
import { DateInput } from "@/components/ui/krds/date-input";

export default function DateInputDefault() {
  const [value, setValue] = React.useState("");

  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <DateInput
        label="기준일"
        value={value}
        onChange={setValue}
        hint="YYYY-MM-DD 형식으로 입력하거나 달력 아이콘을 누르세요."
      />
    </div>
  );
}

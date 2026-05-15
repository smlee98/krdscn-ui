"use client";

import * as React from "react";
import { DateInput } from "@/components/ui/krds/date-input";

export default function DateInputWithLabel() {
  const [a, setA] = React.useState("2026-03-15");
  const [b, setB] = React.useState("");

  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <DateInput label="작은 입력" size="small" value={a} onChange={setA} hint="작은 폼에 적합한 크기입니다." />
      <DateInput label="큰 입력 (위쪽 달력)" size="large" calendarPosition="top" value={b} onChange={setB} />
    </div>
  );
}

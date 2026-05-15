"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/krds";

export default function CalendarMultiple() {
  const [selected, setSelected] = React.useState("2024.03.15");
  const [rangeStart, setRangeStart] = React.useState("");
  const [rangeEnd, setRangeEnd] = React.useState("");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-krds-gray-70 mb-2 text-sm font-medium">단일 날짜 선택</p>
        <Calendar mode="single" value={selected} onChange={setSelected} />
        {selected && <p className="text-krds-gray-50 mt-2 text-sm">선택: {selected}</p>}
      </div>
      <div>
        <p className="text-krds-gray-70 mb-2 text-sm font-medium">기간 선택</p>
        <Calendar
          mode="range"
          startDate={rangeStart}
          endDate={rangeEnd}
          onRangeChange={(s, e) => {
            setRangeStart(s);
            setRangeEnd(e);
          }}
        />
        {rangeStart && rangeEnd && (
          <p className="text-krds-gray-50 mt-2 text-sm">
            기간: {rangeStart} ~ {rangeEnd}
          </p>
        )}
      </div>
    </div>
  );
}

"use client";

import { DateInput } from "@/components/ui/dynamic/date-input";

export default function DateInputWithDefaultValue() {
  return (
    <div className="w-[360px]">
      <DateInput label="레이블" defaultValue="2024.12.25" />
    </div>
  );
}

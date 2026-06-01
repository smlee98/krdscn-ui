"use client";

import { DateInput } from "@/components/ui/dynamic/date-input";
import { FieldHint } from "@/components/ui/dynamic/field-message";

export default function DateInputWithHint() {
  return (
    <div className="w-[360px]">
      <div className="flex flex-col gap-2">
        <DateInput label="레이블" />
        <FieldHint>도움말</FieldHint>
      </div>
    </div>
  );
}

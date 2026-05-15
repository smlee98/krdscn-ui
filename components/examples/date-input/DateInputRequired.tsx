"use client";

import * as React from "react";
import { DateInput } from "@/components/ui/krds/date-input";
import { Button } from "@/components/ui/krds/button";

export default function DateInputRequired() {
  const [value, setValue] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const showError = submitted && !value;

  return (
    <form
      className="flex w-full max-w-md flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <DateInput
        label="신청일 (필수)"
        required
        value={value}
        onChange={setValue}
        error={showError ? "신청일을 선택해 주세요." : undefined}
        hint={!showError ? "달력에서 날짜를 선택하세요." : undefined}
      />
      <div>
        <Button type="submit" variant="primary" size="medium">
          제출
        </Button>
      </div>
    </form>
  );
}

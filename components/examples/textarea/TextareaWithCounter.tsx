"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/krds/textarea";

export default function TextareaWithCounter() {
  const [value, setValue] = React.useState("");
  const [comment, setComment] = React.useState("");

  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <Textarea
        label="의견 (최대 200자)"
        value={value}
        onChange={setValue}
        maxLength={200}
        showCount
        countTotal={200}
        rows={4}
        placeholder="의견을 자유롭게 작성해 주세요."
      />
      <Textarea
        label="짧은 코멘트"
        value={comment}
        onChange={setComment}
        showCount
        countTotal={80}
        rows={3}
        placeholder="80자 이내로 입력해 주세요."
      />
    </div>
  );
}

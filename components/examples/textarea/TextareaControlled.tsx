"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/krds/(input)/textarea";
import { Button } from "@/components/ui/krds/(action)/button";

export default function TextareaControlled() {
  const [value, setValue] = React.useState("제어된 컴포넌트");
  return (
    <div className="flex w-[360px] flex-col gap-4">
      <Textarea label="제어된 Textarea" value={value} onChange={setValue} maxLength={100} />
      <p className="text-[15px] text-[#1e2124]">{value.length}자 입력됨</p>
      <Button variant="default" onClick={() => setValue("")}>
        텍스트 초기화
      </Button>
    </div>
  );
}

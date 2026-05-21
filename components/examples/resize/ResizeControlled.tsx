"use client";

import * as React from "react";
import { Resize } from "@/components/ui/krds/(settings)/resize";
import type { ResizeScale } from "@/components/ui/krds/(settings)/resize";

export default function ResizeControlled() {
  const [value, setValue] = React.useState<ResizeScale>("md");

  return (
    <div className="w-full max-w-md py-12 flex flex-col gap-4">
      <p>
        현재 선택된 크기: <strong>{value}</strong>
      </p>
      <Resize value={value} onChange={setValue} buttonText="화면크기" resetText="초기화" />
    </div>
  );
}

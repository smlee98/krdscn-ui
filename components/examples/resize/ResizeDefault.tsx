"use client";

import { Resize } from "@/components/ui/dynamic/resize";

export default function ResizeDefault() {
  return (
    <div className="w-full max-w-md py-12">
      <Resize
        defaultValue="md"
        buttonText="화면크기"
        resetText="초기화"
        onChange={(scale) => console.log("scale:", scale)}
      />
    </div>
  );
}

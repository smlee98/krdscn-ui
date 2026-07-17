"use client"

import * as React from "react"
import { Resize } from "@/components/ui/dynamic/resize"
import type { ResizeScale } from "@/components/ui/dynamic/resize"

export default function ResizeControlled() {
  const [value, setValue] = React.useState<ResizeScale>("md")

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-4 py-12">
      <p>
        현재 선택된 크기: <strong>{value}</strong>
      </p>
      <Resize value={value} onChange={setValue} buttonText="화면크기" resetText="초기화" />
    </div>
  )
}

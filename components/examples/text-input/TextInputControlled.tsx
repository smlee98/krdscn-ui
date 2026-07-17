"use client"

import * as React from "react"
import { TextInput } from "@/registry/krds/ui/text-input"
import { FieldHint } from "@/registry/krds/ui/field-message"

export default function TextInputControlled() {
  const [value, setValue] = React.useState("제어된 입력")

  return (
    <div className="w-full max-w-[400px]">
      <div className="flex w-full flex-col gap-2">
        <TextInput label="제어된 컴포넌트" placeholder="플레이스홀더" value={value} onChange={setValue} />
        <FieldHint>{`현재 값: ${value}`}</FieldHint>
      </div>
    </div>
  )
}

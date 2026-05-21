"use client";

import * as React from "react";
import { TextInput } from "@/components/ui/krds/(input)/text-input";

export default function TextInputControlled() {
  const [value, setValue] = React.useState("제어된 입력");

  return (
    <div className="w-full max-w-[400px]">
      <TextInput
        label="제어된 컴포넌트"
        placeholder="플레이스홀더"
        value={value}
        onChange={setValue}
        hint={`현재 값: ${value}`}
      />
    </div>
  );
}

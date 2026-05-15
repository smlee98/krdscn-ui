"use client";

import * as React from "react";
import { Checkbox } from "@/components/ui/krds/checkbox";

const items = ["전기 사용 동의", "가스 사용 동의", "수도 사용 동의"] as const;

export default function CheckboxIndeterminate() {
  const [checked, setChecked] = React.useState<Record<string, boolean>>({
    "전기 사용 동의": true,
    "가스 사용 동의": false,
    "수도 사용 동의": false
  });

  const allChecked = items.every((item) => checked[item]);

  const handleAll = (value: boolean) => setChecked(Object.fromEntries(items.map((item) => [item, value])));

  return (
    <div className="flex flex-col gap-3">
      <Checkbox label="전체 동의" size="large" checked={allChecked} onChange={handleAll} />
      <div className="border-krds-gray-20 flex flex-col gap-2 border-t pt-3 pl-3">
        {items.map((item) => (
          <Checkbox
            key={item}
            label={item}
            checked={checked[item]}
            onChange={(v) => setChecked((prev) => ({ ...prev, [item]: v }))}
          />
        ))}
      </div>
    </div>
  );
}

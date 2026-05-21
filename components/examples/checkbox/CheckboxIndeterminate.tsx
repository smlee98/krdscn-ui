"use client";

import * as React from "react";
import { Checkbox, CheckboxGroup } from "@/components/ui/krds/(selection)/checkbox";

const items = ["전기 사용 동의", "가스 사용 동의", "수도 사용 동의"] as const;

export default function CheckboxIndeterminate() {
  const [checked, setChecked] = React.useState<Record<string, boolean>>({
    "전기 사용 동의": true,
    "가스 사용 동의": false,
    "수도 사용 동의": false
  });

  const checkedCount = items.filter((item) => checked[item]).length;
  const allChecked = checkedCount === items.length;
  const isIndeterminate = checkedCount > 0 && checkedCount < items.length;

  const handleAll = (value: boolean) => setChecked(Object.fromEntries(items.map((item) => [item, value])));

  return (
    <div className="flex flex-col gap-3">
      <Checkbox
        size="large"
        label="전체 동의"
        checked={allChecked}
        indeterminate={isIndeterminate}
        onChange={handleAll}
      />
      <CheckboxGroup column className="border-krds-gray-20 border-t pt-3 pl-3">
        {items.map((item) => (
          <Checkbox
            key={item}
            label={item}
            checked={checked[item]}
            onChange={(v) => setChecked((prev) => ({ ...prev, [item]: v }))}
          />
        ))}
      </CheckboxGroup>
    </div>
  );
}

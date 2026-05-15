"use client";

import * as React from "react";
import { Checkbox, CheckboxChip, CheckboxGroup as KrdsCheckboxGroup } from "@/components/ui/krds/checkbox";

const interests = ["정책", "복지", "교육", "환경", "문화"];

export default function CheckboxGroup() {
  const [selected, setSelected] = React.useState<string[]>(["정책"]);

  const toggle = (name: string) =>
    setSelected((prev) => (prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]));

  return (
    <div className="flex flex-col gap-6">
      <KrdsCheckboxGroup column>
        <Checkbox label="공지사항 알림" defaultValue />
        <Checkbox label="민원 처리 결과 알림" defaultValue />
        <Checkbox label="이벤트 안내" />
      </KrdsCheckboxGroup>
      <KrdsCheckboxGroup>
        {interests.map((name) => (
          <CheckboxChip key={name} checked={selected.includes(name)} onChange={() => toggle(name)}>
            {name}
          </CheckboxChip>
        ))}
      </KrdsCheckboxGroup>
      <p className="text-krds-gray-70 text-sm">관심 분야: {selected.join(", ") || "없음"}</p>
    </div>
  );
}

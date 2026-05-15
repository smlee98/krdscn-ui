"use client";

import * as React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/krds/select";

const departments = [
  { value: "policy", label: "정책기획팀" },
  { value: "service", label: "대국민서비스팀" },
  { value: "data", label: "데이터분석팀" },
  { value: "design", label: "디자인시스템팀" },
  { value: "ops", label: "운영지원팀" }
];

export default function SelectWithSearch() {
  const [value, setValue] = React.useState<string>("");

  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <label className="text-krds-gray-90 text-sm font-medium">담당 부서</label>
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger>
          <SelectValue placeholder="부서를 선택하세요" />
        </SelectTrigger>
        <SelectContent>
          {departments.map((d) => (
            <SelectItem key={d.value} value={d.value}>
              {d.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-krds-gray-50 text-xs">선택: {value || "없음"}</p>
    </div>
  );
}

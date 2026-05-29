"use client";

import * as React from "react";
import { Select } from "@/components/ui/dynamic/select";
import { FieldHint } from "@/components/ui/krds/(input)/field-message";

const options = [
  { value: "option1", label: "항목1" },
  { value: "option2", label: "항목2" },
  { value: "option3", label: "항목3" },
  { value: "option4", label: "항목4" }
];

const sortOptions = [
  { value: "option1", label: "최신순" },
  { value: "option2", label: "인기순" },
  { value: "option3", label: "이름순" }
];

const sortLabel: Record<string, string> = {
  option1: "최신순",
  option2: "인기순",
  option3: "이름순"
};

export default function SelectControlled() {
  const [selected, setSelected] = React.useState("option2");
  const [sortBy, setSortBy] = React.useState("option1");

  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <div className="flex w-full flex-col gap-2">
        <Select options={options} label="제어 Select" value={selected} onChange={setSelected} />
        <FieldHint>현재 선택된 값: {selected}</FieldHint>
      </div>
      <div className="flex flex-col gap-2">
        <Select options={sortOptions} variant="sorting" size="medium" value={sortBy} onChange={setSortBy} />
        <p className="text-krds-gray-70 text-sm">정렬 기준: {sortLabel[sortBy]}</p>
      </div>
    </div>
  );
}

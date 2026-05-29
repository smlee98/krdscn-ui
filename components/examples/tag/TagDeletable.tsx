"use client";

import * as React from "react";
import { Tag, TagDelete } from "@/components/ui/dynamic/tag";

export default function TagDeletable() {
  const [tags, setTags] = React.useState(["서울", "경기", "부산", "대전", "광주"]);

  return (
    <div className="flex flex-wrap items-center gap-2">
      {tags.map((label) => (
        <Tag key={label}>
          {label}
          <TagDelete onClick={() => setTags((prev) => prev.filter((t) => t !== label))} />
        </Tag>
      ))}
      {tags.length === 0 && <span className="text-krds-gray-50 text-sm">선택된 지역이 없습니다.</span>}
    </div>
  );
}

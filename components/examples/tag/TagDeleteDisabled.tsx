"use client";

import { Tag, TagDelete } from "@/components/ui/dynamic/tag";

export default function TagDeleteDisabled() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Tag>
        서울
        <TagDelete disabled />
      </Tag>
      <Tag>
        경기
        <TagDelete disabled />
      </Tag>
      <Tag>
        부산
        <TagDelete disabled />
      </Tag>
    </div>
  );
}

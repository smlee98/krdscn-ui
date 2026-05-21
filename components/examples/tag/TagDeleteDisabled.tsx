"use client";

import { Tag } from "@/components/ui/krds/(selection)/tag";

export default function TagDeleteDisabled() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Tag onDelete={() => undefined} deleteDisabled>서울</Tag>
      <Tag onDelete={() => undefined} deleteDisabled>경기</Tag>
      <Tag onDelete={() => undefined} deleteDisabled>부산</Tag>
    </div>
  );
}

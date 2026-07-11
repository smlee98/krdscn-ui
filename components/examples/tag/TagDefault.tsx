import { Tag } from "@/components/ui/dynamic/tag"

export default function TagDefault() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Tag>일반</Tag>
      <Tag>공지</Tag>
      <Tag>안내</Tag>
      <Tag>업데이트</Tag>
      <Tag>긴급</Tag>
    </div>
  )
}

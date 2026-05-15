import { Tag } from "@/components/ui/krds/tag";

export default function TagSizes() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Tag size="small">small</Tag>
        <Tag size="medium">medium</Tag>
        <Tag size="large">large</Tag>
      </div>
      <div className="flex items-center gap-2">
        <Tag size="small" onDelete={() => undefined}>
          small 삭제
        </Tag>
        <Tag size="medium" onDelete={() => undefined}>
          medium 삭제
        </Tag>
        <Tag size="large" onDelete={() => undefined}>
          large 삭제
        </Tag>
      </div>
    </div>
  );
}

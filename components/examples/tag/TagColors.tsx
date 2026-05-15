import { Tag } from "@/components/ui/krds/tag";

export default function TagColors() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Tag variant="link" href="#announcement">
        공지 (링크)
      </Tag>
      <Tag variant="link" href="#policy" size="large">
        정책 변경
      </Tag>
      <Tag onDelete={() => undefined} className="bg-krds-primary-5 border-krds-primary-50 text-krds-primary-50">
        선택됨
      </Tag>
      <Tag deleteDisabled onDelete={() => undefined}>
        고정
      </Tag>
    </div>
  );
}

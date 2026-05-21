import { Tag } from "@/components/ui/krds/(selection)/tag";

export default function TagLink() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Tag variant="link" href="#">공지사항</Tag>
      <Tag variant="link" href="#">정책</Tag>
      <Tag variant="link" href="#">보도자료</Tag>
      <Tag variant="link" href="#">뉴스레터</Tag>
      <Tag variant="link" href="#">안내</Tag>
    </div>
  );
}

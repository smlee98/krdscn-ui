import { Tag } from "@/components/ui/dynamic/tag"

export default function TagLinkTag() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Tag variant="link" href="#">
        #태그
      </Tag>
      <Tag variant="link" href="#">
        #정부
      </Tag>
      <Tag variant="link" href="#">
        #안내
      </Tag>
      <Tag variant="link" href="#">
        #공지
      </Tag>
      <Tag variant="link" href="#">
        #정책
      </Tag>
    </div>
  )
}

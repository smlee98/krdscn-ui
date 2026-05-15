import { Link } from "@/components/ui/krds/link";

export default function LinkDefault() {
  return (
    <div className="flex flex-col gap-4">
      <Link href="/components/link">링크 기본 스타일 (default)</Link>
      <Link href="/components/link" underline="hover">
        hover 시 밑줄 표시
      </Link>
      <Link href="/components/link" underline="none">
        밑줄 없음
      </Link>
      <Link href="/components/link" variant="basic">
        basic variant (회색 계열)
      </Link>
    </div>
  );
}

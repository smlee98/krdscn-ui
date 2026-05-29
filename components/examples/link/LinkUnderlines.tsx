import { Link } from "@/components/ui/dynamic/link";

export default function LinkUnderlines() {
  return (
    <div className="flex flex-col items-start gap-4">
      <Link href="#" type="default">
        항상 밑줄 표시
      </Link>
      <Link href="#" type="subtle">
        호버 시에만 밑줄 표시
      </Link>
      <Link href="#" type="subtle_none">
        밑줄 없음
      </Link>
    </div>
  );
}

import { Link } from "@/components/ui/krds/(action)/link";

export default function LinkUnderlines() {
  return (
    <div className="flex flex-col items-start gap-4">
      <Link href="#" underline="always">
        항상 밑줄 표시
      </Link>
      <Link href="#" underline="hover">
        호버 시에만 밑줄 표시
      </Link>
      <Link href="#" underline="none">
        밑줄 없음
      </Link>
    </div>
  );
}

import { Link } from "@/components/ui/krds/(action)/link";

export default function LinkSizes() {
  return (
    <div className="flex flex-col items-start gap-4">
      <Link size="small" href="#">
        Small 크기 (15px)
      </Link>
      <Link size="medium" href="#">
        Medium 크기 (17px)
      </Link>
      <Link size="large" href="#">
        Large 크기 (19px)
      </Link>
    </div>
  );
}

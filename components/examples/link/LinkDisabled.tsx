import { Link } from "@/components/ui/krds/link";

export default function LinkDisabled() {
  return (
    <div className="flex flex-col gap-4">
      <Link disabled>비활성 링크 — default variant</Link>
      <Link variant="basic" disabled>
        비활성 링크 — basic variant
      </Link>
      <Link href="/unreachable" disabled>
        비활성 링크 — href 있지만 클릭 불가
      </Link>
    </div>
  );
}

import { ArrowRightIcon, ChevronRightIcon } from "lucide-react";

import { Link } from "@/components/ui/dynamic/link";

export default function LinkWithIcons() {
  return (
    <div className="flex flex-col items-start gap-4">
      <Link href="#" external>
        <span className="translate-y-px">기본 외부 링크 아이콘</span>
        <ArrowRightIcon className="size-5" aria-hidden />
      </Link>
      <Link href="#">
        <span className="translate-y-px">내부 링크</span>
        <ChevronRightIcon className="size-5" aria-hidden />
      </Link>
    </div>
  );
}

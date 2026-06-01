import { ArrowRightIcon, ChevronRightIcon } from "lucide-react";

import { Link } from "@/components/ui/dynamic/link";

export default function LinkWithIcons() {
  return (
    <div className="flex flex-col items-start gap-4">
      <Link href="#" external>
        기본 외부 링크 아이콘
        <ArrowRightIcon className="size-5" aria-hidden />
      </Link>
      <Link href="#">
        내부 링크
        <ChevronRightIcon className="size-5" aria-hidden />
      </Link>
    </div>
  );
}

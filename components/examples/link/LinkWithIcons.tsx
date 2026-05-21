import { ArrowRightIcon, ChevronRightIcon } from "lucide-react";

import { Link } from "@/components/ui/krds/(action)/link";

export default function LinkWithIcons() {
  return (
    <div className="flex flex-col items-start gap-4">
      <Link href="#" external icon={<ArrowRightIcon className="size-full" />}>
        기본 외부 링크 아이콘
      </Link>
      <Link href="#" icon={<ChevronRightIcon className="size-full" />}>
        내부 링크
      </Link>
    </div>
  );
}

import { ArrowRightIcon, ExternalLinkIcon } from "lucide-react";

import { Link } from "@/components/ui/krds/link";

export default function LinkWithIcon() {
  return (
    <div className="flex flex-col gap-4">
      <Link href="/components/button" icon={<ArrowRightIcon className="size-3.5" />}>
        버튼 컴포넌트 보기
      </Link>
      <Link
        href="https://www.korea.go.kr"
        external
        variant="basic"
        icon={<ExternalLinkIcon className="size-3.5" />}
        size="small"
      >
        외부 사이트 바로가기
      </Link>
      <Link href="/components/link" underline="hover" size="large" icon={<ArrowRightIcon className="size-4" />}>
        크게 표시 (large)
      </Link>
    </div>
  );
}

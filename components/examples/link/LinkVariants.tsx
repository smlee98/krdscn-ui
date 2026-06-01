import { ArrowRightIcon } from "lucide-react";

import { Link } from "@/components/ui/dynamic/link";

export default function LinkVariants() {
  return (
    <div className="flex flex-col items-start gap-4">
      <Link size="sm" href="#">
        기본 링크
        <ArrowRightIcon className="size-4" aria-hidden />
      </Link>
      <Link size="default" href="#" preserveColorOnHover>
        가상클래스 상태 시 컬러 유지
      </Link>
      <Link size="lg" type="subtle" href="#">
        본문 텍스트 컬러 링크
        <ArrowRightIcon className="size-6" aria-hidden />
      </Link>
      <Link size="lg" type="subtle" href="#">
        가상클래스 상태 시 밑줄
      </Link>
      <Link size="lg" type="subtle_none" href="#">
        밑줄 없음
      </Link>
    </div>
  );
}

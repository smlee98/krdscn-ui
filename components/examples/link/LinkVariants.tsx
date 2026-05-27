import { ArrowRightIcon } from "lucide-react";

import { Link } from "@/components/ui/krds/(action)/link";

export default function LinkVariants() {
  return (
    <div className="flex flex-col items-start gap-4">
      <Link size="small" href="#">
        <span className="translate-y-px">기본 링크</span>
        <ArrowRightIcon className="size-4" aria-hidden />
      </Link>
      <Link size="medium" href="#" preserveColorOnHover>
        가상클래스 상태 시 컬러 유지
      </Link>
      <Link size="large" variant="basic" href="#">
        <span className="translate-y-px">본문 텍스트 컬러 링크</span>
        <ArrowRightIcon className="size-6" aria-hidden />
      </Link>
      <Link size="large" variant="basic" href="#" underline="hover">
        가상클래스 상태 시 밑줄
      </Link>
      <Link size="large" variant="basic" href="#" underline="none">
        밑줄 없음
      </Link>
    </div>
  );
}

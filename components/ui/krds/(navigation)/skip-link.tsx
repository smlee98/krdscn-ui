// rsc:safe
import * as React from "react";
import { cn } from "@/lib/cn";

type SkipLinkProps = {
  className?: string;
  href?: string;
  children?: React.ReactNode;
};

function SkipLink({ className, href = "#main-content", children = "본문 바로가기" }: SkipLinkProps) {
  return (
    <a
      data-slot="krds-skip-link"
      href={href}
      className={cn(
        "flex h-8 w-full items-center justify-center",
        "bg-krds-surface-inverse text-krds-foreground-inverse text-krds-body-sm",
        "no-underline",
        // KRDS 원본(#krds-skip-link a:focus)은 outward 링 대신 inset 2px primary 링을 쓴다.
        // 화면 밖→포커스 시 상단 고정 노출되므로 outward 4px 링은 뷰포트 경계에서 잘림 → inset 사용.
        // KRDS 공식 inset 링(offset -4, inset 2px)으로 통일. forced-colors 모드는 outline이 시스템 색으로 표시.
        "focus:krds-focus-ring-inset",
        className
      )}
    >
      {children}
    </a>
  );
}

export { SkipLink };

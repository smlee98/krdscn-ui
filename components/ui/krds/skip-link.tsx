// rsc:safe
import type { AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface SkipLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** 건너뛸 본문 컨테이너의 id (기본: "main") */
  targetId?: string;
  children?: React.ReactNode;
  className?: string;
}

function SkipLink({ targetId = "main", children = "본문 바로가기", className, href, ...rest }: SkipLinkProps) {
  return (
    <a
      href={href ?? `#${targetId}`}
      className={cn(
        // 숨김 상태 — 스크린리더·포커스 전까지 보이지 않음
        "sr-only",
        // 포커스 시 가시화 (WAI Skip Navigation 패턴)
        "focus:not-sr-only",
        "focus:absolute focus:top-3 focus:left-3 focus:z-50",
        "focus:inline-flex focus:items-center focus:gap-1",
        "focus:rounded focus:px-4 focus:py-2",
        "focus:bg-krds-primary-50 focus:text-krds-gray-0",
        "focus:text-sm focus:leading-none focus:font-medium",
        "focus:ring-krds-primary-90 focus:ring-2 focus:ring-offset-2 focus:outline-none",
        className
      )}
      {...rest}
    >
      {children}
    </a>
  );
}

export { SkipLink };

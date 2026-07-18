// rsc:safe
import * as React from "react"
import { cn } from "@/lib/utils"

type SkipLinkProps = {
  className?: string
  href?: string
  children?: React.ReactNode
}

function SkipLink({ className, href = "#main-content", children = "본문 바로가기" }: SkipLinkProps) {
  return (
    <a
      data-slot="krds-skip-link"
      href={href}
      className={cn(
        // 상시 노출: 검정 배경(surface-inverse) + 흰 텍스트(foreground-inverse) 풀폭 바.
        // sr-only 로 숨겼다 포커스 시 노출하는 표준 패턴이 아니라, 항상 보이는 컴포넌트다.
        "flex h-8 w-full items-center justify-center",
        "bg-krds-surface-inverse text-krds-foreground-inverse text-krds-body-sm",
        "no-underline",
        // KRDS 공식 inset 링(offset -4, inset 2px). forced-colors 모드는 outline이 시스템 색으로 표시.
        "focus-visible:krds-focus-ring-inset",
        className
      )}
    >
      {children}
    </a>
  )
}

export { SkipLink }

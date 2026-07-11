// rsc:client
"use client"

import { useContext } from "react"

import { Button } from "@/components/ui/button"
import { UISystemContext, useUISystem } from "@/lib/ui-system"
import { KrdsLogo } from "@/components/logo/krds"
import { ShadcnLogo } from "@/components/logo/shadcn"

export { UISystemToggle }

// 컴포넌트 디스패치(krdscn/ui ↔ shadcn/ui)만 전환한다.
// 라이트/다크 테마는 ModeToggle(next-themes)이 별도로 처리한다.
// 테마 토글처럼 단일 버튼: 현재 시스템 로고를 표시하고 클릭하면 반대 시스템으로 전환.
function UISystemToggle() {
  const system = useUISystem()
  const { setSystem } = useContext(UISystemContext)

  const label = system === "krds" ? "krdscn/ui" : "shadcn/ui"

  return (
    <Button
      type="button"
      variant="outline"
      size="icon-sm"
      onClick={() => setSystem(system === "krds" ? "shadcn" : "krds")}
      aria-label={`UI 시스템: ${label} (클릭하여 전환)`}
      title={label}
      data-slot="krds-ui-system-toggle"
    >
      {system === "krds" ? <KrdsLogo className="size-4" /> : <ShadcnLogo className="size-4" />}
      <span className="sr-only">UI 시스템 전환 (현재: {label})</span>
    </Button>
  )
}

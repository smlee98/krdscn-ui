"use client";

import * as React from "react";

import { cn } from "@/lib/cn";
import { useUISystem } from "@/lib/ui-system";
import {
  Identifier as KrdsIdentifier,
  KrdsIdentifierLogo,
  type IdentifierProps
} from "@/components/ui/krds/(identity)/identifier";

export type { IdentifierProps } from "@/components/ui/krds/(identity)/identifier";

// Dual-render dispatcher. identifier had no dispatcher, so the example imported the
// KRDS component directly and rendered KRDS government chrome (bg-krds-gray-0 bar,
// krds-gray-90 text) in BOTH systems. shadcn has no identifier primitive. Per the
// project rule the brand logo mark itself is kept (the user explicitly wants the
// SVG reused), but the surrounding banner is "applied" to shadcn: a muted card-like
// strip with shadcn tokens (bg-muted / border / muted-foreground), a divider before
// the notice, and shadcn typography — so it reads as a shadcn-styled identifier
// rather than the KRDS gray government bar. The logo's fixed brand fills are left
// intact (it is a logo, not chrome).

function ShadcnIdentifier({ className, notice = "이 누리집은 정부 산하기관 누리집입니다." }: IdentifierProps) {
  return (
    <div
      data-slot="shadcn-identifier"
      role="contentinfo"
      className={cn(
        "bg-muted text-muted-foreground flex w-full items-center gap-3 rounded-md border px-4 py-2.5 text-sm leading-none",
        className
      )}
    >
      <KrdsIdentifierLogo className="h-6 w-[77px] shrink-0" aria-label="KRDS" />
      <span className="bg-border h-4 w-px shrink-0" aria-hidden />
      <p className="truncate">{notice}</p>
    </div>
  );
}

function Identifier(props: IdentifierProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsIdentifier {...props} />;
  return <ShadcnIdentifier {...props} />;
}

export { Identifier };

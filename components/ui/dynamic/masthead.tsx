"use client";

import type * as React from "react";
import { Masthead as KrdsMasthead, KoreanFlagIcon } from "@/components/ui/krds/(identity)/masthead";
import { cn } from "@/lib/cn";
import { useUISystem } from "@/lib/ui-system";

type MastheadProps = React.ComponentProps<typeof KrdsMasthead>;

// Dual-render dispatcher. shadcn has no Masthead equivalent (Korean government
// identity bar). The shadcn branch degrades the bar to a minimal neutral banner
// built from shadcn tokens (bg-muted / text-muted-foreground), but — per the user's
// request — the colored Korean-flag (태극기) SVG is KEPT in both modes (reused from
// the KRDS file as a single source). Only the krds-* color/size chrome around it is
// retokenized.

function ShadcnMasthead({ className, notice = "이 누리집은 대한민국 공식 전자정부 누리집입니다." }: MastheadProps) {
  return (
    <div
      data-slot="masthead"
      role="banner"
      className={cn(
        "bg-muted text-muted-foreground flex h-8 w-full items-center gap-2 px-6 text-xs leading-none",
        className
      )}
    >
      <KoreanFlagIcon className="h-4 w-6 shrink-0" />
      <p className="whitespace-nowrap">{notice}</p>
    </div>
  );
}

export function Masthead(props: MastheadProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsMasthead {...props} />;
  return <ShadcnMasthead {...props} />;
}

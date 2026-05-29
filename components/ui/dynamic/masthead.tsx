"use client";

import type * as React from "react";
import { Landmark } from "lucide-react";
import { Masthead as KrdsMasthead } from "@/components/ui/krds/(identity)/masthead";
import { cn } from "@/lib/cn";
import { useUISystem } from "@/lib/ui-system";

type MastheadProps = React.ComponentProps<typeof KrdsMasthead>;

// Dual-render dispatcher. shadcn has no Masthead equivalent (Korean government
// identity bar), so the shadcn branch degrades to a minimal neutral banner built
// from shadcn tokens (bg-muted / text-muted-foreground). The KRDS-only chrome —
// the colored Korean-flag SVG and krds-* color/size tokens — is intentionally
// dropped; the government notice text is preserved with a neutral lucide icon.

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
      <Landmark className="size-3.5 shrink-0" aria-hidden="true" />
      <p className="translate-y-px whitespace-nowrap">{notice}</p>
    </div>
  );
}

export function Masthead(props: MastheadProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsMasthead {...props} />;
  return <ShadcnMasthead {...props} />;
}

"use client";

import * as React from "react";

import {
  Carousel as KrdsCarousel,
  CarouselArrow as KrdsCarouselArrow,
  CarouselContent as KrdsCarouselContent,
  CarouselDots as KrdsCarouselDots,
  CarouselItem as KrdsCarouselItem,
  CarouselNext as KrdsCarouselNext,
  CarouselNumber as KrdsCarouselNumber,
  CarouselPlayPause as KrdsCarouselPlayPause,
  CarouselPrevious as KrdsCarouselPrevious,
  useKrdsCarousel
} from "@/components/ui/krds/(layout)/carousel";
import type {
  CarouselArrowProps,
  CarouselDotsProps,
  CarouselNumberProps,
  CarouselPlayPauseProps,
  CarouselProps
} from "@/components/ui/krds/(layout)/carousel";
import {
  Carousel as ShadcnCarousel,
  CarouselContent as ShadcnCarouselContent,
  CarouselItem as ShadcnCarouselItem,
  CarouselNext as ShadcnCarouselNext,
  CarouselPrevious as ShadcnCarouselPrevious
} from "@/components/ui/carousel";
import { useUISystem } from "@/lib/ui-system";

export type {
  CarouselProps,
  CarouselArrowProps,
  CarouselArrowSize,
  CarouselNumberProps,
  CarouselDotsProps,
  CarouselPlayPauseProps,
  CarouselApi
} from "@/components/ui/krds/(layout)/carousel";

export { useKrdsCarousel };

// Dual-render dispatcher (template: dynamic/accordion.tsx, dynamic/modal.tsx). The
// public surface is the KRDS Carousel compound API; each part renders either the
// KRDS-chromed wrapper or the vanilla shadcn Carousel primitive based on
// <UISystemProvider>.
//
// shadcn-mode mapping (KRDS API → shadcn Carousel anatomy):
//   Carousel        → ShadcnCarousel        (Embla root; opts/plugins/orientation/setApi pass through)
//   CarouselContent → ShadcnCarouselContent
//   CarouselItem    → ShadcnCarouselItem
//   CarouselArrow   → ShadcnCarouselPrevious | ShadcnCarouselNext (by `direction`)
//   CarouselPrevious→ ShadcnCarouselPrevious
//   CarouselNext    → ShadcnCarouselNext
//
// Dropped in shadcn mode (no vanilla equivalent — KRDS-only chrome):
//   CarouselNumber    → null   (fraction badge; shadcn has no indicator)
//   CarouselDots      → null   (dot/tablist indicator; shadcn has no indicator)
//   CarouselPlayPause → null   (autoplay control; shadcn has no autoplay chrome)
//
// Dropped KRDS-only props on the shadcn arrows: `size` ("xsmall"|"small"|"medium"
// |"large") — vanilla arrows derive sizing from Button, not the KRDS arrow scale.

// ─── Dispatched parts (public surface preserved) ────────────────────────────────

export function Carousel(props: CarouselProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsCarousel {...props} />;
  return <ShadcnCarousel {...props} />;
}

export function CarouselContent(props: React.ComponentProps<typeof KrdsCarouselContent>) {
  const system = useUISystem();
  if (system === "krds") return <KrdsCarouselContent {...props} />;
  return <ShadcnCarouselContent {...props} />;
}

export function CarouselItem(props: React.ComponentProps<typeof KrdsCarouselItem>) {
  const system = useUISystem();
  if (system === "krds") return <KrdsCarouselItem {...props} />;
  return <ShadcnCarouselItem {...props} />;
}

export function CarouselArrow(props: CarouselArrowProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsCarouselArrow {...props} />;
  const { direction, size: _size, className, ...rest } = props;
  const ShadcnArrow = direction === "previous" ? ShadcnCarouselPrevious : ShadcnCarouselNext;
  return <ShadcnArrow className={className} {...(rest as React.ComponentProps<typeof ShadcnArrow>)} />;
}

export function CarouselPrevious(props: Omit<CarouselArrowProps, "direction">) {
  const system = useUISystem();
  if (system === "krds") return <KrdsCarouselPrevious {...props} />;
  const { size: _size, className, ...rest } = props;
  return (
    <ShadcnCarouselPrevious className={className} {...(rest as React.ComponentProps<typeof ShadcnCarouselPrevious>)} />
  );
}

export function CarouselNext(props: Omit<CarouselArrowProps, "direction">) {
  const system = useUISystem();
  if (system === "krds") return <KrdsCarouselNext {...props} />;
  const { size: _size, className, ...rest } = props;
  return <ShadcnCarouselNext className={className} {...(rest as React.ComponentProps<typeof ShadcnCarouselNext>)} />;
}

export function CarouselNumber(props: CarouselNumberProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsCarouselNumber {...props} />;
  // shadcn has no fraction/number indicator — KRDS-only chrome, dropped.
  return null;
}

export function CarouselDots(props: CarouselDotsProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsCarouselDots {...props} />;
  // shadcn has no dot/tablist indicator — KRDS-only chrome, dropped.
  return null;
}

export function CarouselPlayPause(props: CarouselPlayPauseProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsCarouselPlayPause {...props} />;
  // shadcn has no autoplay control — KRDS-only chrome, dropped.
  return null;
}

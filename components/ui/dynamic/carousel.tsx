"use client";

import type * as React from "react";
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

// KRDS Carousel already composes shadcn's Carousel primitive (via embla)
// and layers KRDS-styled arrows/dots/number/play-pause on top. There is no
// separate "plain shadcn" carousel in the design system, so render KRDS
// regardless of active UI system.
export function Carousel(props: React.ComponentProps<typeof KrdsCarousel>) {
  return <KrdsCarousel {...props} />;
}

export function CarouselContent(props: React.ComponentProps<typeof KrdsCarouselContent>) {
  return <KrdsCarouselContent {...props} />;
}

export function CarouselItem(props: React.ComponentProps<typeof KrdsCarouselItem>) {
  return <KrdsCarouselItem {...props} />;
}

export function CarouselArrow(props: React.ComponentProps<typeof KrdsCarouselArrow>) {
  return <KrdsCarouselArrow {...props} />;
}

export function CarouselPrevious(props: React.ComponentProps<typeof KrdsCarouselPrevious>) {
  return <KrdsCarouselPrevious {...props} />;
}

export function CarouselNext(props: React.ComponentProps<typeof KrdsCarouselNext>) {
  return <KrdsCarouselNext {...props} />;
}

export function CarouselNumber(props: React.ComponentProps<typeof KrdsCarouselNumber>) {
  return <KrdsCarouselNumber {...props} />;
}

export function CarouselDots(props: React.ComponentProps<typeof KrdsCarouselDots>) {
  return <KrdsCarouselDots {...props} />;
}

export function CarouselPlayPause(props: React.ComponentProps<typeof KrdsCarouselPlayPause>) {
  return <KrdsCarouselPlayPause {...props} />;
}

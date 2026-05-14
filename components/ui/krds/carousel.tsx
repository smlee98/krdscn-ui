/** KRDS Carousel compound wrapper — composes @/components/ui/carousel */
"use client";

import * as React from "react";
import {
  Carousel as ShadcnCarousel,
  CarouselContent as ShadcnCarouselContent,
  CarouselItem as ShadcnCarouselItem,
  CarouselPrevious as ShadcnCarouselPrevious,
  CarouselNext as ShadcnCarouselNext,
} from "@/components/ui/carousel";
import { cn } from "@/lib/cn";

function Carousel({ className, ...props }: React.ComponentProps<typeof ShadcnCarousel>) {
  return <ShadcnCarousel data-slot="krds-carousel" className={cn("", className)} {...props} />;
}

function CarouselContent({ className, ...props }: React.ComponentProps<typeof ShadcnCarouselContent>) {
  return <ShadcnCarouselContent data-slot="krds-carousel-content" className={cn("", className)} {...props} />;
}

function CarouselItem({ className, ...props }: React.ComponentProps<typeof ShadcnCarouselItem>) {
  return <ShadcnCarouselItem data-slot="krds-carousel-item" className={cn("", className)} {...props} />;
}

function CarouselPrevious({ className, ...props }: React.ComponentProps<typeof ShadcnCarouselPrevious>) {
  return (
    <ShadcnCarouselPrevious
      data-slot="krds-carousel-previous"
      className={cn(
        "text-krds-gray-90 border-krds-gray-30",
        "hover:bg-krds-primary-5 hover:text-krds-primary-50",
        "focus-visible:ring-krds-primary-50",
        className
      )}
      {...props}
    />
  );
}

function CarouselNext({ className, ...props }: React.ComponentProps<typeof ShadcnCarouselNext>) {
  return (
    <ShadcnCarouselNext
      data-slot="krds-carousel-next"
      className={cn(
        "text-krds-gray-90 border-krds-gray-30",
        "hover:bg-krds-primary-5 hover:text-krds-primary-50",
        "focus-visible:ring-krds-primary-50",
        className
      )}
      {...props}
    />
  );
}

export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext };

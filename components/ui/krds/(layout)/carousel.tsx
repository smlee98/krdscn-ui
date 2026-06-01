/**
 * KRDS Carousel — wraps the shadcn/Embla carousel and adds KRDS-spec indicators.
 *
 * Figma sources:
 *  - Arrow buttons : 343:24138 (4 sizes × 2 directions; circle, #cdd1d5 border, #33363d chevron)
 *  - Number badge  : 1170:66159 ("current / total" pill; h-40, body/medium-bold)
 *  - Dot indicators: 343:23518 (h-40 pill wrapper; 8px circles, active = 20×8 #256ef4 pill)
 *
 * KRDS spec rules (https://www.krds.go.kr/html/site/component/component_04_09.html):
 *  - Max 5 slides; clear visual boundaries on each item.
 *  - Autoplay must offer pause; hover/tab focus should pause.
 *  - Indicators can be dots OR fraction (collapse to fraction on small screens).
 *  - Pause button = first focusable element in autoplay carousels.
 */
"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

import {
  Carousel as ShadcnCarousel,
  CarouselContent as ShadcnCarouselContent,
  CarouselItem as ShadcnCarouselItem,
  type CarouselApi
} from "@/components/ui/carousel";
import { cn } from "@/lib/cn";

// ─── Types ────────────────────────────────────────────────────────────────────

type CarouselArrowSize = "xsmall" | "small" | "medium" | "large";

type CarouselContextValue = {
  api: CarouselApi | undefined;
  selectedIndex: number;
  slideCount: number;
  scrollTo: (index: number) => void;
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
};

const KrdsCarouselContext = React.createContext<CarouselContextValue | null>(null);

function useKrdsCarousel() {
  const ctx = React.useContext(KrdsCarouselContext);
  if (!ctx) throw new Error("KRDS Carousel sub-parts must be used inside <Carousel>");
  return ctx;
}

// ─── Carousel (Root) ──────────────────────────────────────────────────────────

type CarouselProps = React.ComponentProps<typeof ShadcnCarousel>;

function Carousel({ children, className, setApi: externalSetApi, ...props }: CarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [slideCount, setSlideCount] = React.useState(0);
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const handleSetApi = React.useCallback(
    (a: CarouselApi) => {
      setApi(a);
      externalSetApi?.(a);
    },
    [externalSetApi]
  );

  React.useEffect(() => {
    if (!api) return;
    const sync = () => {
      setSelectedIndex(api.selectedScrollSnap());
      setSlideCount(api.scrollSnapList().length);
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };
    sync();
    api.on("select", sync);
    api.on("reInit", sync);
    return () => {
      api.off("select", sync);
      api.off("reInit", sync);
    };
  }, [api]);

  const scrollTo = React.useCallback((i: number) => api?.scrollTo(i), [api]);
  const scrollPrev = React.useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = React.useCallback(() => api?.scrollNext(), [api]);

  return (
    <KrdsCarouselContext.Provider
      value={{ api, selectedIndex, slideCount, scrollTo, scrollPrev, scrollNext, canScrollPrev, canScrollNext }}
    >
      <ShadcnCarousel data-slot="krds-carousel" setApi={handleSetApi} className={className} {...props}>
        {children}
      </ShadcnCarousel>
    </KrdsCarouselContext.Provider>
  );
}

// ─── CarouselContent / CarouselItem — pass-throughs ───────────────────────────

function CarouselContent({ className, ...props }: React.ComponentProps<typeof ShadcnCarouselContent>) {
  return <ShadcnCarouselContent data-slot="krds-carousel-content" className={className} {...props} />;
}

function CarouselItem({ className, ...props }: React.ComponentProps<typeof ShadcnCarouselItem>) {
  return <ShadcnCarouselItem data-slot="krds-carousel-item" className={className} {...props} />;
}

// ─── CarouselArrow / CarouselPrevious / CarouselNext ──────────────────────────

type CarouselArrowProps = Omit<React.ComponentProps<"button">, "type"> & {
  direction: "previous" | "next";
  size?: CarouselArrowSize;
};

const ARROW_SIZE_CLASS: Record<CarouselArrowSize, string> = {
  xsmall: "size-8",
  small: "size-10",
  medium: "size-12",
  large: "size-16"
};

const ARROW_ICON_CLASS: Record<CarouselArrowSize, string> = {
  xsmall: "size-5",
  small: "size-6",
  medium: "size-7",
  large: "size-9"
};

function CarouselArrow({ direction, size = "small", className, "aria-label": ariaLabel, ...rest }: CarouselArrowProps) {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useKrdsCarousel();
  const isPrev = direction === "previous";
  const Icon = isPrev ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      data-slot={isPrev ? "krds-carousel-previous" : "krds-carousel-next"}
      aria-label={ariaLabel ?? (isPrev ? "이전 슬라이드" : "다음 슬라이드")}
      disabled={isPrev ? !canScrollPrev : !canScrollNext}
      onClick={isPrev ? scrollPrev : scrollNext}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full bg-white text-krds-fg",
        "border-krds-gray-20 border transition-colors",
        "hover:border-krds-gray-30",
        "focus-visible:ring-krds-primary-50 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
        "disabled:cursor-not-allowed disabled:opacity-50",
        ARROW_SIZE_CLASS[size],
        className
      )}
      {...rest}
    >
      <Icon className={cn("shrink-0", ARROW_ICON_CLASS[size])} aria-hidden="true" />
    </button>
  );
}

type CarouselPrevNextProps = Omit<CarouselArrowProps, "direction">;

function CarouselPrevious(props: CarouselPrevNextProps) {
  return <CarouselArrow direction="previous" {...props} />;
}

function CarouselNext(props: CarouselPrevNextProps) {
  return <CarouselArrow direction="next" {...props} />;
}

// ─── CarouselNumber ───────────────────────────────────────────────────────────

type CarouselNumberProps = React.ComponentProps<"div">;

function CarouselNumber({ className, ...rest }: CarouselNumberProps) {
  const { selectedIndex, slideCount } = useKrdsCarousel();
  if (slideCount === 0) return null;
  return (
    <div
      data-slot="krds-carousel-number"
      role="status"
      aria-live="polite"
      className={cn(
        "inline-flex h-10 items-center gap-1 rounded-full bg-white px-4",
        "border-krds-gray-20 border",
        "text-krds-body-md font-bold whitespace-nowrap",
        className
      )}
      {...rest}
    >
      <span className="text-krds-fg-secondary">{selectedIndex + 1}</span>
      <span className="text-krds-gray-90">/</span>
      <span className="text-krds-gray-90">{slideCount}</span>
    </div>
  );
}

// ─── CarouselDots ─────────────────────────────────────────────────────────────

type CarouselDotsProps = React.ComponentProps<"div"> & {
  /** Accessible label for the indicators container. Defaults to "슬라이드 선택". */
  label?: string;
};

function CarouselDots({ className, label = "슬라이드 선택", ...rest }: CarouselDotsProps) {
  const { selectedIndex, slideCount, scrollTo } = useKrdsCarousel();
  if (slideCount === 0) return null;
  return (
    <div
      data-slot="krds-carousel-dots"
      role="tablist"
      aria-label={label}
      className={cn("inline-flex h-10 items-center gap-1 rounded-full bg-white px-4", className)}
      {...rest}
    >
      {Array.from({ length: slideCount }, (_, i) => {
        const isActive = i === selectedIndex;
        return (
          <button
            key={i}
            type="button"
            role="tab"
            aria-label={`${i + 1}번 슬라이드로 이동`}
            aria-selected={isActive}
            data-active={isActive || undefined}
            onClick={() => scrollTo(i)}
            className={cn(
              "h-2 shrink-0 rounded-full transition-all",
              "focus-visible:ring-krds-primary-50 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none",
              isActive ? "bg-krds-primary-50 w-5" : "bg-krds-gray-50 w-2"
            )}
          />
        );
      })}
    </div>
  );
}

// ─── CarouselPlayPause ────────────────────────────────────────────────────────

type CarouselPlayPauseProps = Omit<React.ComponentProps<"button">, "type" | "children" | "onToggle"> & {
  isPlaying: boolean;
  onToggle: (next: boolean) => void;
  size?: CarouselArrowSize;
  /** Accessible labels override. */
  playLabel?: string;
  pauseLabel?: string;
};

function CarouselPlayPause({
  isPlaying,
  onToggle,
  size = "small",
  playLabel = "자동재생 시작",
  pauseLabel = "자동재생 정지",
  className,
  ...rest
}: CarouselPlayPauseProps) {
  const Icon = isPlaying ? Pause : Play;
  return (
    <button
      type="button"
      data-slot="krds-carousel-play-pause"
      aria-label={isPlaying ? pauseLabel : playLabel}
      aria-pressed={!isPlaying}
      onClick={() => onToggle(!isPlaying)}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full bg-white text-krds-fg",
        "border-krds-gray-20 border transition-colors",
        "hover:border-krds-gray-30",
        "focus-visible:ring-krds-primary-50 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
        ARROW_SIZE_CLASS[size],
        className
      )}
      {...rest}
    >
      <Icon className={cn("shrink-0", ARROW_ICON_CLASS[size])} aria-hidden="true" />
    </button>
  );
}

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselArrow,
  CarouselPrevious,
  CarouselNext,
  CarouselNumber,
  CarouselDots,
  CarouselPlayPause,
  useKrdsCarousel
};
export type {
  CarouselProps,
  CarouselArrowProps,
  CarouselArrowSize,
  CarouselNumberProps,
  CarouselDotsProps,
  CarouselPlayPauseProps,
  CarouselApi
};

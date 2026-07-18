// rsc:client
"use client"
/**
 * KRDS Carousel — composes embla-carousel-react directly and adds KRDS-spec indicators.
 *
 * Figma sources:
 *  - Arrow buttons : 343:24138 (4 sizes × 2 directions; circle, #cdd1d5 border, #33363d chevron)
 *    NOTE: the compiled KRDS web CSS (`_carousel.scss:79`, `[class^='swiper-button-']`) defines
 *    only ONE arrow size (`size-height-6` = 40px). The 4-step xsmall/small/medium/large scale
 *    below is a Figma-derived project extension, not present in the web component spec.
 *  - Number badge  : 1170:66159 ("current / total" pill; h-40, body/medium-bold)
 *  - Dot indicators: 343:23518 (h-40 pill wrapper; 8px circles, active = 20×8 #256ef4 pill)
 *
 * KRDS spec rules (https://www.krds.go.kr/html/site/component/component_04_09.html):
 *  - Max 5 slides; clear visual boundaries on each item.
 *  - Autoplay must offer pause; hover/tab focus should pause.
 *  - Indicators can be dots OR fraction (collapse to fraction on small screens).
 *  - Pause button = first focusable element in autoplay carousels.
 */

import * as React from "react"
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react"
import { ChevronLeft, ChevronRight, Pause, Play, Plus } from "lucide-react"

import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

type CarouselApi = UseEmblaCarouselType[1]
type CarouselOptions = Parameters<typeof useEmblaCarousel>[0]
type CarouselPlugin = Parameters<typeof useEmblaCarousel>[1]

type CarouselArrowSize = "xsmall" | "small" | "medium" | "large"

// Single compound context (contract §2). Beyond the KRDS-derived state (selectedIndex,
// slideCount, scroll helpers) it also carries the embla ref + orientation that
// CarouselContent/CarouselItem need, now that the embla composition is inlined here
// rather than delegated to a shadcn base — so one provider covers every sub-part.
type CarouselContextValue = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: CarouselApi | undefined
  orientation: "horizontal" | "vertical"
  selectedIndex: number
  slideCount: number
  scrollTo: (index: number) => void
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
}

const KrdsCarouselContext = React.createContext<CarouselContextValue | null>(null)

function useKrdsCarousel() {
  const ctx = React.useContext(KrdsCarouselContext)
  if (!ctx) throw new Error("KRDS Carousel sub-parts must be used inside <Carousel>")
  return ctx
}

// ─── Carousel (Root) ──────────────────────────────────────────────────────────

type CarouselProps = React.ComponentProps<"div"> & {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

function Carousel({
  orientation = "horizontal",
  opts,
  setApi: externalSetApi,
  plugins,
  className,
  children,
  ...props
}: CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel({ ...opts, axis: orientation === "horizontal" ? "x" : "y" }, plugins)
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [slideCount, setSlideCount] = React.useState(0)
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)

  const scrollTo = React.useCallback((i: number) => api?.scrollTo(i), [api])
  const scrollPrev = React.useCallback(() => api?.scrollPrev(), [api])
  const scrollNext = React.useCallback(() => api?.scrollNext(), [api])

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault()
        scrollPrev()
      } else if (event.key === "ArrowRight") {
        event.preventDefault()
        scrollNext()
      }
    },
    [scrollPrev, scrollNext]
  )

  React.useEffect(() => {
    if (!api) return
    externalSetApi?.(api)
  }, [api, externalSetApi])

  React.useEffect(() => {
    if (!api) return
    const sync = () => {
      setSelectedIndex(api.selectedScrollSnap())
      setSlideCount(api.scrollSnapList().length)
      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }
    sync()
    api.on("select", sync)
    api.on("reInit", sync)
    return () => {
      api.off("select", sync)
      api.off("reInit", sync)
    }
  }, [api])

  return (
    <KrdsCarouselContext.Provider
      value={{
        carouselRef,
        api,
        orientation,
        selectedIndex,
        slideCount,
        scrollTo,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        data-slot="krds-carousel"
        {...props}
      >
        {children}
      </div>
    </KrdsCarouselContext.Provider>
  )
}

// ─── CarouselContent / CarouselItem ───────────────────────────────────────────

function CarouselContent({ className, ...props }: React.ComponentProps<"div">) {
  const { carouselRef, orientation } = useKrdsCarousel()
  return (
    <div ref={carouselRef} className="overflow-hidden" data-slot="carousel-content">
      <div
        data-slot="krds-carousel-content"
        className={cn("flex", orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col", className)}
        {...props}
      />
    </div>
  )
}

function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
  const { orientation } = useKrdsCarousel()
  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="krds-carousel-item"
      className={cn("min-w-0 shrink-0 grow-0 basis-full", orientation === "horizontal" ? "pl-4" : "pt-4", className)}
      {...props}
    />
  )
}

// ─── CarouselArrow / CarouselPrevious / CarouselNext ──────────────────────────

type CarouselArrowProps = Omit<React.ComponentProps<"button">, "type"> & {
  direction: "previous" | "next"
  size?: CarouselArrowSize
}

const ARROW_SIZE_CLASS: Record<CarouselArrowSize, string> = {
  xsmall: "size-8",
  small: "size-10",
  medium: "size-12",
  large: "size-16",
}

const ARROW_ICON_CLASS: Record<CarouselArrowSize, string> = {
  xsmall: "size-5",
  small: "size-6",
  medium: "size-7",
  large: "size-9",
}

function CarouselArrow({ direction, size = "small", className, "aria-label": ariaLabel, ...rest }: CarouselArrowProps) {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useKrdsCarousel()
  const isPrev = direction === "previous"
  const Icon = isPrev ? ChevronLeft : ChevronRight
  return (
    <button
      type="button"
      data-slot={isPrev ? "krds-carousel-previous" : "krds-carousel-next"}
      aria-label={ariaLabel ?? (isPrev ? "이전 슬라이드" : "다음 슬라이드")}
      disabled={isPrev ? !canScrollPrev : !canScrollNext}
      onClick={isPrev ? scrollPrev : scrollNext}
      className={cn(
        "bg-krds-surface text-krds-foreground inline-flex shrink-0 items-center justify-center rounded-full",
        "border-krds-border-light border transition-colors",
        "hover:bg-krds-surface-secondary-subtle",
        "active:bg-krds-surface-secondary-pressed",
        "focus-visible:krds-focus-ring",
        // KRDS .swiper-button-disabled (_carousel.scss:123-129): action-disabled fill +
        // icon-disabled-on glyph color, opacity stays 1 (not faded).
        "disabled:bg-krds-surface-disabled disabled:text-krds-foreground-disabled disabled:cursor-not-allowed disabled:opacity-100",
        ARROW_SIZE_CLASS[size],
        className
      )}
      {...rest}
    >
      <Icon className={cn("shrink-0", ARROW_ICON_CLASS[size])} aria-hidden="true" />
    </button>
  )
}

type CarouselPrevNextProps = Omit<CarouselArrowProps, "direction">

function CarouselPrevious(props: CarouselPrevNextProps) {
  return <CarouselArrow direction="previous" {...props} />
}

function CarouselNext(props: CarouselPrevNextProps) {
  return <CarouselArrow direction="next" {...props} />
}

// ─── CarouselNumber ───────────────────────────────────────────────────────────

type CarouselNumberProps = React.ComponentProps<"div">

function CarouselNumber({ className, ...rest }: CarouselNumberProps) {
  const { selectedIndex, slideCount } = useKrdsCarousel()
  if (slideCount === 0) return null
  return (
    <div
      data-slot="krds-carousel-number"
      role="status"
      aria-live="polite"
      className={cn(
        "bg-krds-surface inline-flex h-10 items-center gap-1 rounded-full px-4",
        "border-krds-border-light border",
        "text-krds-body-md font-bold whitespace-nowrap",
        className
      )}
      {...rest}
    >
      <span className="text-krds-foreground-secondary">{selectedIndex + 1}</span>
      <span className="text-krds-foreground">/</span>
      <span className="text-krds-foreground">{slideCount}</span>
    </div>
  )
}

// ─── CarouselDots ─────────────────────────────────────────────────────────────

type CarouselDotsProps = React.ComponentProps<"div"> & {
  /** Accessible label for the indicators container. Defaults to "슬라이드 선택". */
  label?: string
}

function CarouselDots({ className, label = "슬라이드 선택", ...rest }: CarouselDotsProps) {
  const { selectedIndex, slideCount, scrollTo } = useKrdsCarousel()
  if (slideCount === 0) return null
  return (
    <div
      data-slot="krds-carousel-dots"
      role="tablist"
      aria-label={label}
      // KRDS .swiper-pagination:not(.swiper-pagination-fraction) (_carousel.scss:17-23) fills with
      // element-inverse: light = gray-0(#fff 흰색), 고대비 = gray-95(#131416). 이름과 달리
      // 라이트 모드는 '흰 pill'이다. element-inverse에 대응하는 세만틱 토큰이 없어 numeric+dark:로
      // 원본을 정확히 재현한다(§4). padding-5 = 12px.
      className={cn(
        "bg-krds-gray-0 dark:bg-krds-gray-95 inline-flex h-10 items-center gap-1 rounded-full px-3",
        className
      )}
      {...rest}
    >
      {Array.from({ length: slideCount }, (_, i) => {
        const isActive = i === selectedIndex
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
              "focus-visible:krds-focus-ring",
              isActive ? "bg-krds-primary-50 w-5" : "bg-krds-gray-50 w-2"
            )}
          />
        )
      })}
    </div>
  )
}

// ─── CarouselPlayPause ────────────────────────────────────────────────────────

type CarouselPlayPauseProps = Omit<React.ComponentProps<"button">, "type" | "children" | "onToggle"> & {
  isPlaying: boolean
  onToggle: (next: boolean) => void
  size?: CarouselArrowSize
  /** Accessible labels override. */
  playLabel?: string
  pauseLabel?: string
}

function CarouselPlayPause({
  isPlaying,
  onToggle,
  size = "small",
  playLabel = "자동재생 시작",
  pauseLabel = "자동재생 정지",
  className,
  ...rest
}: CarouselPlayPauseProps) {
  const Icon = isPlaying ? Pause : Play
  return (
    <button
      type="button"
      data-slot="krds-carousel-play-pause"
      aria-label={isPlaying ? pauseLabel : playLabel}
      aria-pressed={!isPlaying}
      onClick={() => onToggle(!isPlaying)}
      className={cn(
        "bg-krds-surface text-krds-foreground inline-flex shrink-0 items-center justify-center rounded-full",
        "border-krds-border-light border transition-colors",
        // KRDS [class^=swiper-button-]:hover → action-secondary-hover(secondary-5) 배경 변경
        // (border 색이 아니라 배경. 화살표 버튼과 동일 처리).
        "hover:bg-krds-surface-secondary-subtle",
        "focus-visible:krds-focus-ring",
        ARROW_SIZE_CLASS[size],
        className
      )}
      {...rest}
    >
      <Icon className={cn("shrink-0", ARROW_ICON_CLASS[size])} aria-hidden="true" />
    </button>
  )
}

// ─── CarouselMore ─────────────────────────────────────────────────────────────
// Reference visual banner (carousel_banner.html) `a.swiper-button-more` — a "더 보기"
// (more) affordance with a plus icon. Renders as a link when `href` is given, else a
// button. Shares the circular KRDS arrow-button chrome.

// Polymorphic a/button (contract §3): props are the attributes common to both
// elements, so `rest` (incl. onClick: MouseEventHandler<HTMLElement>) spreads onto
// whichever element renders with no cast. Anchor-only attrs (target/rel/download)
// are intentionally out of scope for this compact "more" affordance.
type CarouselMoreProps = React.HTMLAttributes<HTMLElement> & {
  href?: string
  size?: CarouselArrowSize
  /** Accessible label. Defaults to "모든 슬라이드 보기". */
  label?: string
}

function CarouselMore({ href, size = "small", label = "모든 슬라이드 보기", className, ...rest }: CarouselMoreProps) {
  const classes = cn(
    "inline-flex shrink-0 items-center justify-center rounded-full bg-krds-surface text-krds-foreground",
    "border-krds-border-light border transition-colors",
    // KRDS [class^=swiper-button-]:hover → action-secondary-hover(secondary-5) 배경 변경 (화살표와 동일)
    "hover:bg-krds-surface-secondary-subtle",
    "focus-visible:krds-focus-ring",
    ARROW_SIZE_CLASS[size],
    className
  )
  const inner = (
    <>
      <Plus className={cn("shrink-0", ARROW_ICON_CLASS[size])} aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </>
  )
  if (href) {
    return (
      <a data-slot="krds-carousel-more" href={href} aria-label={label} className={classes} {...rest}>
        {inner}
      </a>
    )
  }
  return (
    <button type="button" data-slot="krds-carousel-more" aria-label={label} className={classes} {...rest}>
      {inner}
    </button>
  )
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
  CarouselMore,
  useKrdsCarousel,
}
export type {
  CarouselProps,
  CarouselArrowProps,
  CarouselArrowSize,
  CarouselNumberProps,
  CarouselDotsProps,
  CarouselPlayPauseProps,
  CarouselMoreProps,
  CarouselApi,
}

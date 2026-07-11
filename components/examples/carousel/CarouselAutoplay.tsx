"use client"

import * as React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
  CarouselPlayPause,
  type CarouselApi,
} from "@/components/ui/dynamic/carousel"

const NOTICES = [
  { date: "2024.03.20", title: "시스템 점검 안내 (00:00 ~ 06:00)" },
  { date: "2024.03.15", title: "민원 서비스 개편 사전 안내" },
  { date: "2024.03.10", title: "간편인증 서비스 신규 추가 안내" },
  { date: "2024.03.05", title: "2024년 상반기 전자정부 서비스 계획 공개" },
]

export default function CarouselAutoplay() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [isPlaying, setIsPlaying] = React.useState(true)

  React.useEffect(() => {
    if (!api || !isPlaying) return
    const id = window.setInterval(() => {
      if (api.canScrollNext()) api.scrollNext()
      else api.scrollTo(0)
    }, 3000)
    return () => window.clearInterval(id)
  }, [api, isPlaying])

  return (
    <Carousel setApi={setApi} opts={{ loop: true }} className="mx-auto w-full max-w-xl">
      <CarouselContent>
        {NOTICES.map((notice, idx) => (
          <CarouselItem key={idx}>
            <div className="border-krds-gray-20 flex h-36 flex-col justify-center rounded-lg border bg-white p-6">
              <span className="text-krds-gray-50 mb-1 text-xs">{notice.date}</span>
              <p className="text-krds-gray-90 text-sm font-medium">{notice.title}</p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="mt-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <CarouselPlayPause isPlaying={isPlaying} onToggle={setIsPlaying} />
          <CarouselDots />
        </div>
        <div className="flex items-center gap-2">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </div>
    </Carousel>
  )
}

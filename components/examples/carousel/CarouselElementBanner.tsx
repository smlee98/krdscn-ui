"use client"

import * as React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselNumber,
  CarouselPlayPause,
  CarouselMore,
  type CarouselApi,
} from "@/components/ui/dynamic/carousel"

const ITEMS = [
  { sub: "서브타이틀", title: "타이틀" },
  { sub: "정책 뉴스", title: "2024 디지털플랫폼정부 추진 계획" },
  { sub: "공모 사업", title: "공공데이터 활용 창업 경진대회 모집" },
  { sub: "행사 안내", title: "정부혁신박람회 2024 사전 등록 시작" },
]

export default function CarouselElementBanner() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [isPlaying, setIsPlaying] = React.useState(true)

  React.useEffect(() => {
    if (!api || !isPlaying) return
    const id = window.setInterval(() => {
      if (api.canScrollNext()) api.scrollNext()
      else api.scrollTo(0)
    }, 3500)
    return () => window.clearInterval(id)
  }, [api, isPlaying])

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-4">
      <h4 className="text-krds-gray-90 text-xl font-bold">배너영역 타이틀</h4>
      <Carousel setApi={setApi} opts={{ loop: true }} className="bg-krds-secondary-5 rounded-2xl p-8">
        <CarouselContent>
          {ITEMS.map((item, idx) => (
            <CarouselItem key={idx}>
              <div className="flex flex-col items-center gap-3">
                <span className="text-krds-gray-70 text-sm font-semibold">{item.sub}</span>
                <h3 className="text-krds-gray-90 text-xl font-bold">{item.title}</h3>
                <div className="bg-krds-gray-20 mt-3 h-32 w-44 rounded" aria-hidden="true" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="mt-6 flex items-center justify-center gap-2">
          <CarouselNumber />
          <CarouselPlayPause isPlaying={isPlaying} onToggle={setIsPlaying} />
          <CarouselPrevious />
          <CarouselNext />
          <CarouselMore href="#" />
        </div>
      </Carousel>
    </div>
  )
}

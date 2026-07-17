import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
} from "@/registry/krds/ui/carousel"

const SERVICES = [
  { icon: "📋", name: "주민등록등본" },
  { icon: "🏠", name: "부동산 등기" },
  { icon: "🚗", name: "자동차 등록" },
  { icon: "📚", name: "학력 인증" },
  { icon: "💼", name: "사업자 등록" },
  { icon: "🏥", name: "의료급여" },
]

export default function CarouselMultiple() {
  return (
    <Carousel opts={{ align: "start" }} className="mx-auto w-full max-w-xl">
      <CarouselContent className="-ml-2">
        {SERVICES.map((service, idx) => (
          <CarouselItem key={idx} className="basis-1/3 pl-2">
            <div className="border-krds-gray-20 flex flex-col items-center justify-center gap-2 rounded-lg border bg-white p-4 text-center">
              <span className="text-2xl">{service.icon}</span>
              <span className="text-krds-gray-90 text-xs font-medium">{service.name}</span>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="mt-4 flex items-center justify-between gap-2">
        <CarouselDots />
        <div className="flex items-center gap-2">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </div>
    </Carousel>
  )
}

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselNumber,
} from "@/components/ui/dynamic/carousel"

const SLIDES = [
  { title: "정부24 민원 서비스", desc: "각종 민원서류를 온라인으로 간편하게 발급받으세요." },
  { title: "전자정부 포털", desc: "1,400여 종의 민원 서비스를 한 곳에서 이용하세요." },
  { title: "간편인증 서비스", desc: "카카오, 네이버 등 간편인증으로 빠르게 로그인하세요." },
]

export default function CarouselDefault() {
  return (
    <Carousel className="mx-auto w-full max-w-xl">
      <CarouselContent>
        {SLIDES.map((slide, idx) => (
          <CarouselItem key={idx}>
            <div className="bg-krds-primary-5 flex h-40 flex-col items-center justify-center rounded-lg p-6 text-center">
              <h3 className="text-krds-primary-50 mb-2 text-lg font-semibold">{slide.title}</h3>
              <p className="text-krds-gray-70 text-sm">{slide.desc}</p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="mt-4 flex items-center justify-between gap-2">
        <CarouselNumber />
        <div className="flex items-center gap-2">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </div>
    </Carousel>
  )
}

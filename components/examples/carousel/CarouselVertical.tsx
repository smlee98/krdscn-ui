import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselNumber,
} from "@/components/ui/dynamic/carousel"

const STEPS = [
  { step: "01", label: "신청서 작성", desc: "민원 정보를 입력합니다." },
  { step: "02", label: "서류 첨부", desc: "필요 서류를 업로드합니다." },
  { step: "03", label: "본인인증", desc: "간편인증으로 신원을 확인합니다." },
  { step: "04", label: "제출 완료", desc: "접수번호를 저장해 두세요." },
]

export default function CarouselVertical() {
  return (
    <div className="mx-auto flex w-full max-w-xs items-center gap-3 py-16">
      <Carousel orientation="vertical" className="flex-1" opts={{ align: "start" }}>
        <CarouselContent className="-mt-2 h-48">
          {STEPS.map((step, idx) => (
            <CarouselItem key={idx} className="basis-1/2 pt-2">
              <div className="bg-krds-gray-5 flex h-full items-center gap-4 rounded-lg px-4 py-3">
                <span className="text-krds-primary-50 text-lg font-bold">{step.step}</span>
                <div>
                  <p className="text-krds-gray-90 text-sm font-semibold">{step.label}</p>
                  <p className="text-krds-gray-50 text-xs">{step.desc}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="mt-3 flex items-center justify-between gap-2">
          <CarouselNumber />
          <div className="flex items-center gap-2">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </div>
      </Carousel>
    </div>
  )
}

import { Plus } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots
} from "@/components/ui/dynamic/carousel";
import { Button } from "@/components/ui/dynamic/button";

const BANNERS = [
  {
    title: "타이틀 영역 타이틀 영역",
    body: "컨텐츠 영역 컨텐츠 영역 컨텐츠 영역 컨텐츠 영역",
    cta: "버튼 영역"
  },
  {
    title: "정부24 민원 서비스",
    body: "각종 민원서류를 온라인으로 간편하게 발급받으세요.",
    cta: "서비스 바로가기"
  },
  {
    title: "공공데이터 포털",
    body: "AI·산업 분야 활용이 가능한 데이터를 개방합니다.",
    cta: "데이터 둘러보기"
  },
  {
    title: "간편인증 서비스",
    body: "카카오, 네이버 등 익숙한 인증으로 빠르게 로그인하세요.",
    cta: "인증 방법 보기"
  }
];

export default function CarouselFullBanner() {
  return (
    <Carousel opts={{ loop: true }} className="relative mx-auto w-full max-w-3xl">
      <CarouselContent>
        {BANNERS.map((b, idx) => (
          <CarouselItem key={idx}>
            <div className="bg-krds-secondary-5 flex h-80 items-center justify-between gap-10 rounded-lg px-24 pb-16">
              <div className="flex flex-1 flex-col gap-4">
                <h3 className="text-krds-gray-90 text-krds-display-sm font-bold">{b.title}</h3>
                <p className="text-krds-gray-70 text-base">{b.body}</p>
                <div className="mt-4">
                  <Button variant="default" size="default">
                    {b.cta}
                  </Button>
                </div>
              </div>
              <div className="bg-krds-gray-20 h-32 w-44 shrink-0 rounded" aria-hidden="true" />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
        <div className="pointer-events-auto">
          <CarouselPrevious size="large" />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
        <div className="pointer-events-auto">
          <CarouselNext size="large" />
        </div>
      </div>

      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2">
        <CarouselDots />
        <button
          type="button"
          aria-label="모든 슬라이드 보기"
          className="border-krds-gray-20 hover:border-krds-gray-30 focus-visible:ring-krds-primary-50 inline-flex size-10 shrink-0 items-center justify-center rounded-full border bg-white text-[#33363d] transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          <Plus className="size-5" aria-hidden="true" />
        </button>
      </div>
    </Carousel>
  );
}

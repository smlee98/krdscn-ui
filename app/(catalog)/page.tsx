import Link from "next/link";

import { ComparisonGrid } from "@/components/krds-app/comparison-grid";
import { KrdsLogo } from "@/components/logo/krds";
import { ShadcnLogo } from "@/components/logo/shadcn";

export default function WelcomePage() {
  return (
    <>
      <main className="flex min-h-[calc(100svh-7rem)] flex-col items-center justify-center gap-20">
        <section className="flex flex-col items-center gap-7 text-center">
          <KrdsLogo className="size-20 drop-shadow-sm" />

          <div className="flex flex-col gap-3">
            <h1 className="text-4xl font-bold tracking-tight">KRDS 컴포넌트 카탈로그</h1>
            <p className="text-muted-foreground max-w-lg text-base leading-relaxed">
              공공 서비스를 위한 한국 디자인 시스템(KRDS) 컴포넌트를 구현한
              <br />
              레퍼런스 카탈로그입니다. 41개 컴포넌트의 예제·Props·소스를 확인하세요.
            </p>
          </div>

          <Link
            href="/components/identity/masthead"
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-1.5 rounded-md px-5 py-2.5 text-sm font-medium transition-colors"
          >
            카탈로그 보기
            <span aria-hidden>→</span>
          </Link>

          <div className="text-muted-foreground mt-1 flex items-center gap-1.5 text-xs">
            <ShadcnLogo className="size-3.5" />
            <span>shadcn/ui 프리미티브 기반으로 구현</span>
          </div>
        </section>
      </main>
      <ComparisonGrid />
    </>
  );
}

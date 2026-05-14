import { KrdsLogo } from "@/components/logo/krds";
import { ShadcnLogo } from "@/components/logo/shadcn";

export default function WelcomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <div className="flex items-center gap-3">
        <KrdsLogo className="size-10" />
        <span className="text-muted-foreground text-2xl font-semibold">+</span>
        <ShadcnLogo className="size-10" />
      </div>
      <h1 className="text-3xl font-bold tracking-tight">KRDS × shadcn/ui</h1>
      <p className="text-muted-foreground max-w-md text-center">
        한국 디자인 시스템(KRDS) 컴포넌트를 shadcn/ui 프리미티브 위에 구현한 레퍼런스 카탈로그입니다.
      </p>
    </main>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";

import { KrdsLogo } from "@/components/logo/krds";
import { ShadcnLogo } from "@/components/logo/shadcn";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type ThemeOption = "krds" | "shadcn";

const TOKEN_SWATCHES: { label: string; token: string; className: string }[] = [
  { label: "primary", token: "--krds-color-primary-50", className: "bg-krds-primary-50" },
  { label: "secondary", token: "--krds-color-secondary-50", className: "bg-krds-secondary-50" },
  { label: "neutral", token: "--krds-color-gray-50", className: "bg-krds-gray-50" },
  { label: "accent", token: "--krds-color-primary-5", className: "bg-krds-primary-5" }
];

export default function WelcomePage() {
  const [demoTheme, setDemoTheme] = useState<ThemeOption>("krds");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-20 p-8">
      {/* ─── Hero section — KRDS first (≈70 % visual weight) ─── */}
      <section className="flex flex-col items-center gap-7 text-center">
        {/* Big KRDS mark */}
        <KrdsLogo className="size-20 drop-shadow-sm" />

        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-bold tracking-tight">KRDS 컴포넌트 카탈로그</h1>
          <p className="text-muted-foreground max-w-lg text-base leading-relaxed">
            공공 서비스를 위한 한국 디자인 시스템(KRDS) 컴포넌트를 구현한
            <br />
            레퍼런스 카탈로그입니다. 42개 컴포넌트의 예제·Props·소스를 확인하세요.
          </p>
        </div>

        <Link
          href="/components/identity/masthead"
          className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-1.5 rounded-md px-5 py-2.5 text-sm font-medium transition-colors"
        >
          카탈로그 보기
          <span aria-hidden>→</span>
        </Link>

        {/* shadcn footnote — ≈30 % visual weight */}
        <div className="text-muted-foreground mt-1 flex items-center gap-1.5 text-xs">
          <ShadcnLogo className="size-3.5" />
          <span>shadcn/ui 프리미티브 기반으로 구현</span>
        </div>
      </section>

      {/* ─── Theme Toggle Demo section ─── */}
      <section className="flex flex-col items-center gap-5">
        <div className="text-center">
          <h2 className="text-base font-semibold">테마 토글 데모</h2>
          <p className="text-muted-foreground mt-0.5 text-xs">
            KRDS ↔ shadcn/ui 컬러셋 전환 시 토큰이 어떻게 바뀌는지 미리보기
          </p>
        </div>

        <ToggleGroup
          type="single"
          value={demoTheme}
          onValueChange={(v) => {
            if (v) setDemoTheme(v as ThemeOption);
          }}
          variant="outline"
          size="sm"
          aria-label="데모 테마 선택"
        >
          <ToggleGroupItem value="krds" aria-label="KRDS 컬러셋">
            <KrdsLogo className="size-3.5" />
            KRDS
          </ToggleGroupItem>
          <ToggleGroupItem value="shadcn" aria-label="shadcn 기본 컬러셋">
            <ShadcnLogo className="size-3.5" />
            shadcn/ui
          </ToggleGroupItem>
        </ToggleGroup>

        {/* Token swatch preview — data-theme applied locally to this container */}
        <div
          data-theme={demoTheme}
          className="border-border rounded-xl border bg-white/60 p-6 shadow-sm backdrop-blur-sm"
        >
          <div className="flex gap-4">
            {TOKEN_SWATCHES.map((swatch) => (
              <div key={swatch.label} className="flex flex-col items-center gap-2">
                <div
                  className={`${swatch.className} size-14 rounded-lg border border-black/10 shadow-sm transition-colors duration-300`}
                />
                <span className="text-foreground text-xs font-medium">{swatch.label}</span>
                <span className="text-muted-foreground font-mono text-[10px] leading-tight">{swatch.token}</span>
              </div>
            ))}
          </div>

          <p className="text-muted-foreground mt-4 text-center text-[11px]">
            현재:{" "}
            <span className="text-foreground font-medium">
              {demoTheme === "krds" ? "KRDS 컬러셋" : "shadcn/ui 컬러셋"}
            </span>
          </p>
        </div>
      </section>
    </main>
  );
}

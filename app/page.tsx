import Link from "next/link"
import { ArrowRightIcon, BoxesIcon, CheckIcon, PaletteIcon, ShieldCheckIcon, TerminalIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// TODO: 레지스트리 호스팅 도메인 확정 시 교체
const installCommand = "npx shadcn@latest add https://krdscn.gridone.co.kr/r/krds-all.json"

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="container-wrapper px-4 py-14 md:py-20 xl:px-6">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center text-center">
          <div className="mb-4 inline-flex h-7 items-center gap-2 rounded-full border bg-muted/40 px-3 text-xs text-muted-foreground">
            <span className="size-1.5 rounded-full bg-primary" />
            KRDS 레지스트리 · 오픈 코드 · Radix 기반
          </div>
          <h1 className="w-full max-w-none text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            KRDS 컴포넌트를 프로젝트 안에 구축하세요.
          </h1>
          <p className="mt-5 max-w-3xl text-balance text-lg text-muted-foreground">
            krdscn/ui는 KRDS 디자인 가이드라인을 따르는 컴포넌트 소스를 shadcn/ui 레지스트리로 제공합니다. 반복적인 수동
            커스터마이징 대신, 프로젝트 안에서 바로 수정하고 확장할 수 있는 일관된 KRDS 기본값을 제공합니다.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/docs">
                시작하기 <ArrowRightIcon />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/docs/components">컴포넌트 보기</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container-wrapper px-4 pb-12 xl:px-6">
        <div className="mx-auto max-w-4xl rounded-xl border bg-card p-2 shadow-sm">
          <div className="flex items-center gap-2 border-b px-3 py-2 text-xs text-muted-foreground">
            <TerminalIcon className="size-3.5" />
            전체 설치
          </div>
          <pre className="overflow-x-auto p-4 text-sm">
            <code>{installCommand}</code>
          </pre>
        </div>
      </section>

      <section className="container-wrapper grid gap-4 px-4 pb-20 md:grid-cols-3 xl:px-6">
        <Card>
          <CardHeader>
            <PaletteIcon className="mb-2 size-5 text-primary" />
            <CardTitle>KRDS 기본값</CardTitle>
            <CardDescription>레지스트리에서 설치되는 컴포넌트 소스를 프로젝트 안에서 직접 수정하고 확장할 수 있습니다.</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <BoxesIcon className="mb-2 size-5 text-primary" />
            <CardTitle>오픈 코드</CardTitle>
            <CardDescription>패키지에서 import하는 대신 컴포넌트 소스가 프로젝트로 들어오므로 서비스 요구사항에 맞게 직접 수정할 수 있습니다.</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <ShieldCheckIcon className="mb-2 size-5 text-primary" />
            <CardTitle>Radix 기반</CardTitle>
            <CardDescription>기존 Radix primitive 생태계와 자연스럽게 맞물리도록 컴포넌트 구조를 유지합니다.</CardDescription>
          </CardHeader>
        </Card>
      </section>

      <section className="border-t bg-muted/30">
        <div className="container-wrapper px-4 py-12 xl:px-6">
          <div className="mx-auto grid max-w-4xl gap-4 text-sm md:grid-cols-2">
            {["전체 UI 컴포넌트", "오픈 코드 방식", "개별 컴포넌트 설치", "Radix 기반 호환성"].map((item) => (
              <div key={item} className="flex items-center gap-2 text-muted-foreground">
                <CheckIcon className="size-4 text-primary" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

import Link from "next/link"
import { AccessibilityIcon, ArrowRightIcon, BlocksIcon, Code2Icon, PaletteIcon, TerminalIcon } from "lucide-react"

import { ApplyFormDemo, ShowcaseBento } from "@/components/home/showcase"
import { CopyButton } from "@/components/docs/copy-button"
import { Button } from "@/components/ui/button"
import { getAllPagesFromFolder, getPagesFromFolder } from "@/lib/page-tree"
import { source } from "@/lib/source"

const installCommand = "npx shadcn@latest add https://krdscn-ui.js.org/r/krds-all.json"

const steps = [
  {
    step: "01",
    title: "프로젝트 준비",
    description: "shadcn CLI를 초기화합니다. 이미 shadcn/ui를 쓰고 있다면 이 단계는 건너뜁니다.",
    code: "pnpm dlx shadcn@latest init",
  },
  {
    step: "02",
    title: "레지스트리에서 설치",
    description: "필요한 컴포넌트만 골라 설치하거나, krds-all로 전체를 한 번에 가져옵니다.",
    code: "pnpm dlx shadcn@latest add .../r/button.json",
  },
  {
    step: "03",
    title: "프로젝트 코드로 소유",
    description: "소스가 프로젝트 안으로 복사되므로, 서비스 요구사항에 맞게 직접 수정하고 확장합니다.",
    code: "components/ui/button.tsx",
  },
]

const features = [
  {
    icon: PaletteIcon,
    title: "KRDS 기본값 내장",
    description: "색상·타이포그래피·이중 포커스 링까지, KRDS 디자인 토큰이 컴포넌트와 함께 설치됩니다.",
  },
  {
    icon: Code2Icon,
    title: "오픈 코드",
    description: "패키지에서 import하는 대신 소스가 프로젝트로 들어옵니다. 최상위 코드를 직접 읽고 수정합니다.",
  },
  {
    icon: BlocksIcon,
    title: "Radix 기반 호환",
    description: "기존 shadcn/ui·Radix primitive 생태계와 같은 구조라, 쓰던 프로젝트에 그대로 얹을 수 있습니다.",
  },
  {
    icon: AccessibilityIcon,
    title: "접근성 내장",
    description: "레이블·오류 메시지의 ARIA 연결, 스크린리더 낭독, 건너뛰기 링크 등 KRDS 접근성 규칙이 기본입니다.",
  },
]

export default function Home() {
  const componentsFolder = source.pageTree.children.find((item) => item.$id === "components" && item.type === "folder")
  const componentCount = componentsFolder?.type === "folder" ? getPagesFromFolder(componentsFolder).length : 0
  const krdsFolder = source.pageTree.children.find((item) => item.$id === "krds-guideline" && item.type === "folder")
  const guidelineCount = krdsFolder?.type === "folder" ? getAllPagesFromFolder(krdsFolder).length : 0

  return (
    <div className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden border-b">
        <div
          aria-hidden
          className="absolute inset-0 [background-image:radial-gradient(var(--border)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black_10%,transparent_100%)] [background-size:24px_24px]"
        />
        <div aria-hidden className="absolute -top-24 left-1/4 size-72 rounded-full bg-[#256EF4]/10 blur-3xl" />
        <div aria-hidden className="absolute -top-16 right-1/4 size-56 rounded-full bg-[#E71825]/6 blur-3xl" />
        <div className="container-wrapper relative px-4 py-14 md:py-20 xl:px-6">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="flex flex-col items-start">
              <div className="bg-background/60 text-muted-foreground mb-5 inline-flex h-7 items-center gap-2 rounded-full border px-3 text-xs backdrop-blur">
                <span className="bg-primary size-1.5 rounded-full" />
                shadcn/ui 호환 레지스트리 · Radix 기반 · 오픈 코드
              </div>
              <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-[3.4rem] lg:leading-[1.15]">
                공공 웹의 표준 KRDS를,
                <br />
                <span className="text-[#256EF4]">프로젝트 코드</span>로.
              </h1>
              <p className="text-muted-foreground mt-5 max-w-xl text-base text-balance sm:text-lg">
                krdscn/ui는 KRDS 디자인 가이드라인을 따르는 컴포넌트 소스를 shadcn/ui 레지스트리로 제공합니다. 설치하는
                순간 소스가 프로젝트 코드가 되고, 팀은 그 코드를 기준으로 일관된 KRDS UI를 만듭니다.
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
              <div className="bg-card mt-8 flex w-full max-w-xl items-center gap-3 rounded-lg border py-2 pr-2 pl-3 shadow-sm">
                <TerminalIcon className="text-muted-foreground size-4 shrink-0" />
                <code className="text-muted-foreground no-scrollbar flex-1 overflow-x-auto font-mono text-xs whitespace-nowrap sm:text-sm">
                  {installCommand}
                </code>
                <CopyButton value={installCommand} className="static shrink-0" />
              </div>
              <p className="text-muted-foreground mt-4 font-mono text-xs">
                {componentCount}개 컴포넌트 · 9개 카테고리 · KRDS 가이드라인 문서 {guidelineCount}편 · MIT 라이선스
              </p>
            </div>
            <div className="mx-auto w-full max-w-md lg:max-w-none">
              <ApplyFormDemo />
            </div>
          </div>
        </div>
      </section>

      {/* Live showcase */}
      <section className="container-wrapper px-4 py-16 md:py-20 xl:px-6">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">스크린샷이 아니라 컴포넌트입니다</h2>
              <p className="text-muted-foreground mt-2 max-w-2xl text-sm sm:text-base">
                아래 데모는 레지스트리에서 설치되는 소스 그대로 렌더링됩니다. 직접 눌러보세요.
              </p>
            </div>
            <Button asChild variant="ghost" size="sm" className="shrink-0 self-start sm:self-auto">
              <Link href="/docs/components">
                전체 컴포넌트 <ArrowRightIcon />
              </Link>
            </Button>
          </div>
          <ShowcaseBento />
        </div>
      </section>

      {/* How it works */}
      <section className="border-t">
        <div className="container-wrapper px-4 py-16 md:py-20 xl:px-6">
          <div className="mx-auto w-full max-w-6xl">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">세 단계면 충분합니다</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl text-sm sm:text-base">
              별도의 패키지 설치나 테마 설정 없이, shadcn CLI 워크플로 그대로 사용합니다.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {steps.map((item) => (
                <div key={item.step} className="bg-card flex flex-col gap-3 rounded-xl border p-6">
                  <span className="text-muted-foreground/60 font-mono text-sm font-medium">{item.step}</span>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground flex-1 text-sm">{item.description}</p>
                  <code className="bg-muted/60 text-muted-foreground no-scrollbar overflow-x-auto rounded-md px-3 py-2 font-mono text-xs whitespace-nowrap">
                    {item.code}
                  </code>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t">
        <div className="container-wrapper px-4 py-16 md:py-20 xl:px-6">
          <div className="mx-auto grid w-full max-w-6xl gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.title} className="flex flex-col gap-3">
                <div className="bg-muted/60 flex size-9 items-center justify-center rounded-lg border">
                  <feature.icon className="size-4.5" />
                </div>
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-muted/30 border-t">
        <div className="container-wrapper px-4 py-16 md:py-20 xl:px-6">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
              지금 프로젝트에 설치해 보세요
            </h2>
            <p className="text-muted-foreground mt-3 text-sm text-balance sm:text-base">
              컴포넌트 하나부터 전체 설치까지, 필요한 만큼만 가져가세요. 설치된 코드는 온전히 여러분의 것입니다.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/docs/installation">
                  설치 문서 보기 <ArrowRightIcon />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="https://github.com/krdscn-ui/ui" target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

import "@/app/globals.css"

import type { Metadata } from "next"
import localFont from "next/font/local"
import type { ReactNode } from "react"
import { RootProvider } from "fumadocs-ui/provider/next"

import { SiteHeader } from "@/components/site-header"
import { cn } from "@/lib/utils"
import { source } from "@/lib/source"

function normalizeBasePath(value?: string) {
  if (!value) return ""
  const withLeadingSlash = value.startsWith("/") ? value : `/${value}`
  return withLeadingSlash.replace(/\/$/, "")
}

const basePath = normalizeBasePath(process.env.GITHUB_PAGES_BASE_PATH)

export const metadata: Metadata = {
  title: {
    default: "krdscn/ui",
    template: "%s - krdscn/ui",
  },
  description: "KRDS 스타일을 적용한 Radix 기반 오픈 코드 레지스트리입니다.",
}

const pretendardGov = localFont({
  src: [{ path: "../assets/PretendardGOVVariable.woff2", weight: "45 920", style: "normal" }],
  variable: "--font-pretendard-gov",
})

const monoplexKr = localFont({
  src: [
    { path: "../assets/MonoplexKR/MonoplexKR-Thin.ttf", weight: "100", style: "normal" },
    { path: "../assets/MonoplexKR/MonoplexKR-ThinItalic.ttf", weight: "100", style: "italic" },
    { path: "../assets/MonoplexKR/MonoplexKR-ExtraLight.ttf", weight: "200", style: "normal" },
    { path: "../assets/MonoplexKR/MonoplexKR-ExtraLightItalic.ttf", weight: "200", style: "italic" },
    { path: "../assets/MonoplexKR/MonoplexKR-Light.ttf", weight: "300", style: "normal" },
    { path: "../assets/MonoplexKR/MonoplexKR-LightItalic.ttf", weight: "300", style: "italic" },
    { path: "../assets/MonoplexKR/MonoplexKR-Text.ttf", weight: "350", style: "normal" },
    { path: "../assets/MonoplexKR/MonoplexKR-TextItalic.ttf", weight: "350", style: "italic" },
    { path: "../assets/MonoplexKR/MonoplexKR-Regular.ttf", weight: "400", style: "normal" },
    { path: "../assets/MonoplexKR/MonoplexKR-Italic.ttf", weight: "400", style: "italic" },
    { path: "../assets/MonoplexKR/MonoplexKR-Medium.ttf", weight: "500", style: "normal" },
    { path: "../assets/MonoplexKR/MonoplexKR-MediumItalic.ttf", weight: "500", style: "italic" },
    { path: "../assets/MonoplexKR/MonoplexKR-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../assets/MonoplexKR/MonoplexKR-SemiBoldItalic.ttf", weight: "600", style: "italic" },
    { path: "../assets/MonoplexKR/MonoplexKR-Bold.ttf", weight: "700", style: "normal" },
    { path: "../assets/MonoplexKR/MonoplexKR-BoldItalic.ttf", weight: "700", style: "italic" },
  ],
  variable: "--font-monoplex-kr",
})

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning className={cn(pretendardGov.variable, monoplexKr.variable)}>
      <body className="group/body bg-background min-h-svh overscroll-none font-sans antialiased [--header-height:calc(var(--spacing)*14)]">
        <RootProvider
          i18n={{
            locale: "",
            translations: {
              search: "Docs 검색",
              searchNoResult: "검색 결과가 없습니다",
              toc: "이 페이지에서",
              tocNoHeadings: "표시할 제목이 없습니다",
              nextPage: "다음 페이지",
              previousPage: "이전 페이지",
              chooseTheme: "테마",
            },
          }}
          search={{
            options: {
              type: "static",
              api: `${basePath}/search.json`,
            },
          }}
        >
          <div className="bg-background relative z-10 flex min-h-svh flex-col">
            <SiteHeader tree={source.pageTree} />
            <main className="flex min-h-0 flex-1 flex-col">{children}</main>
          </div>
        </RootProvider>
      </body>
    </html>
  )
}

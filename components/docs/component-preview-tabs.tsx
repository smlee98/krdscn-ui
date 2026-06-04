"use client"

import * as React from "react"
import Link from "next/link"
import { InfoIcon } from "lucide-react"

import {
  LanguageProvider,
  LanguageSelector,
  useLanguageContext,
  useTranslation,
  type Translations,
} from "@/components/language-selector"
import { Button } from "@/components/ui/button"
import { DirectionProvider } from "@/components/ui/direction"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/cn"

const directionTranslations: Translations<Record<string, never>> = {
  en: {
    dir: "ltr",
    values: {},
  },
  ar: {
    dir: "rtl",
    values: {},
  },
  he: {
    dir: "rtl",
    values: {},
  },
}

export function ComponentPreviewTabs({
  className,
  previewClassName,
  align = "center",
  hideCode = false,
  chromeLessOnMobile = false,
  component,
  source,
  sourcePreview,
  direction = "ltr",
  ...props
}: React.ComponentProps<"div"> & {
  previewClassName?: string
  align?: "center" | "start" | "end"
  hideCode?: boolean
  chromeLessOnMobile?: boolean
  component: React.ReactNode
  source: React.ReactNode
  sourcePreview?: React.ReactNode
  direction?: "ltr" | "rtl"
}) {
  const [isCodeVisible, setIsCodeVisible] = React.useState(false)
  return (
    <div
      data-slot="component-preview"
      className={cn(
        "group relative mb-12 mt-4 flex flex-col overflow-hidden rounded-xl border bg-background",
        className
      )}
      {...props}
    >
      {direction === "rtl" ? (
        <LanguageProvider defaultLanguage="ar">
          <div className="flex h-16 items-center border-b px-4">
            <RtlLanguageSelector />
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon-sm" className="ml-auto">
                  <InfoIcon />
                  <span className="sr-only">번역 안내</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent side="bottom" align="end" className="w-56 text-xs">
                <div>이 예제의 RTL 문구는 데모 목적의 번역입니다.</div>
                <Separator className="-mx-2.5 w-auto!" />
                <div data-lang="ar">قد تحتوي الترجمة على أخطاء.</div>
                <Separator className="-mx-2.5 w-auto!" />
                <div data-lang="he">ייתכן שהתרגום מכיל שגיאות.</div>
              </PopoverContent>
            </Popover>
          </div>
          <PreviewWrapper align={align} chromeLessOnMobile={chromeLessOnMobile} previewClassName={previewClassName}>
            <DirectionProviderWrapper>{component}</DirectionProviderWrapper>
          </PreviewWrapper>
        </LanguageProvider>
      ) : (
        <DirectionProviderWrapper dir="ltr">
          <PreviewWrapper
            align={align}
            chromeLessOnMobile={chromeLessOnMobile}
            previewClassName={previewClassName}
            dir="ltr"
          >
            {component}
          </PreviewWrapper>
        </DirectionProviderWrapper>
      )}
      {!hideCode && (
        <div
          data-slot="code"
          data-code-visible={isCodeVisible}
          className="relative overflow-hidden **:data-[slot=copy-button]:right-4 **:data-[slot=copy-button]:hidden data-[code-visible=true]:**:data-[slot=copy-button]:flex [&_figure]:m-0! [&_figure]:rounded-none [&_figure]:border-0 [&_figure]:border-t [&_pre]:max-h-72"
        >
          {isCodeVisible ? (
            <>
              {direction === "rtl" && (
                <div className="relative z-10 no-scrollbar overflow-x-auto border-t bg-code p-6 font-mono text-sm text-muted-foreground">
                  <pre>{`// This site is not RTL by default, so this example uses dir and data-lang attributes.`}</pre>
                  <span>
                    {"// 자세한 내용은 "}
                    <Link href="/docs/rtl" className="underline underline-offset-4">
                      RTL 가이드
                    </Link>
                    {"를 참고하세요."}
                  </span>
                </div>
              )}
              {source}
            </>
          ) : (
            <div className="relative">
              {sourcePreview}
              <div className="pointer-events-none absolute inset-0 flex items-end justify-center pb-4">
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, var(--color-code), color-mix(in oklab, var(--color-code) 60%, transparent), transparent)",
                  }}
                />
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="pointer-events-auto relative z-10"
                  onClick={() => setIsCodeVisible(true)}
                >
                  코드 보기
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function RtlLanguageSelector({ className }: { className?: string }) {
  const context = useLanguageContext()

  if (!context) {
    return null
  }

  return <LanguageSelector value={context.language} onValueChange={context.setLanguage} className={className} />
}

function PreviewWrapper({
  align,
  chromeLessOnMobile,
  previewClassName,
  dir: explicitDir,
  children,
}: {
  align: "center" | "start" | "end"
  chromeLessOnMobile: boolean
  previewClassName?: string
  dir?: "ltr" | "rtl"
  children: React.ReactNode
}) {
  const translation = useTranslation(directionTranslations, "ar")
  const dir = explicitDir ?? translation.dir

  return (
    <div data-slot="preview" dir={dir} data-lang={dir === "rtl" ? translation.language : undefined}>
      <div
        data-align={align}
        data-chromeless={chromeLessOnMobile}
        className={cn(
          "preview relative flex min-h-72 w-full justify-center overflow-x-auto p-10 data-[align=center]:items-center data-[align=end]:items-end data-[align=start]:items-start data-[chromeless=true]:min-h-0 data-[chromeless=true]:p-0",
          previewClassName
        )}
      >
        {children}
      </div>
    </div>
  )
}

function DirectionProviderWrapper({
  dir: explicitDir,
  children,
}: {
  dir?: "ltr" | "rtl"
  children: React.ReactNode
}) {
  const translation = useTranslation(directionTranslations, "ar")
  const dir = explicitDir ?? translation.dir

  return <DirectionProvider dir={dir}>{children}</DirectionProvider>
}

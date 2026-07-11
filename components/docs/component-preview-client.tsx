"use client"

import * as React from "react"

import { ComponentPreviewTabs } from "@/components/docs/component-preview-tabs"
import { TooltipProvider } from "@/components/ui/tooltip"
import { EXAMPLE_REGISTRY } from "@/lib/example-registry"

export function ComponentPreviewClient({
  slug,
  name,
  className,
  previewClassName,
  align = "center",
  hideCode = false,
  chromeLessOnMobile = false,
  direction = "ltr",
  source,
  sourcePreview,
}: React.ComponentProps<"div"> & {
  slug: string
  name: string
  align?: "center" | "start" | "end"
  hideCode?: boolean
  chromeLessOnMobile?: boolean
  previewClassName?: string
  direction?: "ltr" | "rtl"
  source: React.ReactNode
  sourcePreview: React.ReactNode
}) {
  const Example = EXAMPLE_REGISTRY[`${slug}/${name}`]

  if (!Example) {
    return (
      <div className="bg-background text-muted-foreground my-6 rounded-xl border p-4 text-sm">
        예제{" "}
        <code>
          {slug}/{name}
        </code>
        를 찾을 수 없습니다.
        {source}
      </div>
    )
  }

  return (
    <ComponentPreviewTabs
      className={className}
      previewClassName={previewClassName}
      align={align}
      hideCode={hideCode}
      chromeLessOnMobile={chromeLessOnMobile}
      direction={direction}
      component={
        <TooltipProvider>
          <Example />
        </TooltipProvider>
      }
      source={source}
      sourcePreview={sourcePreview}
    />
  )
}

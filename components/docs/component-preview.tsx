import * as React from "react"

import { ComponentPreviewClient } from "@/components/docs/component-preview-client"
import { ComponentSource } from "@/components/docs/component-source"

export function ComponentPreview({
  slug,
  name,
  className,
  previewClassName,
  align = "center",
  hideCode = false,
  chromeLessOnMobile = false,
  styleName: _styleName,
  direction = "ltr",
  caption,
}: React.ComponentProps<"div"> & {
  slug: string
  name: string
  styleName?: string
  align?: "center" | "start" | "end"
  description?: string
  hideCode?: boolean
  type?: "block" | "component" | "example"
  chromeLessOnMobile?: boolean
  previewClassName?: string
  direction?: "ltr" | "rtl"
  caption?: string
}) {
  void _styleName

  const title = `examples/${slug}/${name}.tsx`

  const content = (
    <ComponentPreviewClient
      slug={slug}
      name={name}
      className={className}
      previewClassName={previewClassName}
      align={align}
      hideCode={hideCode}
      chromeLessOnMobile={chromeLessOnMobile}
      direction={direction}
      source={<ComponentSource slug={slug} name={name} title={title} collapsible={false} />}
      sourcePreview={<ComponentSource slug={slug} name={name} title={title} collapsible={false} maxLines={3} />}
    />
  )

  if (!caption) {
    return content
  }

  return (
    <figure data-hide-code={hideCode} className="flex flex-col data-[hide-code=true]:gap-4">
      {content}
      <figcaption className="text-muted-foreground -mt-8 text-center text-sm data-[hide-code=true]:mt-0">
        {caption}
      </figcaption>
    </figure>
  )
}

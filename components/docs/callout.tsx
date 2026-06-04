import { InfoIcon } from "lucide-react"

import { cn } from "@/lib/cn"

export function Callout({
  children,
  title,
  icon,
  className,
}: {
  children: React.ReactNode
  title?: React.ReactNode
  icon?: React.ReactNode
  variant?: "info" | "warning" | "default"
  className?: string
}) {
  return (
    <div className={cn("my-6 flex gap-3 rounded-lg border bg-muted/40 p-4 text-sm", className)}>
      <div className="mt-0.5 text-muted-foreground">{icon ?? <InfoIcon className="size-4" />}</div>
      <div className="min-w-0 flex-1">
        {title ? <p className="mb-1 font-medium text-foreground">{title}</p> : null}
        <div className="text-muted-foreground [&>p:first-child]:mt-0 [&>p:last-child]:mb-0">{children}</div>
      </div>
    </div>
  )
}

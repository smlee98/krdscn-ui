import { cn } from "@/lib/cn"
import * as React from "react"

function ShadcnLogo({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg data-slot="shadcn-logo" viewBox="0 0 256 256" className={cn("size-5", className)} {...props}>
      <path fill="none" d="M0 0h256v256H0z" />
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="m208 128-80 80M192 40 40 192"
      />
    </svg>
  )
}

export { ShadcnLogo }

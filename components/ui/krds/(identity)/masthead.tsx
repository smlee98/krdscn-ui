// rsc:safe
import * as React from "react"
import { cn } from "@/lib/cn"

type MastheadProps = {
  className?: string
  notice?: React.ReactNode
}

function Masthead({ className, notice = "이 누리집은 대한민국 공식 전자정부 누리집입니다." }: MastheadProps) {
  return (
    <div
      data-slot="krds-masthead"
      className={cn("bg-krds-surface-secondary-subtle flex h-8 w-full items-center", className)}
    >
      {/* KRDS .inner (_reset.scss:303-307): max-width contents-wrap-size(1248px) + 24px side padding, centered. */}
      <div className="text-krds-foreground text-krds-body-sm mx-auto flex w-full max-w-[1248px] items-center gap-2 px-6">
        <KoreanFlagIcon className="h-4 w-6 shrink-0" />
        <p className="whitespace-nowrap">{notice}</p>
      </div>
    </div>
  )
}

function KoreanFlagIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 16" fill="none" className={className} aria-hidden="true">
      <g clipPath="url(#krds-masthead-flag)">
        <path fill="#fff" d="M0 0h24v16H0z" />
        <path fill="#d0303c" d="M8.672 5.781a4 4 0 0 1 6.656 4.438z" />
        <path fill="#134a9d" d="M8.672 5.781a4 4 0 1 0 6.656 4.438A2 2 0 0 0 12 8z" />
        <path fill="#d0303c" d="M12 8a2 2 0 1 0-3.328-2.219A2 2 0 0 0 12 8.001" />
        <path
          fill="#000"
          d="m3.68 4.857 2.219-3.329.554.37-2.219 3.328zm.832.554L6.73 2.083l.554.37L5.067 5.78zm.832.555 2.219-3.328.554.37L5.9 6.336zM19.304 12.669l1.017-1.526-.555-.37-1.017 1.526zM18.472 12.114l1.017-1.526-.555-.37-1.017 1.526zM17.732 12.021l.555.37-1.017 1.526-.555-.37zM17.64 11.56l1.017-1.526-.555-.37-1.017 1.525zM16.9 11.467l.555.37-1.017 1.525-.555-.37zM18.564 12.576l.555.37-1.017 1.525-.555-.37zM17.455 4.163l-1.017-1.525-.555.37L16.9 4.533zM17.085 4.81l1.017 1.526.555-.37-1.017-1.525zM18.934 5.781l-2.219-3.328.555-.37 2.219 3.328zM19.766 5.226l-1.017-1.525.555-.37 1.017 1.526zM19.119 3.054l-.555.37-1.017-1.526.555-.37zM3.68 11.143l2.218 3.329.555-.37-2.219-3.328zM5.714 12.391l1.017 1.526.554-.37-1.017-1.525zM5.529 12.114l.554-.37-1.017-1.525-.554.37zM5.344 10.034l2.219 3.328.554-.37-2.219-3.328z"
        />
      </g>
      <defs>
        <clipPath id="krds-masthead-flag">
          <path fill="#fff" d="M0 0h24v16H0z" />
        </clipPath>
      </defs>
    </svg>
  )
}

export { Masthead, KoreanFlagIcon }
export type { MastheadProps }

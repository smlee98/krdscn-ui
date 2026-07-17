// rsc:client
"use client"
/**
 * KRDS TextList — composes a native ul/ol with KRDS bullet styling.
 *
 * Figma source: KRDS_v1.0.0 — node 727:14880 (list_group)
 *  - 3 levels × 2 types (ordered | unordered)
 *  - type prop maps to a (variant, level, bullet, font-size) tuple:
 *      disc       → unordered L1, 6×6 filled rounded square, 17px
 *      dash       → unordered L2, 6×1.2 dash,                 17px
 *      hollow     → unordered L3, 4×4 hollow border square,   15px
 *      decimal    → ordered  L1, "1.",                        17px
 *      ordered    → alias of decimal (back-compat)
 *      alpha      → ordered  L2, "a.",                        17px (15px marker)
 *      circle-num → ordered  L3, "①",                         15px (13px marker)
 *
 * All text uses color/text/subtle (#464c53), bullets use the matching icon palette.
 * Nesting: render <TextList> inside a <TextListItem> — each nested list resets its own
 * type context. Indentation is left to the caller via className.
 */
import * as React from "react"
import { cn } from "@/lib/utils"

export type TextListType = "disc" | "dash" | "hollow" | "decimal" | "alpha" | "circle-num" | "ordered"

const TYPE_TO_LEVEL: Record<TextListType, 1 | 2 | 3> = {
  disc: 1,
  decimal: 1,
  ordered: 1,
  dash: 2,
  alpha: 2,
  hollow: 3,
  "circle-num": 3,
}

const ORDERED_TYPES = new Set<TextListType>(["decimal", "ordered", "alpha", "circle-num"])

const TextListTypeContext = React.createContext<TextListType>("disc")
const TextListIndexContext = React.createContext<number | null>(null)

export type TextListProps = Omit<React.HTMLAttributes<HTMLUListElement | HTMLOListElement>, "type"> & {
  type?: TextListType
}

export type TextListItemProps = React.ComponentProps<"li"> & {
  number?: string
}

function TextList({ type = "disc", className, children, ...rest }: TextListProps) {
  const ordered = ORDERED_TYPES.has(type)
  const Tag = ordered ? "ol" : "ul"
  const level = TYPE_TO_LEVEL[type]
  const gap = level === 1 ? "gap-3" : "gap-2"
  // KRDS depth별 들여쓰기(32/24/20px)와 중첩 리스트 상단 마진(L2 16px/L3 12px)을 기본 내장 —
  // 호출자는 className으로 오버라이드 가능 (_text_list.scss:7-9,52-62).
  const paddingLeft = level === 1 ? "pl-8" : level === 2 ? "pl-6" : "pl-5"
  const nestedMarginTop = level === 2 ? "mt-4" : level === 3 ? "mt-3" : ""

  const items = ordered
    ? React.Children.map(children, (child, idx) =>
        React.isValidElement(child) ? (
          <TextListIndexContext.Provider key={idx} value={idx + 1}>
            {child}
          </TextListIndexContext.Provider>
        ) : (
          child
        )
      )
    : children

  return (
    <TextListTypeContext.Provider value={type}>
      <Tag
        data-slot="krds-text-list"
        data-type={type}
        className={cn(
          "text-krds-foreground-subtle flex list-none flex-col",
          paddingLeft,
          gap,
          nestedMarginTop,
          className
        )}
        {...(rest as React.HTMLAttributes<HTMLOListElement>)}
      >
        {items}
      </Tag>
    </TextListTypeContext.Provider>
  )
}

const CIRCLED_NUMS = ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨", "⑩", "⑪", "⑫", "⑬", "⑭", "⑮"]

function Bullet({ type, idx, explicit }: { type: TextListType; idx: number | null; explicit?: string }) {
  if (explicit !== undefined) {
    return (
      <span aria-hidden="true" className="text-krds-body-md shrink-0">
        {explicit}.
      </span>
    )
  }
  switch (type) {
    case "disc":
      return (
        <span aria-hidden="true" className="bg-krds-gray-70 mt-[10px] inline-block size-1.5 shrink-0 rounded-full" />
      )
    case "dash":
      return <span aria-hidden="true" className="bg-krds-gray-70 mt-[12px] inline-block h-px w-1.5 shrink-0" />
    case "hollow":
      return (
        <span
          aria-hidden="true"
          // KRDS hollow 마커 보더는 depth1 텍스트 색(text-subtle=gray-70)과 동일 토큰 사용 (_text_list.scss:106)
          className="border-krds-foreground-subtle mt-[9px] inline-block size-1 shrink-0 rounded-full border"
        />
      )
    case "decimal":
    case "ordered":
      return (
        <span aria-hidden="true" className="text-krds-body-md shrink-0">
          {idx ?? 1}.
        </span>
      )
    case "alpha":
      return (
        <span aria-hidden="true" className="text-krds-body-sm shrink-0">
          {String.fromCharCode(96 + (idx ?? 1))}.
        </span>
      )
    case "circle-num":
      return (
        <span aria-hidden="true" className="text-krds-body-xs shrink-0">
          {CIRCLED_NUMS[(idx ?? 1) - 1] ?? `${idx ?? 1}.`}
        </span>
      )
  }
}

function TextListItem({ className, number, children, ...props }: TextListItemProps) {
  const type = React.useContext(TextListTypeContext)
  const idx = React.useContext(TextListIndexContext)
  const level = TYPE_TO_LEVEL[type]
  const itemGap = level === 1 ? "gap-2" : "gap-1"
  const textSize = level === 3 ? "text-krds-body-sm" : "text-krds-body-md"

  return (
    <li
      data-slot="krds-text-list-item"
      className={cn("flex items-start leading-[1.5] break-words", itemGap, textSize, className)}
      {...props}
    >
      <Bullet type={type} idx={idx} explicit={number} />
      <span className="min-w-0 flex-1">{children}</span>
    </li>
  )
}

export { TextList, TextListItem }

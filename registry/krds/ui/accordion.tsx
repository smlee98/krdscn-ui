// rsc:client
"use client"
/**
 * KRDS Accordion — composes radix-ui Accordion primitives directly.
 *
 * 기준: KRDS uiux 웹 소스 (_accordion.scss / accordion.html / accordion_line.html)
 *  - variant: "default" | "line"
 *  - size: "large" | "medium" — KRDS 웹엔 사이즈 변형이 없고 PC/모바일 반응형만 존재한다.
 *    large = PC 스펙(패딩 24px·아이콘 24px), medium = 모바일 스펙(패딩 16px·아이콘 20px)
 *    프리셋으로 매핑한 프로젝트 확장. 버튼 폰트는 heading-xsmall 17px로 PC/모바일 동일.
 *  - 상태 사다리(KRDS action-secondary 체인): 닫힘 = 투명, hover = secondary-5,
 *    pressed = secondary-10, 열림 = secondary-5 (헤더+바디 균일).
 *  - default: 컨테이너 상·하 1px 헤어라인(gray-20) + 4px 패딩, 아이템 연속 배치.
 *  - line: 아이템별 상단 보더, 열림 시 gray-50 강조, 컨테이너 하단 보더 유지.
 *  - Open/closed state driven by Radix data-state on each item.
 */

import * as React from "react"
import { Accordion as AccordionPrimitive } from "radix-ui"
import { ChevronDownIcon } from "lucide-react"
import { cn } from "@/lib/utils"

// ─── Types ───────────────────────────────────────────────────────────────────

type AccordionVariant = "default" | "line"
type AccordionSize = "large" | "medium"

type AccordionContextValue = { variant: AccordionVariant; size: AccordionSize }

type AccordionProps = Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> & {
  variant?: AccordionVariant
  size?: AccordionSize
  allowMultiple?: boolean
  value?: string[]
  onChange?: (values: string[]) => void
  defaultValue?: string[]
  children: React.ReactNode
}

type AccordionItemProps = Omit<React.HTMLAttributes<HTMLDivElement>, "title"> & {
  value: string
  children: React.ReactNode
}

type AccordionHeaderProps = Omit<React.HTMLAttributes<HTMLElement>, "onClick"> & {
  children: React.ReactNode
  onClick?: () => void
}

type AccordionPanelProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode
}

// ─── Context ─────────────────────────────────────────────────────────────────

const AccordionContext = React.createContext<AccordionContextValue>({
  variant: "default",
  size: "large",
})

// ─── Accordion (Root) ─────────────────────────────────────────────────────────

function Accordion({
  variant = "default",
  size = "large",
  allowMultiple = true,
  value,
  onChange,
  defaultValue,
  children,
  className,
  dir,
  ...rest
}: AccordionProps) {
  const isLine = variant === "line"
  const radixDir = dir as "ltr" | "rtl" | undefined

  const commonProps = {
    "data-slot": "krds-accordion",
    "data-variant": variant,
    "data-size": size,
    className: cn(
      "flex flex-col",
      // KRDS: default 는 리스트 상·하 헤어라인 + 4px 패딩(연속 배치),
      // line 은 컨테이너 상단 보더만 제거하고 하단 보더는 유지(마지막 아이템 밑줄).
      isLine ? "border-b border-krds-border-light" : "border-y border-krds-border-light py-1",
      className
    ),
    dir: radixDir,
    ...rest,
  }

  return (
    <AccordionContext.Provider value={{ variant, size }}>
      {allowMultiple ? (
        <AccordionPrimitive.Root
          type="multiple"
          value={value}
          defaultValue={defaultValue}
          onValueChange={(vals) => onChange?.(vals)}
          {...commonProps}
        >
          {children}
        </AccordionPrimitive.Root>
      ) : (
        <AccordionPrimitive.Root
          type="single"
          collapsible
          value={value?.[0]}
          defaultValue={defaultValue?.[0]}
          onValueChange={(val) => onChange?.(val ? [val] : [])}
          {...commonProps}
        >
          {children}
        </AccordionPrimitive.Root>
      )}
    </AccordionContext.Provider>
  )
}

// ─── AccordionItem ────────────────────────────────────────────────────────────

function AccordionItem({ value, children, className, ...rest }: AccordionItemProps) {
  const { variant } = React.useContext(AccordionContext)
  const isLine = variant === "line"

  return (
    <AccordionPrimitive.Item
      data-slot="krds-accordion-item"
      value={value}
      className={cn(
        // KRDS .accordion-item: 상하 4px 패딩(양 변형 공통), 배경 없음 — fill 은 trigger/panel 이 담당.
        "py-1 transition-colors",
        isLine && [
          "overflow-hidden",
          // top divider only — bottom comes from next item's top (마지막은 컨테이너 border-b)
          "border-krds-border-light border-t border-b-0",
          // 열림 시 상단 구분선 강조 — KRDS divider-gray-dark = gray-50 (라이트/고대비 동일값이라 numeric 사용)
          "data-[state=open]:border-krds-gray-50",
        ],
        className
      )}
      {...rest}
    >
      {children}
    </AccordionPrimitive.Item>
  )
}

// ─── AccordionHeader ──────────────────────────────────────────────────────────

function AccordionHeader({ children, onClick, className, ...rest }: AccordionHeaderProps) {
  const { variant, size } = React.useContext(AccordionContext)
  const isLine = variant === "line"
  const isLarge = size === "large"

  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="krds-accordion-header"
        onClick={onClick}
        className={cn(
          // base layout — 아이콘은 KRDS 처럼 첫 줄 상단 기준 정렬(items-start)
          "focus-visible:krds-focus-ring flex w-full items-start justify-between gap-4 transition-colors outline-none",
          "hover:no-underline disabled:pointer-events-none disabled:opacity-50",
          // typography — KRDS heading-xsmall 17px (PC/모바일 동일)
          "text-krds-foreground text-krds-heading-xs text-left leading-[1.5] font-bold",
          // open-state title color → secondary darker
          "data-[state=open]:text-krds-foreground-secondary",
          // KRDS action-secondary 상태 사다리: 닫힘 투명 → hover secondary-5 → pressed secondary-10
          "hover:bg-krds-surface-secondary-subtle active:bg-krds-surface-secondary-pressed bg-transparent",
          // padding — default: PC 24px / 모바일 16px, line: PC 20px / 모바일 12px
          isLine ? (isLarge ? "py-5" : "py-3") : isLarge ? "p-6" : "p-4",
          isLine
            ? [
                // line 열림: KRDS .type-line .btn-accordion.active { background: none }
                "data-[state=open]:bg-transparent data-[state=open]:hover:bg-transparent",
              ]
            : [
                // default: KRDS .btn-accordion radius(10px) 로 focus ring 모서리 정렬.
                "rounded-[10px]",
                // 열림 = secondary-5 (hover 와 동일 단계) — panel 과 균일한 한 톤의 카드.
                // 열림 시 하단 모서리를 펴 panel 과 맞닿게 한다(focus 시엔 다시 radius 복원).
                "data-[state=open]:bg-krds-surface-secondary-subtle",
                "data-[state=open]:rounded-b-none focus-visible:data-[state=open]:rounded-[10px]",
              ],
          // chevron rotation on open
          "[&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...(rest as React.HTMLAttributes<HTMLButtonElement>)}
      >
        {children}
        <ChevronDownIcon
          aria-hidden
          className={cn(
            // KRDS icon: PC 24px / 모바일 20px
            "text-krds-foreground shrink-0 transition-transform duration-200",
            isLarge ? "size-6" : "size-5"
          )}
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

// ─── AccordionPanel ───────────────────────────────────────────────────────────

function AccordionPanel({ children, className, ...rest }: AccordionPanelProps) {
  const { variant, size } = React.useContext(AccordionContext)
  const isLine = variant === "line"
  const isLarge = size === "large"

  return (
    <AccordionPrimitive.Content
      data-slot="krds-accordion-panel"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden"
      {...rest}
    >
      <div
        className={cn(
          // KRDS .accordion-body padding: 0 24px 24px (모바일 0 16px 16px). line 은 좌우 0.
          isLine ? (isLarge ? "px-0 pt-0 pb-6" : "px-0 pt-0 pb-4") : isLarge ? "px-6 pt-0 pb-6" : "px-4 pt-0 pb-4",
          // default: 열림 시 헤더와 같은 secondary-5 로 균일한 카드 + 하단 radius.
          !isLine && "bg-krds-surface-secondary-subtle rounded-b-[10px]",
          "text-krds-foreground text-krds-body-md",
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionHeader, AccordionPanel }
export type {
  AccordionVariant,
  AccordionSize,
  AccordionProps,
  AccordionItemProps,
  AccordionHeaderProps,
  AccordionPanelProps,
}

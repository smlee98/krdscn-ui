// rsc:safe
import * as React from "react"
import { ChevronRight } from "lucide-react"
import { Button } from "@/registry/krds/ui/button"
import { cn } from "@/lib/utils"

type StructuredListVariant = "vertical" | "horizontal"
type StructuredListSize = "sm" | "md" | "lg"

// ─── Group (list container) ─────────────────────────────────────────────────────

export type StructuredListGroupProps = {
  className?: string
  children?: React.ReactNode
}

/**
 * KRDS list container (`<ul class="krds-structured-list">`). Wraps one or more
 * `<StructuredList>` cards, each of which renders as an `<li>`.
 *
 * [의도적 이탈] KRDS 원본은 컨테이너에 3열(태블릿 2열/모바일 1열) 그리드를 강제하지만,
 * 이 컴포넌트는 세로 스택을 기본으로 두고 열 배치는 사용처에 위임한다
 * (예: `<StructuredListGroup className="grid grid-cols-3 …">`). 카드가 w-full 로
 * 트랙을 채우므로 어떤 레이아웃에서도 동작한다.
 */
function StructuredListGroup({ className, children }: StructuredListGroupProps) {
  return (
    <ul
      data-slot="krds-structured-list-group"
      role="list"
      className={cn("flex w-full list-none flex-col gap-6 p-0", className)}
    >
      {children}
    </ul>
  )
}

// ─── Root (card item) ─────────────────────────────────────────────────────────

export type StructuredListProps = {
  variant?: StructuredListVariant
  /** Card padding scale (KRDS `.sm/.md/.lg`). Default `md` matches the current look. */
  size?: StructuredListSize
  /** Render as a selectable (checkbox-bearing) card. */
  selectable?: boolean
  /**
   * Selected/checked highlight border (KRDS `.is-check`). Only meaningful when `selectable`.
   * Purely visual — the accessible checked state belongs to the real checkbox control
   * consumers place inside `StructuredListCheck`; the `<li>`'s implicit `listitem` role
   * doesn't support `aria-checked` (KRDS 원본도 `<li>`에 aria-checked를 두지 않는다).
   */
  checked?: boolean
  className?: string
  children?: React.ReactNode
}

function StructuredList({
  variant = "vertical",
  size = "md",
  selectable = false,
  checked = false,
  className,
  children,
}: StructuredListProps) {
  return (
    <li
      data-slot="krds-structured-list"
      data-variant={variant}
      data-size={size}
      data-selectable={selectable || undefined}
      data-checked={checked || undefined}
      className={cn(
        "group/structured-list border-krds-border bg-krds-surface list-none overflow-hidden rounded-[12px] border",
        // relative: .card-btn(StructuredListActions)의 절대 배치 기준
        "relative flex w-full flex-col",
        "data-[variant=horizontal]:col-span-full data-[variant=horizontal]:flex-row",
        // KRDS .is-check: transparent border + primary outline ring on selected card
        "data-[checked]:outline-krds-border-primary data-[checked]:border-transparent data-[checked]:outline-2",
        className
      )}
    >
      {children}
    </li>
  )
}

// ─── Check area (selectable wrapper) ────────────────────────────────────────────

export type StructuredListCheckProps = {
  className?: string
  children?: React.ReactNode
}

/**
 * KRDS `.krds-check-area` — wraps the checkbox control for a selectable card.
 * Pass your checkbox (or any control) as children.
 */
function StructuredListCheck({ className, children }: StructuredListCheckProps) {
  return (
    <div data-slot="krds-structured-list-check" className={cn("flex shrink-0 items-start p-8 pb-0", className)}>
      {children}
    </div>
  )
}

// ─── Image ────────────────────────────────────────────────────────────────────

export type StructuredListImageProps = {
  src: string
  alt: string
  className?: string
}

function StructuredListImage({ src, alt, className }: StructuredListImageProps) {
  return (
    <img
      data-slot="krds-structured-list-image"
      src={src}
      alt={alt}
      className={cn(
        "bg-krds-surface-subtler shrink-0 object-cover",
        "h-[216px] w-full",
        "group-data-[variant=horizontal]/structured-list:h-auto group-data-[variant=horizontal]/structured-list:w-[320px] group-data-[variant=horizontal]/structured-list:self-stretch",
        className
      )}
    />
  )
}

// ─── Body ─────────────────────────────────────────────────────────────────────

export type StructuredListBodyProps = {
  className?: string
  children?: React.ReactNode
}

function StructuredListBody({ className, children }: StructuredListBodyProps) {
  return (
    <div
      data-slot="krds-structured-list-body"
      className={cn(
        "flex flex-1 flex-col gap-6",
        // KRDS card padding scale, driven by the card's data-size (default md = p-8)
        "p-8",
        "group-data-[size=sm]/structured-list:p-6",
        "group-data-[size=lg]/structured-list:p-10",
        className
      )}
    >
      {children}
    </div>
  )
}

// ─── Header ───────────────────────────────────────────────────────────────────

export type StructuredListHeaderProps = {
  className?: string
  children?: React.ReactNode
}

function StructuredListHeader({ className, children }: StructuredListHeaderProps) {
  return (
    <header data-slot="krds-structured-list-header" className={cn("flex flex-col gap-3", className)}>
      {children}
    </header>
  )
}

// ─── Badge ────────────────────────────────────────────────────────────────────

export type StructuredListBadgeProps = {
  className?: string
  children?: React.ReactNode
}

function StructuredListBadge({ className, children }: StructuredListBadgeProps) {
  return (
    <span
      data-slot="krds-structured-list-badge"
      className={cn(
        "bg-krds-surface-primary-subtle inline-flex h-6 items-center self-start rounded-[4px] px-2",
        "text-krds-body-sm text-krds-foreground-primary",
        className
      )}
    >
      {children}
    </span>
  )
}

// ─── Title ────────────────────────────────────────────────────────────────────

export type StructuredListTitleProps = {
  className?: string
  children?: React.ReactNode
  /** Trailing arrow icon (default: true) */
  withArrow?: boolean
}

function StructuredListTitle({ className, children, withArrow = true }: StructuredListTitleProps) {
  return (
    <h3
      data-slot="krds-structured-list-title"
      className={cn(
        // KRDS .c-tit: 아이콘은 타이틀 텍스트 바로 뒤에 붙는 chevron(ico_angle -90°),
        // gap = --card-body-title-gap = gap-1 토큰 = 2px (_structured_list.scss)
        "text-krds-foreground flex items-center gap-0.5 font-bold",
        "text-krds-heading-sm group-data-[variant=horizontal]/structured-list:text-krds-heading-md",
        className
      )}
    >
      <span className="line-clamp-1">{children}</span>
      {withArrow ? <ChevronRight size={24} aria-hidden="true" className="shrink-0" /> : null}
    </h3>
  )
}

// ─── Description ──────────────────────────────────────────────────────────────

export type StructuredListDescriptionProps = {
  className?: string
  children?: React.ReactNode
}

function StructuredListDescription({ className, children }: StructuredListDescriptionProps) {
  return (
    <p
      data-slot="krds-structured-list-description"
      className={cn("text-krds-foreground-subtle text-krds-body-md line-clamp-3", className)}
    >
      {children}
    </p>
  )
}

// ─── Period ───────────────────────────────────────────────────────────────────

export type StructuredListPeriodProps = {
  className?: string
  /** Bold leading label (default: "기간") */
  label?: string
  children?: React.ReactNode
}

function StructuredListPeriod({ className, label = "기간", children }: StructuredListPeriodProps) {
  return (
    <p
      data-slot="krds-structured-list-period"
      className={cn("text-krds-foreground text-krds-body-md flex flex-wrap items-baseline gap-2", className)}
    >
      <span className="font-bold">{label}</span>
      <span>{children}</span>
    </p>
  )
}

// ─── Metadata (auto-inserts vertical dividers) ────────────────────────────────

export type StructuredListMetadataProps = {
  className?: string
  children?: React.ReactNode
}

function StructuredListMetadata({ className, children }: StructuredListMetadataProps) {
  const items = React.Children.toArray(children).filter(React.isValidElement)
  return (
    <ul data-slot="krds-structured-list-metadata" className={cn("flex flex-wrap items-center gap-3", className)}>
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          {idx > 0 ? <span aria-hidden="true" className="bg-krds-surface-disabled inline-block h-4 w-px" /> : null}
          {item}
        </React.Fragment>
      ))}
    </ul>
  )
}

export type StructuredListMetadataItemProps = {
  className?: string
  children?: React.ReactNode
}

function StructuredListMetadataItem({ className, children }: StructuredListMetadataItemProps) {
  return (
    <li
      data-slot="krds-structured-list-metadata-item"
      className={cn("text-krds-foreground-subtle text-krds-body-sm", className)}
    >
      {children}
    </li>
  )
}

// ─── Actions row ──────────────────────────────────────────────────────────────

export type StructuredListActionsProps = {
  className?: string
  children?: React.ReactNode
}

function StructuredListActions({ className, children }: StructuredListActionsProps) {
  return (
    <div
      data-slot="krds-structured-list-actions"
      className={cn(
        // KRDS .card-btn: 카드 우상단 절대 배치(top/right = gap-8 = 32px, md 기준 —
        // _structured_list.scss:96-97,267-274). 하단 바가 아니라 공유하기/찜하기류
        // 텍스트 버튼을 카드 오른쪽 위에 나열한다.
        "absolute top-8 right-8 flex items-center gap-6",
        className
      )}
    >
      {children}
    </div>
  )
}

// ─── Sub-actions group ────────────────────────────────────────────────────────

export type StructuredListSubActionsProps = {
  className?: string
  children?: React.ReactNode
}

function StructuredListSubActions({ className, children }: StructuredListSubActionsProps) {
  return (
    <div data-slot="krds-structured-list-sub-actions" className={cn("flex items-center gap-4", className)}>
      {children}
    </div>
  )
}

// ─── Sub-action (icon + label text button) ────────────────────────────────────

export type StructuredListSubActionProps = {
  className?: string
  children?: React.ReactNode
  icon?: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  type?: "button" | "submit" | "reset"
  "aria-pressed"?: boolean
  "aria-label"?: string
}

function StructuredListSubAction({
  className,
  children,
  icon,
  onClick,
  type = "button",
  "aria-pressed": ariaPressed,
  "aria-label": ariaLabel,
}: StructuredListSubActionProps) {
  return (
    <Button
      variant="text"
      size="sm"
      type={type}
      data-slot="krds-structured-list-sub-action"
      aria-pressed={ariaPressed}
      aria-label={ariaLabel}
      onClick={onClick}
      className={cn("h-8 gap-1", className)}
    >
      {icon ? (
        <span aria-hidden="true" className="shrink-0">
          {icon}
        </span>
      ) : null}
      <span>{children}</span>
    </Button>
  )
}

// ─── Tag list ─────────────────────────────────────────────────────────────────

export type StructuredListTagListProps = {
  className?: string
  children?: React.ReactNode
}

function StructuredListTagList({ className, children }: StructuredListTagListProps) {
  return (
    <ul
      data-slot="krds-structured-list-tag-list"
      className={cn("border-krds-border-light flex flex-wrap items-center gap-2 border-t pt-4", className)}
    >
      {children}
    </ul>
  )
}

export type StructuredListTagProps = {
  className?: string
  children?: React.ReactNode
}

function StructuredListTag({ className, children }: StructuredListTagProps) {
  return (
    <li
      data-slot="krds-structured-list-tag"
      className={cn(
        "border-krds-border-light text-krds-foreground-subtle bg-krds-surface inline-flex h-8 items-center rounded-full border px-3",
        "text-krds-body-sm",
        className
      )}
    >
      {children}
    </li>
  )
}

export {
  StructuredList,
  StructuredListGroup,
  StructuredListCheck,
  StructuredListImage,
  StructuredListBody,
  StructuredListHeader,
  StructuredListBadge,
  StructuredListTitle,
  StructuredListDescription,
  StructuredListPeriod,
  StructuredListMetadata,
  StructuredListMetadataItem,
  StructuredListActions,
  StructuredListSubAction,
  StructuredListSubActions,
  StructuredListTagList,
  StructuredListTag,
}

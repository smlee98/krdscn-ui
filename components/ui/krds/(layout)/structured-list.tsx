// rsc:safe
import * as React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/dynamic/button";
import { cn } from "@/lib/cn";

type StructuredListVariant = "vertical" | "horizontal";
type StructuredListSize = "sm" | "md" | "lg";

// ─── Group (list container) ─────────────────────────────────────────────────────

export type StructuredListGroupProps = {
  className?: string;
  children?: React.ReactNode;
};

/**
 * KRDS list container (`<ul class="krds-structured-list">`). Wraps one or more
 * `<StructuredList>` cards, each of which renders as an `<li>`.
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
  );
}

// ─── Root (card item) ─────────────────────────────────────────────────────────

export type StructuredListProps = {
  variant?: StructuredListVariant;
  /** Card padding scale (KRDS `.sm/.md/.lg`). Default `md` matches the current look. */
  size?: StructuredListSize;
  /** Render as a selectable (checkbox-bearing) card. */
  selectable?: boolean;
  /** Selected/checked highlight border (KRDS `.is-check`). Only meaningful when `selectable`. */
  checked?: boolean;
  className?: string;
  children?: React.ReactNode;
};

function StructuredList({
  variant = "vertical",
  size = "md",
  selectable = false,
  checked = false,
  className,
  children
}: StructuredListProps) {
  return (
    <li
      data-slot="krds-structured-list"
      data-variant={variant}
      data-size={size}
      data-selectable={selectable || undefined}
      data-checked={checked || undefined}
      aria-checked={selectable ? checked : undefined}
      className={cn(
        "group/structured-list list-none overflow-hidden rounded-[12px] border border-krds-border bg-krds-surface",
        "flex w-[384px] flex-col",
        "data-[variant=horizontal]:w-[1200px] data-[variant=horizontal]:max-w-full data-[variant=horizontal]:flex-row",
        // KRDS .is-check: transparent border + primary outline ring on selected card
        "data-[checked]:border-transparent data-[checked]:outline-2 data-[checked]:outline-krds-border-primary",
        className
      )}
    >
      {children}
    </li>
  );
}

// ─── Check area (selectable wrapper) ────────────────────────────────────────────

export type StructuredListCheckProps = {
  className?: string;
  children?: React.ReactNode;
};

/**
 * KRDS `.krds-check-area` — wraps the checkbox control for a selectable card.
 * Pass your checkbox (or any control) as children.
 */
function StructuredListCheck({ className, children }: StructuredListCheckProps) {
  return (
    <div data-slot="krds-structured-list-check" className={cn("flex shrink-0 items-start p-8 pb-0", className)}>
      {children}
    </div>
  );
}

// ─── Image ────────────────────────────────────────────────────────────────────

export type StructuredListImageProps = {
  src: string;
  alt: string;
  className?: string;
};

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
  );
}

// ─── Body ─────────────────────────────────────────────────────────────────────

export type StructuredListBodyProps = {
  className?: string;
  children?: React.ReactNode;
};

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
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────

export type StructuredListHeaderProps = {
  className?: string;
  children?: React.ReactNode;
};

function StructuredListHeader({ className, children }: StructuredListHeaderProps) {
  return (
    <header data-slot="krds-structured-list-header" className={cn("flex flex-col gap-3", className)}>
      {children}
    </header>
  );
}

// ─── Badge ────────────────────────────────────────────────────────────────────

export type StructuredListBadgeProps = {
  className?: string;
  children?: React.ReactNode;
};

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
  );
}

// ─── Title ────────────────────────────────────────────────────────────────────

export type StructuredListTitleProps = {
  className?: string;
  children?: React.ReactNode;
  /** Trailing arrow icon (default: true) */
  withArrow?: boolean;
};

function StructuredListTitle({ className, children, withArrow = true }: StructuredListTitleProps) {
  return (
    <h3
      data-slot="krds-structured-list-title"
      className={cn(
        "text-krds-foreground flex items-center gap-2 font-bold",
        "text-krds-heading-sm group-data-[variant=horizontal]/structured-list:text-krds-heading-md",
        className
      )}
    >
      <span className="line-clamp-1 flex-1">{children}</span>
      {withArrow ? <ArrowRight size={24} aria-hidden="true" className="shrink-0" /> : null}
    </h3>
  );
}

// ─── Description ──────────────────────────────────────────────────────────────

export type StructuredListDescriptionProps = {
  className?: string;
  children?: React.ReactNode;
};

function StructuredListDescription({ className, children }: StructuredListDescriptionProps) {
  return (
    <p
      data-slot="krds-structured-list-description"
      className={cn("text-krds-foreground-subtle line-clamp-3 text-krds-body-md", className)}
    >
      {children}
    </p>
  );
}

// ─── Period ───────────────────────────────────────────────────────────────────

export type StructuredListPeriodProps = {
  className?: string;
  /** Bold leading label (default: "기간") */
  label?: string;
  children?: React.ReactNode;
};

function StructuredListPeriod({ className, label = "기간", children }: StructuredListPeriodProps) {
  return (
    <p
      data-slot="krds-structured-list-period"
      className={cn("text-krds-foreground flex flex-wrap items-baseline gap-2 text-krds-body-md", className)}
    >
      <span className="font-bold">{label}</span>
      <span>{children}</span>
    </p>
  );
}

// ─── Metadata (auto-inserts vertical dividers) ────────────────────────────────

export type StructuredListMetadataProps = {
  className?: string;
  children?: React.ReactNode;
};

function StructuredListMetadata({ className, children }: StructuredListMetadataProps) {
  const items = React.Children.toArray(children).filter(React.isValidElement);
  return (
    <ul data-slot="krds-structured-list-metadata" className={cn("flex flex-wrap items-center gap-3", className)}>
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          {idx > 0 ? <span aria-hidden="true" className="bg-krds-surface-disabled inline-block h-4 w-px" /> : null}
          {item}
        </React.Fragment>
      ))}
    </ul>
  );
}

export type StructuredListMetadataItemProps = {
  className?: string;
  children?: React.ReactNode;
};

function StructuredListMetadataItem({ className, children }: StructuredListMetadataItemProps) {
  return (
    <li
      data-slot="krds-structured-list-metadata-item"
      className={cn("text-krds-foreground-subtle text-krds-body-sm", className)}
    >
      {children}
    </li>
  );
}

// ─── Actions row ──────────────────────────────────────────────────────────────

export type StructuredListActionsProps = {
  className?: string;
  children?: React.ReactNode;
};

function StructuredListActions({ className, children }: StructuredListActionsProps) {
  return (
    <div
      data-slot="krds-structured-list-actions"
      className={cn("border-krds-border-light flex flex-wrap items-center justify-between gap-4 border-t pt-6", className)}
    >
      {children}
    </div>
  );
}

// ─── Sub-actions group ────────────────────────────────────────────────────────

export type StructuredListSubActionsProps = {
  className?: string;
  children?: React.ReactNode;
};

function StructuredListSubActions({ className, children }: StructuredListSubActionsProps) {
  return (
    <div data-slot="krds-structured-list-sub-actions" className={cn("flex items-center gap-4", className)}>
      {children}
    </div>
  );
}

// ─── Sub-action (icon + label text button) ────────────────────────────────────

export type StructuredListSubActionProps = {
  className?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  "aria-pressed"?: boolean;
  "aria-label"?: string;
};

function StructuredListSubAction({
  className,
  children,
  icon,
  onClick,
  type = "button",
  "aria-pressed": ariaPressed,
  "aria-label": ariaLabel
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
  );
}

// ─── Tag list ─────────────────────────────────────────────────────────────────

export type StructuredListTagListProps = {
  className?: string;
  children?: React.ReactNode;
};

function StructuredListTagList({ className, children }: StructuredListTagListProps) {
  return (
    <ul
      data-slot="krds-structured-list-tag-list"
      className={cn("border-krds-border-light flex flex-wrap items-center gap-2 border-t pt-4", className)}
    >
      {children}
    </ul>
  );
}

export type StructuredListTagProps = {
  className?: string;
  children?: React.ReactNode;
};

function StructuredListTag({ className, children }: StructuredListTagProps) {
  return (
    <li
      data-slot="krds-structured-list-tag"
      className={cn(
        "border-krds-border-light text-krds-foreground-subtle inline-flex h-8 items-center rounded-full border bg-krds-surface px-3",
        "text-krds-body-sm",
        className
      )}
    >
      {children}
    </li>
  );
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
  StructuredListTag
};

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Root as Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/cn";

// KRDS tag size scale (ref _tag.scss btn-tag): the canonical KRDS heights are
// small 32px / medium 40px / large 48px. The original krdscn keys
// (xs 24 / default 32 / lg 40) sat one step small; they are preserved verbatim
// for backward compatibility. New KRDS-aligned keys are added on top:
//   small  → 32px (== old default)
//   medium → 40px (== old lg)
//   large  → 48px (new top step)
type TagSize = "xs" | "default" | "lg" | "small" | "medium" | "large";

const tagVariants = cva(
  [
    "inline-flex items-center justify-center rounded-full border font-medium whitespace-nowrap shrink-0 leading-[1.5]",
    "bg-krds-surface border-krds-border-light text-krds-foreground",
    "transition-colors"
  ].join(" "),
  {
    variants: {
      size: {
        // legacy keys (unchanged)
        xs: "h-6 px-2 gap-0.5 text-[0.8125rem]",
        default: "h-8 px-2.5 gap-0.5 text-[0.9375rem]",
        lg: "h-10 px-3 gap-0.5 text-[1.0625rem]",
        // KRDS-aligned keys
        small: "h-8 px-2.5 gap-0.5 text-[0.9375rem]",
        medium: "h-10 px-3 gap-0.5 text-[1.0625rem]",
        large: "h-12 px-4 gap-1 text-[1.0625rem]"
      },
      interactive: {
        true: [
          "hover:bg-krds-surface-secondary-subtle hover:border-transparent",
          "active:bg-krds-surface-secondary-subtle active:border-transparent"
        ].join(" "),
        false: ""
      }
    },
    defaultVariants: { size: "default", interactive: false }
  }
);

type DeletableTagProps = Omit<React.ComponentProps<"span">, "children"> &
  VariantProps<typeof tagVariants> & {
    variant?: "deletable";
    children: React.ReactNode;
    asChild?: boolean;
  };

type LinkTagProps = Omit<React.ComponentProps<"a">, "children"> &
  VariantProps<typeof tagVariants> & {
    variant: "link";
    href: string;
    children: React.ReactNode;
    asChild?: boolean;
  };

type TagProps = DeletableTagProps | LinkTagProps;

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className={className}>
      <g transform="translate(1.3333 1.3333)">
        <rect width="13.3333" height="13.3333" rx="6.6667" className="fill-krds-surface-disabled" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.04327 3.28967C3.83499 3.08139 3.4973 3.08139 3.28902 3.28967C3.08074 3.49795 3.08074 3.83564 3.28902 4.04392L5.91242 6.66732L3.29006 9.28967C3.08178 9.49795 3.08178 9.83564 3.29006 10.0439C3.49834 10.2522 3.83603 10.2522 4.04431 10.0439L6.66667 7.42157L9.28902 10.0439C9.4973 10.2522 9.83499 10.2522 10.0433 10.0439C10.2516 9.83564 10.2516 9.49795 10.0433 9.28967L7.42091 6.66732L10.0443 4.04392C10.2526 3.83564 10.2526 3.49795 10.0443 3.28967C9.83603 3.08139 9.49834 3.08139 9.29006 3.28967L6.66667 5.91307L4.04327 3.28967Z"
          className="fill-krds-foreground"
        />
      </g>
    </svg>
  );
}

function TagDelete({ className, ...props }: React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      aria-label="태그 삭제"
      className={cn(
        "inline-flex size-4 shrink-0 items-center justify-center",
        "disabled:cursor-not-allowed disabled:opacity-40",
        className
      )}
      {...props}
    >
      <CloseIcon className="size-full" />
    </button>
  );
}

function Tag(props: TagProps) {
  const { children, className, size = "default" } = props;

  if (props.variant === "link") {
    const {
      variant: _v,
      size: _s,
      asChild,
      className: _c,
      children: _ch,
      interactive: _i,
      ...rest
    } = props as LinkTagProps & { interactive?: boolean };
    const Comp = asChild ? Slot : "a";
    return (
      <Comp
        data-slot="krds-tag"
        className={cn(
          tagVariants({ size, interactive: true, className }),
          "cursor-pointer hover:underline focus:underline focus:krds-focus-ring active:underline"
        )}
        {...rest}
      >
        {children}
      </Comp>
    );
  }

  const {
    variant: _v,
    size: _s,
    asChild,
    className: _c,
    children: _ch,
    interactive: _i,
    ...rest
  } = props as DeletableTagProps & { interactive?: boolean };
  const Comp = asChild ? Slot : "span";

  return (
    <Comp data-slot="krds-tag" className={cn(tagVariants({ size, interactive: false, className }))} {...rest}>
      {children}
    </Comp>
  );
}

// ─── TagWrap ──────────────────────────────────────────────────────────────────
// Flex-wrap container for a group of tags. Gap follows KRDS tag wrapper spacing
// (ref _tag.scss wrapper-gap-*): small 4px/8px, medium 8px, large 8px/12px.

type TagWrapSize = "small" | "medium" | "large";

type TagWrapProps = React.ComponentProps<"div"> & {
  size?: TagWrapSize;
};

const tagWrapGap: Record<TagWrapSize, string> = {
  small: "gap-x-1 gap-y-2",
  medium: "gap-2",
  large: "gap-x-2 gap-y-3"
};

function TagWrap({ size = "medium", className, ...props }: TagWrapProps) {
  return (
    <div data-slot="krds-tag-wrap" className={cn("flex flex-wrap items-center", tagWrapGap[size], className)} {...props} />
  );
}

export { Tag, TagDelete, TagWrap, tagVariants };
export type { TagProps, TagSize, DeletableTagProps, LinkTagProps, TagWrapProps, TagWrapSize };

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/cn";

type TagSize = "small" | "medium" | "large";

const tagVariants = cva(
  [
    "inline-flex items-center justify-center rounded-full border font-medium whitespace-nowrap shrink-0 leading-none",
    "bg-krds-gray-0 border-krds-gray-20 text-krds-gray-90",
    "hover:bg-krds-gray-10 hover:border-krds-gray-10",
    "active:bg-krds-gray-20 active:border-krds-gray-20",
  ].join(" "),
  {
    variants: {
      size: {
        small: "h-6 px-1.5 gap-1 text-[0.6875rem]",
        medium: "h-8 px-2 gap-1.5 text-xs",
        large: "h-10 px-2.5 gap-1.5 text-sm",
      },
    },
    defaultVariants: { size: "medium" },
  }
);

type DeletableTagProps = Omit<React.ComponentProps<"span">, "children"> &
  VariantProps<typeof tagVariants> & {
    variant?: "deletable";
    children: React.ReactNode;
    onDelete?: () => void;
    deleteDisabled?: boolean;
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
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M12 4L4 12M4 4l8 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Tag(props: TagProps) {
  const { children, className, size = "medium" } = props;

  if (props.variant === "link") {
    const { variant: _v, size: _s, asChild, className: _c, children: _ch, ...rest } = props;
    const Comp = asChild ? Slot.Root : "a";
    return (
      <Comp
        data-slot="krds-tag"
        className={cn(tagVariants({ size, className }), "cursor-pointer")}
        {...rest}
      >
        <span>{children}</span>
      </Comp>
    );
  }

  const { variant: _v, onDelete, deleteDisabled, size: _s, asChild, className: _c, children: _ch, ...rest } =
    props as DeletableTagProps;
  const Comp = asChild ? Slot.Root : "span";

  return (
    <Comp
      data-slot="krds-tag"
      className={cn(tagVariants({ size, className }))}
      {...rest}
    >
      <span>{children}</span>
      {onDelete !== undefined && (
        <button
          type="button"
          aria-label="태그 삭제"
          disabled={deleteDisabled}
          onClick={onDelete}
          className={cn(
            "size-4 inline-flex shrink-0 items-center justify-center rounded-full",
            "text-krds-gray-90",
            "disabled:cursor-not-allowed disabled:opacity-40"
          )}
        >
          <CloseIcon className="size-full" />
        </button>
      )}
    </Comp>
  );
}

export { Tag, tagVariants };
export type { TagProps, TagSize, DeletableTagProps, LinkTagProps };

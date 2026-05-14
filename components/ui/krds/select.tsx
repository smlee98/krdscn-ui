"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import {
  Select as ShadcnSelect,
  SelectContent as ShadcnSelectContent,
  SelectGroup as ShadcnSelectGroup,
  SelectItem as ShadcnSelectItem,
  SelectLabel as ShadcnSelectLabel,
  SelectSeparator as ShadcnSelectSeparator,
  SelectTrigger as ShadcnSelectTrigger,
  SelectValue as ShadcnSelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/cn";

// ─── Variants ────────────────────────────────────────────────────────────────

type SelectSize = "small" | "medium" | "large";
type SelectVariant = "default" | "sorting";

const selectTriggerVariants = cva(
  [
    "w-full rounded border px-3",
    "bg-krds-gray-0 text-krds-gray-90 border-krds-gray-30",
    "focus:border-krds-primary-50 focus-visible:ring-0",
    "disabled:bg-krds-gray-5 disabled:border-krds-gray-10 disabled:text-krds-gray-50 disabled:cursor-not-allowed",
  ].join(" "),
  {
    variants: {
      size: {
        small: "h-8 text-xs",
        medium: "h-10 text-sm",
        large: "h-12 text-base",
      },
    },
    defaultVariants: { size: "medium" },
  }
);

// ─── Select (root) ───────────────────────────────────────────────────────────

function Select(props: React.ComponentProps<typeof ShadcnSelect>) {
  return <ShadcnSelect {...props} />;
}

// ─── SelectTrigger ────────────────────────────────────────────────────────────

function SelectTrigger({
  className,
  size = "medium",
  hasError,
  children,
  ...props
}: Omit<React.ComponentProps<typeof ShadcnSelectTrigger>, "size"> & {
  size?: SelectSize;
  hasError?: boolean;
}) {
  return (
    <ShadcnSelectTrigger
      data-slot="krds-select"
      className={cn(
        selectTriggerVariants({ size, className }),
        hasError && "border-krds-danger-50"
      )}
      {...props}
    >
      {children}
    </ShadcnSelectTrigger>
  );
}

// ─── SelectValue ──────────────────────────────────────────────────────────────

function SelectValue(props: React.ComponentProps<typeof ShadcnSelectValue>) {
  return <ShadcnSelectValue {...props} />;
}

// ─── SelectContent ────────────────────────────────────────────────────────────

function SelectContent({ className, ...props }: React.ComponentProps<typeof ShadcnSelectContent>) {
  return (
    <ShadcnSelectContent
      className={cn("bg-krds-gray-0 border-krds-gray-20", className)}
      {...props}
    />
  );
}

// ─── SelectItem ───────────────────────────────────────────────────────────────

function SelectItem({ className, ...props }: React.ComponentProps<typeof ShadcnSelectItem>) {
  return (
    <ShadcnSelectItem
      className={cn(
        "focus:bg-krds-primary-5 focus:text-krds-primary-50",
        className
      )}
      {...props}
    />
  );
}

// ─── SelectGroup ──────────────────────────────────────────────────────────────

function SelectGroup(props: React.ComponentProps<typeof ShadcnSelectGroup>) {
  return <ShadcnSelectGroup {...props} />;
}

// ─── SelectLabel ──────────────────────────────────────────────────────────────

function SelectLabel(props: React.ComponentProps<typeof ShadcnSelectLabel>) {
  return <ShadcnSelectLabel {...props} />;
}

// ─── SelectSeparator ─────────────────────────────────────────────────────────

function SelectSeparator(props: React.ComponentProps<typeof ShadcnSelectSeparator>) {
  return <ShadcnSelectSeparator {...props} />;
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  selectTriggerVariants,
};
export type { SelectSize, SelectVariant };

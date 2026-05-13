import { type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Badge as ShadcnBadge } from "@/components/ui/badge";

type BadgeVariant =
  | "basic"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "information"
  | "point"
  | "gray"
  | "disabled";

type BadgeSize = "small" | "medium" | "large";

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  rounded?: boolean;
  className?: string;
  children: ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  basic: "bg-krds-gray-0 text-krds-gray-90 border-krds-gray-20",
  primary: "bg-krds-primary-50 text-white border-transparent",
  secondary: "bg-krds-secondary-50 text-white border-transparent",
  success: "bg-krds-success-50 text-white border-transparent",
  warning: "bg-[#ffb114] text-krds-gray-90 border-transparent",
  danger: "bg-krds-danger-50 text-white border-transparent",
  information: "bg-krds-info-50 text-white border-transparent",
  point: "bg-krds-warning-50 text-white border-transparent",
  gray: "bg-krds-gray-50 text-white border-transparent",
  disabled: "bg-krds-gray-20 text-krds-gray-50 border-transparent cursor-not-allowed"
};

const sizeStyles: Record<BadgeSize, string> = {
  small: "h-5 px-1.5 text-xs",
  medium: "h-6 px-2 text-xs",
  large: "h-7 px-2 text-sm"
};

function Badge({ variant = "basic", size = "medium", rounded = false, className, children }: BadgeProps) {
  return (
    <ShadcnBadge
      variant="outline"
      className={cn(
        "inline-flex shrink-0 items-center justify-center border leading-none font-medium whitespace-nowrap",
        rounded ? "rounded-full" : "rounded-sm",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </ShadcnBadge>
  );
}

export type { BadgeProps, BadgeVariant, BadgeSize };
export { Badge };

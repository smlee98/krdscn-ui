"use client";

import { Badge as ShadcnBadge } from "@/components/ui/badge";
import { Badge as KrdsBadge, type BadgeProps as KrdsBadgeProps } from "@/components/ui/krds/(layout)/badge";
import { useUISystem } from "@/lib/ui-system";

export type BadgeProps = KrdsBadgeProps;
export type { BadgeVariant } from "@/components/ui/krds/(layout)/badge";

const VARIANT_FALLBACK: Record<
  NonNullable<BadgeProps["variant"]>,
  "default" | "secondary" | "outline" | "destructive"
> = {
  default: "default",
  secondary: "secondary",
  outline: "outline",
  destructive: "destructive",
  success: "default",
  warning: "default",
  info: "default",
  point: "default",
  tertiary: "secondary"
};

export function Badge(props: BadgeProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsBadge {...props} />;
  const { type, size, disabled, variant, ...rest } = props;
  const resolvedVariant = (variant ?? "default") as NonNullable<BadgeProps["variant"]>;
  return <ShadcnBadge variant={VARIANT_FALLBACK[resolvedVariant]} {...rest} />;
}

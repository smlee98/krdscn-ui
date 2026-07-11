"use client"

import { Button as ShadcnButton } from "@/components/ui/button"
import { Button as KrdsButton, type ButtonProps as KrdsButtonProps } from "@/components/ui/krds/(action)/button"
import { useUISystem } from "@/lib/ui-system"

export type ButtonProps = KrdsButtonProps

const VARIANT_FALLBACK: Record<
  NonNullable<KrdsButtonProps["variant"]>,
  "default" | "secondary" | "outline" | "ghost" | "link" | "destructive"
> = {
  default: "default",
  secondary: "secondary",
  outline: "outline",
  ghost: "ghost",
  link: "link",
  tertiary: "outline", // KRDS-only, closest shadcn match
  text: "ghost", // KRDS-only, closest shadcn match
}

const SIZE_FALLBACK: Record<NonNullable<KrdsButtonProps["size"]>, "default" | "xs" | "sm" | "lg" | "icon"> = {
  xs: "xs",
  sm: "sm",
  default: "default",
  lg: "lg",
  xl: "lg", // shadcn has no xl, fall back to lg
  icon: "icon",
}

export function Button(props: ButtonProps) {
  const system = useUISystem()
  if (system === "krds") return <KrdsButton {...props} />
  const { variant, size, ...rest } = props
  return (
    <ShadcnButton variant={VARIANT_FALLBACK[variant ?? "default"]} size={SIZE_FALLBACK[size ?? "default"]} {...rest} />
  )
}

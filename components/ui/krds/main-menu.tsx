// rsc:client
"use client";

import * as React from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/cn";

function MainMenu({
  className,
  children,
  value,
  defaultValue,
  onValueChange,
}: {
  className?: string;
  children?: React.ReactNode;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}) {
  return (
    <NavigationMenu
      data-slot="krds-main-menu"
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      className={cn("", className)}
    >
      <NavigationMenuList className="gap-0">{children}</NavigationMenuList>
    </NavigationMenu>
  );
}

function MainMenuItem({
  className,
  value,
  ...props
}: React.ComponentProps<"li"> & { value?: string }) {
  const generatedId = React.useId();
  return (
    <NavigationMenuItem
      data-slot="krds-main-menu-item"
      value={value ?? generatedId}
      className={cn("relative", className)}
      {...props}
    />
  );
}

function MainMenuTrigger({ className, ...props }: React.ComponentProps<"button">) {
  return (
    <NavigationMenuTrigger
      data-slot="krds-main-menu-trigger"
      className={cn(
        "h-10 rounded-none bg-transparent px-4 text-sm font-medium",
        "text-krds-gray-90 hover:text-krds-primary-50",
        "hover:bg-krds-gray-5 data-[state=open]:bg-krds-primary-5",
        "data-[state=open]:text-krds-primary-50",
        "focus-visible:ring-2 focus-visible:outline-none",
        "focus-visible:ring-krds-primary-50 focus-visible:ring-inset",
        className
      )}
      {...props}
    />
  );
}

function MainMenuContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <NavigationMenuContent
      data-slot="krds-main-menu-content"
      className={cn("", className)}
      {...props}
    />
  );
}

function MainMenuLink({
  className,
  href,
  ...props
}: React.ComponentProps<typeof NavigationMenuLink>) {
  return (
    <NavigationMenuLink
      data-slot="krds-main-menu-link"
      href={href ?? "#"}
      className={cn(
        "flex flex-col rounded-sm px-3 py-2 text-sm outline-none",
        "text-krds-gray-90 hover:bg-krds-primary-5 hover:text-krds-primary-50",
        "focus-visible:bg-krds-primary-5 focus-visible:text-krds-primary-50",
        "inline-flex h-10 items-center",
        className
      )}
      {...props}
    />
  );
}

export { MainMenu, MainMenuItem, MainMenuTrigger, MainMenuContent, MainMenuLink };

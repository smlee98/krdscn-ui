// rsc:client
"use client";

/**
 * KRDS MainMenu — horizontal navigation with submenu support.
 * Base: @/components/ui/navigation-menu (shadcn NavigationMenu → Radix NavigationMenuPrimitive).
 * R1 note: NavigationMenuContent slot composition is used for multi-row submenus.
 * If the submenu UX cannot be expressed via this composition, the fallback is a
 * pure-custom <nav aria-haspopup/aria-expanded> (R1 from plan). Current implementation
 * covers the KRDS Default story shape (one level of submenu items).
 */

import * as React from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/cn";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface MainMenuSubItem {
  label: string;
  href: string;
  description?: string;
}

export interface MainMenuItem {
  label: string;
  href?: string;
  value?: string;
  children?: MainMenuSubItem[];
}

export interface MainMenuProps {
  items: MainMenuItem[];
  /** Controls which submenu is open (Radix controlled). */
  value?: string;
  /** Uncontrolled default open item. */
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

// ─── MainMenu ─────────────────────────────────────────────────────────────────

function MainMenu({ items, value, defaultValue, onValueChange, className }: MainMenuProps) {
  return (
    <NavigationMenu
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      className={cn("", className)}
    >
      <NavigationMenuList className="gap-0">
        {items.map((item) => {
          const itemValue = item.value ?? item.label;
          return (
            <NavigationMenuItem key={itemValue} value={itemValue}>
              {item.children && item.children.length > 0 ? (
                <>
                  <NavigationMenuTrigger
                    className={cn(
                      "h-10 rounded-none bg-transparent px-4 text-sm font-medium",
                      "text-krds-gray-90 hover:text-krds-primary-50",
                      "hover:bg-krds-gray-5 data-[state=open]:bg-krds-primary-5",
                      "data-[state=open]:text-krds-primary-50",
                      "focus-visible:ring-2 focus-visible:outline-none",
                      "focus-visible:ring-krds-primary-50 focus-visible:ring-inset"
                    )}
                  >
                    {item.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="min-w-40 p-1">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <NavigationMenuLink
                            href={child.href}
                            className={cn(
                              "flex flex-col rounded-sm px-3 py-2 text-sm outline-none",
                              "text-krds-gray-90 hover:bg-krds-primary-5",
                              "hover:text-krds-primary-50",
                              "focus-visible:bg-krds-primary-5 focus-visible:text-krds-primary-50"
                            )}
                          >
                            <span className="font-medium">{child.label}</span>
                            {child.description && (
                              <span className="text-krds-gray-50 mt-0.5 text-xs">{child.description}</span>
                            )}
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </>
              ) : (
                <NavigationMenuLink
                  href={item.href ?? "#"}
                  className={cn(
                    "inline-flex h-10 items-center rounded-none px-4 text-sm font-medium outline-none",
                    "text-krds-gray-90 hover:bg-krds-gray-5 hover:text-krds-primary-50",
                    "focus-visible:bg-krds-gray-5 focus-visible:text-krds-primary-50"
                  )}
                >
                  {item.label}
                </NavigationMenuLink>
              )}
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export { MainMenu };

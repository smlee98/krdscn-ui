"use client";

import type * as React from "react";
import {
  MainMenu as KrdsMainMenu,
  MainMenuBar as KrdsMainMenuBar,
  MainMenuBarItem as KrdsMainMenuBarItem,
  MainMenuColumn as KrdsMainMenuColumn,
  MainMenuLink as KrdsMainMenuLink,
  MainMenuPanel as KrdsMainMenuPanel,
  MainMenuPanelHeader as KrdsMainMenuPanelHeader,
  MainMenuPanelShortcut as KrdsMainMenuPanelShortcut,
  MainMenuPanelSidebar as KrdsMainMenuPanelSidebar,
  MainMenuSidebarItem as KrdsMainMenuSidebarItem
} from "@/components/ui/krds/(navigation)/main-menu";

// shadcn has no MainMenu primitive — render KRDS regardless of active UI system.
// (Composition primitive — Korean government site main navigation.)
export function MainMenu(props: React.ComponentProps<typeof KrdsMainMenu>) {
  return <KrdsMainMenu {...props} />;
}

export function MainMenuBar(props: React.ComponentProps<typeof KrdsMainMenuBar>) {
  return <KrdsMainMenuBar {...props} />;
}

export function MainMenuBarItem(props: React.ComponentProps<typeof KrdsMainMenuBarItem>) {
  return <KrdsMainMenuBarItem {...props} />;
}

export function MainMenuPanel(props: React.ComponentProps<typeof KrdsMainMenuPanel>) {
  return <KrdsMainMenuPanel {...props} />;
}

export function MainMenuPanelHeader(props: React.ComponentProps<typeof KrdsMainMenuPanelHeader>) {
  return <KrdsMainMenuPanelHeader {...props} />;
}

export function MainMenuPanelShortcut(props: React.ComponentProps<typeof KrdsMainMenuPanelShortcut>) {
  return <KrdsMainMenuPanelShortcut {...props} />;
}

export function MainMenuPanelSidebar(props: React.ComponentProps<typeof KrdsMainMenuPanelSidebar>) {
  return <KrdsMainMenuPanelSidebar {...props} />;
}

export function MainMenuColumn(props: React.ComponentProps<typeof KrdsMainMenuColumn>) {
  return <KrdsMainMenuColumn {...props} />;
}

export function MainMenuLink(props: React.ComponentProps<typeof KrdsMainMenuLink>) {
  return <KrdsMainMenuLink {...props} />;
}

export function MainMenuSidebarItem(props: React.ComponentProps<typeof KrdsMainMenuSidebarItem>) {
  return <KrdsMainMenuSidebarItem {...props} />;
}

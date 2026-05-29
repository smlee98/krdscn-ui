"use client";

import type * as React from "react";
import {
  HelpCoachProcess as KrdsHelpCoachProcess,
  HelpCoachTask as KrdsHelpCoachTask,
  HelpContentArea as KrdsHelpContentArea,
  HelpLinkList as KrdsHelpLinkList,
  HelpPanel as KrdsHelpPanel,
  HelpPanelAction as KrdsHelpPanelAction,
  HelpPanelClose as KrdsHelpPanelClose,
  HelpPanelContent as KrdsHelpPanelContent,
  HelpPanelTrigger as KrdsHelpPanelTrigger,
  HelpRelatedService as KrdsHelpRelatedService,
  HelpSection as KrdsHelpSection,
  HelpServiceGroup as KrdsHelpServiceGroup,
  HelpTutorialTitle as KrdsHelpTutorialTitle
} from "@/components/ui/krds/(help)/help-panel";

export { HelpPhoneIcon, HelpFaqIcon } from "@/components/ui/krds/(help)/help-panel";
export type {
  HelpPanelProps,
  HelpPanelTriggerProps,
  HelpPanelCloseProps,
  HelpPanelContentProps,
  HelpSectionProps,
  HelpLinkListProps,
  HelpLinkItem,
  HelpServiceGroupProps,
  HelpTutorialTitleProps,
  HelpCoachTaskProps
} from "@/components/ui/krds/(help)/help-panel";

// shadcn has no HelpPanel primitive — render KRDS regardless of active UI system.
export function HelpPanel(props: React.ComponentProps<typeof KrdsHelpPanel>) {
  return <KrdsHelpPanel {...props} />;
}

export function HelpPanelTrigger(props: React.ComponentProps<typeof KrdsHelpPanelTrigger>) {
  return <KrdsHelpPanelTrigger {...props} />;
}

export function HelpPanelClose(props: React.ComponentProps<typeof KrdsHelpPanelClose>) {
  return <KrdsHelpPanelClose {...props} />;
}

export function HelpPanelContent(props: React.ComponentProps<typeof KrdsHelpPanelContent>) {
  return <KrdsHelpPanelContent {...props} />;
}

export function HelpSection(props: React.ComponentProps<typeof KrdsHelpSection>) {
  return <KrdsHelpSection {...props} />;
}

export function HelpLinkList(props: React.ComponentProps<typeof KrdsHelpLinkList>) {
  return <KrdsHelpLinkList {...props} />;
}

export function HelpRelatedService(props: React.ComponentProps<typeof KrdsHelpRelatedService>) {
  return <KrdsHelpRelatedService {...props} />;
}

export function HelpServiceGroup(props: React.ComponentProps<typeof KrdsHelpServiceGroup>) {
  return <KrdsHelpServiceGroup {...props} />;
}

export function HelpTutorialTitle(props: React.ComponentProps<typeof KrdsHelpTutorialTitle>) {
  return <KrdsHelpTutorialTitle {...props} />;
}

export function HelpCoachProcess(props: React.ComponentProps<typeof KrdsHelpCoachProcess>) {
  return <KrdsHelpCoachProcess {...props} />;
}

export function HelpCoachTask(props: React.ComponentProps<typeof KrdsHelpCoachTask>) {
  return <KrdsHelpCoachTask {...props} />;
}

export function HelpPanelAction(props: React.ComponentProps<typeof KrdsHelpPanelAction>) {
  return <KrdsHelpPanelAction {...props} />;
}

export function HelpContentArea(props: React.ComponentProps<typeof KrdsHelpContentArea>) {
  return <KrdsHelpContentArea {...props} />;
}

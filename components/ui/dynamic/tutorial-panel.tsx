"use client";

// shadcn has no TutorialPanel primitive — render KRDS regardless of active UI system.
// TutorialPanel is a compound exported as a single object with dot-notation subparts
// (TutorialPanel.Root, .Trigger, .Container, .Tabs, .TabPanel, .HelpContent,
// .TutorialContent, .Close), so re-export the single symbol is enough.

export { TutorialPanel } from "@/components/ui/krds/(help)/tutorial-panel";
export type {
  TutorialPanelTab,
  TutorialLink,
  TutorialLinkIcon,
  TutorialHelpContent,
  TutorialRelatedService,
  TutorialStep,
  TutorialPanelRootProps,
  TutorialPanelTriggerProps,
  TutorialPanelContainerProps,
  TutorialPanelTabsProps,
  TutorialPanelTabPanelProps,
  TutorialPanelHelpContentProps,
  TutorialPanelTutorialContentProps,
  TutorialPanelCloseProps
} from "@/components/ui/krds/(help)/tutorial-panel";

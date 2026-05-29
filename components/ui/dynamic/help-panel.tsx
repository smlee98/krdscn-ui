"use client";

// shadcn has no HelpPanel primitive — re-export the KRDS implementation directly.
// Direct re-export (not function wrapping) preserves React element type identity,
// which the KRDS HelpPanel relies on to detect <HelpPanelTrigger> children via
// `child.type === HelpPanelTrigger`. A wrapping dispatcher would break that
// equality check and route every child (including the trigger) inside the
// off-screen drawer, leaving the trigger button invisible in consumer code.

export {
  HelpPanel,
  HelpPanelTrigger,
  HelpPanelClose,
  HelpPanelContent,
  HelpSection,
  HelpLinkList,
  HelpRelatedService,
  HelpServiceGroup,
  HelpTutorialTitle,
  HelpCoachProcess,
  HelpCoachTask,
  HelpPanelAction,
  HelpContentArea,
  HelpPhoneIcon,
  HelpFaqIcon
} from "@/components/ui/krds/(help)/help-panel";

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

// KRDS wrapper barrel — named exports only.

// Phase 1
export { Button, buttonVariants } from "@/components/ui/krds/button";
export type { ButtonProps, ButtonVariant, ButtonSize } from "@/components/ui/krds/button";

export { TextInput } from "@/components/ui/krds/text-input";
export type { TextInputProps } from "@/components/ui/krds/text-input";

export { Textarea } from "@/components/ui/krds/textarea";
export type { TextareaProps } from "@/components/ui/krds/textarea";

export { Badge } from "@/components/ui/krds/badge";
export type { BadgeProps, BadgeVariant, BadgeSize } from "@/components/ui/krds/badge";

export { Tag } from "@/components/ui/krds/tag";
export type { TagProps, TagSize, DeletableTagProps, LinkTagProps } from "@/components/ui/krds/tag";

// Phase 2
export { ToggleSwitch } from "@/components/ui/krds/toggle-switch";
export type { ToggleSwitchProps, ToggleSwitchSize } from "@/components/ui/krds/toggle-switch";

export { Select } from "@/components/ui/krds/select";
export type { SelectProps, SelectSize, SelectVariant, SelectOption } from "@/components/ui/krds/select";

export { DateInput } from "@/components/ui/krds/date-input";
export type { DateInputProps, DateInputSize } from "@/components/ui/krds/date-input";

export { FileUpload } from "@/components/ui/krds/file-upload";
export type { FileUploadProps, FileUploadSize, FileItem } from "@/components/ui/krds/file-upload";

export { Checkbox, CheckboxGroup, CheckboxChip } from "@/components/ui/krds/checkbox";
export type {
  CheckboxProps,
  CheckboxGroupProps,
  CheckboxChipProps,
  CheckboxSize,
  CheckboxChipSize
} from "@/components/ui/krds/checkbox";

export { Radio, RadioGroup, RadioChip } from "@/components/ui/krds/radio-group";
export type { RadioProps, RadioGroupProps, RadioChipProps } from "@/components/ui/krds/radio-group";

// Phase 3
export {
  ModalRoot,
  ModalTrigger,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalClose
} from "@/components/ui/krds/modal";
export type {
  ModalRootProps,
  ModalSize,
  ModalVariant,
  ModalTriggerProps,
  ModalOverlayProps,
  ModalContentProps,
  ModalHeaderProps,
  ModalBodyProps,
  ModalFooterProps,
  ModalCloseProps
} from "@/components/ui/krds/modal";

export { AlertModal } from "@/components/ui/krds/alert-modal";
export type { AlertModalProps } from "@/components/ui/krds/alert-modal";

export { Tab, TabList, TabTrigger, TabContent, TabPanel } from "@/components/ui/krds/tab";
export type { TabProps, TabListProps, TabTriggerProps, TabContentProps, TabPanelProps } from "@/components/ui/krds/tab";

export { Accordion, AccordionItem, AccordionHeader, AccordionPanel } from "@/components/ui/krds/accordion";
export type {
  AccordionProps,
  AccordionItemProps,
  AccordionHeaderProps,
  AccordionPanelProps
} from "@/components/ui/krds/accordion";

export { Disclosure } from "@/components/ui/krds/disclosure";
export type { DisclosureProps } from "@/components/ui/krds/disclosure";

// Phase 4
export { Breadcrumb } from "@/components/ui/krds/breadcrumb";
export type { BreadcrumbProps, BreadcrumbItem } from "@/components/ui/krds/breadcrumb";

export { Pagination } from "@/components/ui/krds/pagination";
export type { PaginationProps } from "@/components/ui/krds/pagination";

export { Tooltip } from "@/components/ui/krds/tooltip";
export type { TooltipProps, TooltipVariant } from "@/components/ui/krds/tooltip";

export { Spinner } from "@/components/ui/krds/spinner";
export type { SpinnerProps } from "@/components/ui/krds/spinner";

export { StepIndicator } from "@/components/ui/krds/step-indicator";
export type { StepIndicatorProps, StepItem } from "@/components/ui/krds/step-indicator";

export { Link } from "@/components/ui/krds/link";
export type { LinkProps, LinkVariant, LinkUnderline, LinkSize } from "@/components/ui/krds/link";

export { TextList, TextListItem } from "@/components/ui/krds/text-list";
export type { TextListProps, TextListItemProps, TextListType } from "@/components/ui/krds/text-list";

// Phase 5
export {
  Calendar,
  CalendarInput,
  CalendarButton,
  CalendarDropdown,
  CalendarTable
} from "@/components/ui/krds/calendar";
export type {
  CalendarProps,
  CalendarMode,
  CalendarPosition,
  CalendarDate,
  CalendarYearMonth,
  CalendarInputProps,
  CalendarButtonProps,
  CalendarDropdownProps,
  CalendarTableProps
} from "@/components/ui/krds/calendar";

// Phase 6 — 미래핑 17 신규
export { ContextualHelp } from "@/components/ui/krds/contextual-help";
export type { ContextualHelpProps } from "@/components/ui/krds/contextual-help";
export { HelpPanel } from "@/components/ui/krds/help-panel";
export type { HelpPanelProps, HelpPanelLink } from "@/components/ui/krds/help-panel";
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption
} from "@/components/ui/krds/table";
export type {
  TableProps,
  TableHeaderProps,
  TableBodyProps,
  TableFooterProps,
  TableHeadProps,
  TableRowProps,
  TableCellProps,
  TableCaptionProps
} from "@/components/ui/krds/table";
export { MainMenu } from "@/components/ui/krds/main-menu";
export type { MainMenuProps, MainMenuItem, MainMenuSubItem } from "@/components/ui/krds/main-menu";
export { LanguageSwitcher } from "@/components/ui/krds/language-switcher";
export type { LanguageSwitcherProps, LanguageOption } from "@/components/ui/krds/language-switcher";
export { Resize } from "@/components/ui/krds/resize";
export type { ResizeProps, ScaleKey } from "@/components/ui/krds/resize";
export { SideNavigation } from "@/components/ui/krds/side-navigation";
export type { SideNavigationProps, SideNavigationItem } from "@/components/ui/krds/side-navigation";
export { InPageNavigation } from "@/components/ui/krds/in-page-navigation";
export type { InPageNavigationProps, InPageNavItem } from "@/components/ui/krds/in-page-navigation";
export { CoachMark } from "@/components/ui/krds/coach-mark";
export type { CoachMarkProps, CoachMarkStep } from "@/components/ui/krds/coach-mark";
export { TutorialPanel } from "@/components/ui/krds/tutorial-panel";
export type { TutorialPanelProps, TutorialPanelStep } from "@/components/ui/krds/tutorial-panel";
export { CriticalAlert } from "@/components/ui/krds/critical-alert";
export type { CriticalAlertProps } from "@/components/ui/krds/critical-alert";
export { Identifier } from "@/components/ui/krds/identifier";
export type { IdentifierProps, IdentifierLink } from "@/components/ui/krds/identifier";
export { Masthead } from "@/components/ui/krds/masthead";
export type { MastheadProps } from "@/components/ui/krds/masthead";

export { SkipLink } from "@/components/ui/krds/skip-link";
export type { SkipLinkProps } from "@/components/ui/krds/skip-link";

export {
  StructuredList,
  StructuredListItem,
  StructuredListLabel,
  StructuredListValue
} from "@/components/ui/krds/structured-list";
export type {
  StructuredListProps,
  StructuredListItemProps,
  StructuredListLabelProps,
  StructuredListValueProps
} from "@/components/ui/krds/structured-list";

export { Footer, FooterColumn, FooterLink } from "@/components/ui/krds/footer";
export type { FooterProps, FooterColumnProps, FooterLinkItem } from "@/components/ui/krds/footer";

export { Header } from "@/components/ui/krds/header";
export type { HeaderProps } from "@/components/ui/krds/header";

/**
 * EXAMPLES_CONFIG — canonical registry of example component names per sidebar item slug.
 *
 * Rules:
 *  - Keys must exactly match every `item.id` in SIDEBAR_GROUPS (type-enforced below).
 *  - Values are non-empty arrays of PascalCase component names.
 *  - Each name maps to `components/examples/<slug>/<Name>.tsx`.
 *  - Per-category minimums per AC G22-G31 (see .omc/plans/ralplan-shadcn-docs-style-routing.md §2.2 Stage 4).
 */

import type { SIDEBAR_GROUPS } from "@/lib/sidebar-nav";

/** Union of every item.id across all sidebar groups — compile-error if EXAMPLES_CONFIG has missing/extra keys. */
type SidebarItemId = (typeof SIDEBAR_GROUPS)[number]["items"][number]["id"];

export const EXAMPLES_CONFIG = {
  // ── Identity (G22) — 4 components × 1 each = 4 files ──────────────────────
  masthead: ["MastheadDefault"],
  identifier: ["IdentifierDefault"],
  header: ["HeaderDefault"],
  footer: ["FooterDefault"],

  // ── Navigation (G23) — 6 components × 2-3 each = 14 files ─────────────────
  "skip-link": ["SkipLinkDefault", "SkipLinkMultiple"],
  "main-menu": ["MainMenuDefault", "MainMenuWithDropdown", "MainMenuMobile"],
  breadcrumb: ["BreadcrumbDefault", "BreadcrumbLong"],
  "side-navigation": ["SideNavigationDefault", "SideNavigationCollapsed"],
  "in-page-navigation": ["InPageNavigationDefault", "InPageNavigationFixed"],
  pagination: ["PaginationDefault", "PaginationCompact", "PaginationWithInfo"],

  // ── Layout (G24) — 11 components × 3-6 each = 50 files ────────────────────
  "structured-list": [
    "StructuredListDefault",
    "StructuredListWithBorder",
    "StructuredListHorizontal",
    "StructuredListDense"
  ],
  "critical-alert": [
    "CriticalAlertDefault",
    "CriticalAlertInfo",
    "CriticalAlertWarning",
    "CriticalAlertSuccess",
    "CriticalAlertDanger"
  ],
  calendar: ["CalendarDefault", "CalendarRange", "CalendarWithDisabled", "CalendarMultiple"],
  disclosure: ["DisclosureDefault", "DisclosureMultiple", "DisclosureControlled"],
  modal: ["ModalDefault", "ModalSmall", "ModalLarge", "ModalFullscreen", "ModalWithForm"],
  badge: ["BadgeDefault", "BadgeVariants", "BadgeSizes", "BadgeRounded", "BadgeAllColors"],
  accordion: ["AccordionDefault", "AccordionLine", "AccordionMultiple", "AccordionControlled", "AccordionNested"],
  carousel: ["CarouselDefault", "CarouselAutoplay", "CarouselMultiple", "CarouselVertical"],
  tab: ["TabDefault", "TabScrollable", "TabWithIcons", "TabVertical", "TabControlled"],
  table: ["TableDefault", "TableSortable", "TableSelectable", "TableWithPagination", "TableEmpty", "TableCompact"],
  "text-list": ["TextListDefault", "TextListOrdered", "TextListNested", "TextListDense"],

  // ── Action (G25) — 2 components × 6 each = 12 files ───────────────────────
  link: ["LinkDefault", "LinkInline", "LinkWithIcon", "LinkDisabled", "LinkExternal", "LinkButton"],
  button: ["ButtonPrimary", "ButtonSecondary", "ButtonTertiary", "ButtonIcon", "ButtonSizes", "ButtonDisabled"],

  // ── Selection (G26) — 5 components × 3-4 each = 19 files ──────────────────
  "radio-group": ["RadioGroupDefault", "RadioGroupHorizontal", "RadioGroupDisabled", "RadioGroupControlled"],
  checkbox: ["CheckboxDefault", "CheckboxIndeterminate", "CheckboxGroup", "CheckboxDisabled"],
  select: ["SelectDefault", "SelectMultiple", "SelectDisabled", "SelectWithSearch"],
  tag: ["TagDefault", "TagClosable", "TagColors", "TagSizes"],
  "toggle-switch": ["ToggleSwitchDefault", "ToggleSwitchLabeled", "ToggleSwitchDisabled"],

  // ── Feedback (G27) — 2 components × 2-3 each = 5 files ───────────────────
  "step-indicator": ["StepIndicatorDefault", "StepIndicatorVertical", "StepIndicatorWithStatus"],
  spinner: ["SpinnerDefault", "SpinnerSizes"],

  // ── Help (G28) — 5 components × 2-3 each = 14 files ──────────────────────
  "help-panel": ["HelpPanelDefault", "HelpPanelWithActions"],
  "tutorial-panel": ["TutorialPanelDefault", "TutorialPanelMultiStep", "TutorialPanelControlled"],
  "contextual-help": ["ContextualHelpDefault", "ContextualHelpTrigger"],
  "coach-mark": ["CoachMarkDefault", "CoachMarkMultiStep", "CoachMarkControlled"],
  tooltip: ["TooltipDefault", "TooltipPositions", "TooltipDelayed", "TooltipDisabled"],

  // ── Input (G29) — 4 components × 3-5 each = 17 files ─────────────────────
  "date-input": ["DateInputDefault", "DateInputRange", "DateInputDisabled", "DateInputRequired", "DateInputWithLabel"],
  textarea: ["TextareaDefault", "TextareaResizable", "TextareaWithCounter", "TextareaDisabled"],
  "text-input": ["TextInputDefault", "TextInputWithIcon", "TextInputPassword", "TextInputSearch", "TextInputError"],
  "file-upload": ["FileUploadDefault", "FileUploadMultiple", "FileUploadDragDrop"],

  // ── Settings (G30) — 2 components × 1-2 each = 3 files ───────────────────
  "language-switcher": ["LanguageSwitcherDefault", "LanguageSwitcherCompact"],
  resize: ["ResizeDefault"]
} as const satisfies Record<SidebarItemId, readonly [string, ...string[]]>;

export type ExamplesConfig = typeof EXAMPLES_CONFIG;
export type ExampleSlug = keyof ExamplesConfig;
export type ExampleName<S extends ExampleSlug> = ExamplesConfig[S][number];

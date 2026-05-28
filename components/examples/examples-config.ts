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
  // ── Identity (G22) — canonical KRDS Storybook names ──────────────────────
  masthead: ["MastheadDefault"],
  identifier: ["IdentifierDefault"],
  header: ["HeaderDefault", "HeaderLoggedIn"],
  footer: ["FooterDefault", "FooterMinimal", "FooterSimple"],

  // ── Navigation (G23) — canonical KRDS Storybook names ────────────────────
  "skip-link": ["SkipLinkDefault", "SkipLinkCustomTarget"],
  "main-menu": ["MainMenuDefault", "MainMenuWithPanel"],
  breadcrumb: ["BreadcrumbDefault", "BreadcrumbSingleItem", "BreadcrumbWithDisabledItem"],
  "side-navigation": ["SideNavigationDefault", "SideNavigationSimpleMenu", "SideNavigationWithPopupOnly"],
  "in-page-navigation": [
    "InPageNavigationDefault",
    "InPageNavigationLongItems",
    "InPageNavigationWithScrollFunctionality",
    "InPageNavigationWithoutAction"
  ],
  pagination: ["PaginationDefault", "PaginationControlled", "PaginationWithManyPages"],

  // ── Layout (G24) — canonical KRDS Storybook names ────────────────────────
  "structured-list": [
    "StructuredListDefault",
    "StructuredListLongText",
    "StructuredListMinimalData",
    "StructuredListVariousBadges"
  ],
  "critical-alert": ["CriticalAlertDefault", "CriticalAlertCustomLinkText", "CriticalAlertWithoutLink"],
  calendar: [
    "CalendarDefault",
    "CalendarSingle",
    "CalendarRange",
    "CalendarControlled",
    "CalendarControlledRange",
    "CalendarBottomPosition",
    "CalendarTopPosition",
    "CalendarOpenState",
    "CalendarReadOnly",
    "CalendarDisabled",
    "CalendarCustomButtonText",
    "CalendarWithDefaultValue",
    "CalendarWithDefaultRange",
    "CalendarWithDisabledDates",
    "CalendarWithEventDates"
  ],
  disclosure: [
    "DisclosureDefault",
    "DisclosureDefaultExpanded",
    "DisclosureMultipleDisclosures",
    "DisclosureControlledExample",
    "DisclosureWithRichContent"
  ],
  modal: [
    "ModalDefault",
    "ModalAsChildTrigger",
    "ModalBottomSheet",
    "ModalLongContentInitialBodyFocus",
    "ModalSizeLg",
    "ModalSizeMd",
    "ModalSizeSm",
    "ModalUsePortal"
  ],
  badge: ["BadgeDefault", "BadgeColors", "BadgeRounded", "BadgeSizes", "BadgeVariants"],
  accordion: ["AccordionDefault", "AccordionSingleSelection", "AccordionControlled", "AccordionWithComplexContent"],
  carousel: [
    "CarouselDefault",
    "CarouselFullBanner",
    "CarouselElementBanner",
    "CarouselAutoplay",
    "CarouselMultiple",
    "CarouselVertical"
  ],
  tab: [
    "TabDefault",
    "TabFillType",
    "TabFillTypeFull",
    "TabLineType",
    "TabLineTypeFull",
    "TabControlled",
    "TabUncontrolled",
    "TabWithDisabledTabs",
    "TabWithRichContent",
    "TabCompoundPatternExample",
    "TabKeyboardNavigation"
  ],
  table: ["TableDefault", "TableMobileScroll", "TableMultipleColumns", "TableWithScroll", "TableWithoutCaption"],
  "text-list": ["TextListDefault", "TextListOrdered", "TextListMixed", "TextListMixedOrdered"],

  // ── Action (G25) — canonical KRDS Storybook names ────────────────────────
  link: ["LinkDefault", "LinkVariants", "LinkSizes", "LinkUnderlines", "LinkWithIcons"],
  button: [
    "ButtonPrimary",
    "ButtonSecondary",
    "ButtonTertiary",
    "ButtonText",
    "ButtonDisabled",
    "ButtonIcon",
    "ButtonSizes"
  ],

  // ── Selection (G26) — 5 components × 3-4 each = 19 files ──────────────────
  "radio-group": [
    "RadioDefault",
    "RadioWithDescription",
    "RadioSize",
    "RadioDisabled",
    "RadioCheckedDisabled",
    "RadioGroupExample",
    "RadioGroupColumn",
    "RadioGroupColumnControlled",
    "RadioSortDefault"
  ],
  checkbox: [
    "CheckboxDefault",
    "CheckboxChecked",
    "CheckboxWithDescription",
    "CheckboxSize",
    "CheckboxDisabled",
    "CheckboxCheckedDisabled",
    "CheckboxIndeterminate",
    "CheckboxGroup",
    "CheckboxGroupColumn",
    "CheckboxChip"
  ],
  select: ["SelectDefault", "SelectStates", "SelectSizes", "SelectSorting", "SelectControlled"],
  tag: ["TagDefault", "TagDeletable", "TagLink", "TagLinkTag", "TagDeleteDisabled"],
  "toggle-switch": [
    "ToggleSwitchDefault",
    "ToggleSwitchChecked",
    "ToggleSwitchDisabled",
    "ToggleSwitchDisabledChecked",
    "ToggleSwitchMedium",
    "ToggleSwitchLarge",
    "ToggleSwitchControlled",
    "ToggleSwitchAllVariants"
  ],

  // ── Feedback (G27) — 2 components × 2-3 each = 5 files ───────────────────
  "step-indicator": [
    "StepIndicatorDefault",
    "StepIndicatorAllCompleted",
    "StepIndicatorAllDefault",
    "StepIndicatorWithPageTitle"
  ],
  spinner: ["SpinnerDefault", "SpinnerWithoutLabel", "SpinnerWithFormSpinner", "SpinnerMultipleSpinners"],

  // ── Help (G28) — 5 components × 2-3 each = 14 files ──────────────────────
  "help-panel": ["HelpPanelDefault", "HelpPanelWithTabs"],
  "tutorial-panel": ["TutorialPanelDefault", "TutorialPanelControlled"],
  "contextual-help": ["ContextualHelpDefault", "ContextualHelpList"],
  "coach-mark": ["CoachMarkDefault", "CoachMarkSecondStep", "CoachMarkLongDescription", "CoachMarkInteractive"],
  tooltip: ["TooltipVertical", "TooltipHorizontal", "TooltipBox", "TooltipWithIcon", "TooltipKeyboard"],

  // ── Input (G29) — 4 components × 3-5 each = 17 files ─────────────────────
  "date-input": [
    "DateInputDefault",
    "DateInputWithHint",
    "DateInputWithDefaultValue",
    "DateInputControlled",
    "DateInputAllStates"
  ],
  textarea: [
    "TextareaDefault",
    "TextareaWithCounter",
    "TextareaWithMaxLength",
    "TextareaStates",
    "TextareaErrorWithCounter",
    "TextareaControlled"
  ],
  "text-input": [
    "TextInputDefault",
    "TextInputSizes",
    "TextInputStates",
    "TextInputWithPasswordToggle",
    "TextInputWithClearButton",
    "TextInputWithMultipleButtons",
    "TextInputControlled",
    "TextInputUncontrolled",
    "TextInputWithoutLabel",
    "TextInputWithoutHint"
  ],
  "file-upload": [
    "FileUploadDefault",
    "FileUploadWithFiles",
    "FileUploadDisabled",
    "FileUploadNoDelete",
    "FileUploadRestrictedFileTypes",
    "FileUploadInteractive"
  ],

  // ── Settings (G30) — 2 components × 1-2 each = 3 files ───────────────────
  "language-switcher": ["LanguageSwitcherDefault", "LanguageSwitcherSimple", "LanguageSwitcherControlled"],
  resize: ["ResizeDefault", "ResizeControlled", "ResizeCustomLabels"]
} as const satisfies Record<SidebarItemId, readonly [string, ...string[]]>;

export type ExamplesConfig = typeof EXAMPLES_CONFIG;
export type ExampleSlug = keyof ExamplesConfig;
export type ExampleName<S extends ExampleSlug> = ExamplesConfig[S][number];

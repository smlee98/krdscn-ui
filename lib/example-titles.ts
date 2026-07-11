import type { ExampleSlug } from "@/components/examples/examples-config"

/**
 * EXAMPLE_TITLES — per-example section titles from KRDS Storybook (https://www.krds.go.kr/storybook/react/).
 *
 * Keys mirror EXAMPLES_CONFIG entries 1:1. Values are the Storybook story names.
 * Components not in Storybook (carousel) use derived readable names.
 * Custom examples not present in Storybook are labelled descriptively.
 */
export const EXAMPLE_TITLES = {
  // ── Identity ──────────────────────────────────────────────────────────
  masthead: { MastheadDefault: "Default" },
  identifier: { IdentifierDefault: "Default" },
  header: { HeaderDefault: "Default", HeaderLoggedIn: "Logged In" },
  footer: { FooterDefault: "Default", FooterMinimal: "Minimal", FooterSimple: "Simple" },

  // ── Navigation ────────────────────────────────────────────────────────
  "skip-link": { SkipLinkDefault: "Default", SkipLinkCustomTarget: "Custom Target" },
  "main-menu": { MainMenuDefault: "Default" },
  breadcrumb: {
    BreadcrumbDefault: "Default",
    BreadcrumbSingleItem: "Single Item",
    BreadcrumbWithDisabledItem: "With Disabled Item",
  },
  "side-navigation": {
    SideNavigationDefault: "Default",
    SideNavigationSimpleMenu: "Simple Menu",
    SideNavigationWithPopupOnly: "With Popup Only",
  },
  "in-page-navigation": {
    InPageNavigationDefault: "Default",
    InPageNavigationLongItems: "Long Items",
    InPageNavigationWithScrollFunctionality: "With Scroll Functionality",
    InPageNavigationWithoutAction: "Without Action",
  },
  pagination: {
    PaginationDefault: "Default",
    PaginationControlled: "Controlled",
    PaginationWithManyPages: "With Many Pages",
  },

  // ── Layout ────────────────────────────────────────────────────────────
  "step-indicator": {
    StepIndicatorDefault: "Default",
    StepIndicatorAllCompleted: "All Completed",
    StepIndicatorAllDefault: "All Default",
    StepIndicatorWithPageTitle: "With Page Title",
  },
  "structured-list": {
    StructuredListDefault: "Default",
    StructuredListLongText: "Long Text",
    StructuredListMinimalData: "Minimal Data",
    StructuredListVariousBadges: "Various Badges",
  },
  "critical-alert": {
    CriticalAlertDefault: "Default",
    CriticalAlertCustomLinkText: "Custom Link Text",
    CriticalAlertWithoutLink: "Without Link",
  },
  calendar: {
    CalendarDefault: "Default",
    CalendarSingle: "Single",
    CalendarRange: "Range",
    CalendarControlled: "Controlled",
    CalendarControlledRange: "Controlled Range",
    CalendarBottomPosition: "Bottom Position",
    CalendarTopPosition: "Top Position",
    CalendarOpenState: "Open State",
    CalendarReadOnly: "Read Only",
    CalendarDisabled: "Disabled",
    CalendarCustomButtonText: "Custom Button Text",
    CalendarWithDefaultValue: "With Default Value",
    CalendarWithDefaultRange: "With Default Range",
    CalendarWithDisabledDates: "With Disabled Dates",
    CalendarWithEventDates: "With Event Dates",
  },
  disclosure: {
    DisclosureDefault: "Default",
    DisclosureDefaultExpanded: "Default Expanded",
    DisclosureMultipleDisclosures: "Multiple Disclosures",
    DisclosureControlledExample: "Controlled Example",
    DisclosureWithRichContent: "With Rich Content",
  },
  modal: {
    ModalDefault: "Default",
    ModalAsChildTrigger: "As Child Trigger",
    ModalBottomSheet: "Bottom Sheet",
    ModalLongContentInitialBodyFocus: "Long Content Initial Body Focus",
    ModalSizeLg: "Size Lg",
    ModalSizeMd: "Size Md",
    ModalSizeSm: "Size Sm",
    ModalUsePortal: "Use Portal",
  },
  badge: {
    BadgeDefault: "Default",
    BadgeColors: "Colors",
    BadgeRounded: "Rounded",
    BadgeSizes: "Sizes",
    BadgeVariants: "Variants",
  },
  accordion: {
    AccordionDefault: "Default",
    AccordionSingleSelection: "Single Selection",
    AccordionControlled: "Controlled",
    AccordionWithComplexContent: "With Complex Content",
  },
  carousel: {
    CarouselDefault: "Default",
    CarouselFullBanner: "Full Banner",
    CarouselElementBanner: "Element Banner",
    CarouselAutoplay: "Autoplay",
    CarouselMultiple: "Multiple",
    CarouselVertical: "Vertical",
  },
  tab: {
    TabDefault: "Default",
    TabFillType: "Fill 타입",
    TabFillTypeFull: "Fill 타입 (풀사이즈)",
    TabLineType: "Line 타입",
    TabLineTypeFull: "Line 타입 (풀사이즈)",
    TabControlled: "제어 모드",
    TabUncontrolled: "비제어 모드",
    TabWithDisabledTabs: "비활성 탭 포함",
    TabWithRichContent: "풍부한 콘텐츠",
    TabCompoundPatternExample: "Compound Pattern 예제",
    TabKeyboardNavigation: "키보드 내비게이션",
  },
  table: {
    TableDefault: "Default",
    TableMobileScroll: "Mobile Scroll",
    TableMultipleColumns: "Multiple Columns",
    TableWithScroll: "With Scroll",
    TableWithoutCaption: "Without Caption",
  },
  "text-list": {
    TextListDefault: "Default",
    TextListOrdered: "Ordered",
    TextListMixed: "Mixed",
    TextListMixedOrdered: "Mixed Ordered",
  },

  // ── Action ────────────────────────────────────────────────────────────
  link: {
    LinkDefault: "Default",
    LinkVariants: "Variants",
    LinkSizes: "Sizes",
    LinkUnderlines: "Underlines",
    LinkWithIcons: "With Icons",
  },
  button: {
    ButtonPrimary: "Primary",
    ButtonSecondary: "Secondary",
    ButtonTertiary: "Tertiary",
    ButtonText: "Text",
    ButtonDisabled: "Disabled",
    ButtonIcon: "Icon",
    ButtonSizes: "Sizes",
  },

  // ── Selection ─────────────────────────────────────────────────────────
  "radio-group": {
    RadioDefault: "Default",
    RadioWithDescription: "With Description",
    RadioSize: "Size",
    RadioDisabled: "Disabled",
    RadioCheckedDisabled: "Checked Disabled",
    RadioGroupExample: "Radio Group Example",
    RadioGroupColumn: "Radio Group Column",
    RadioGroupColumnControlled: "Radio Group Column Controlled",
    RadioSortDefault: "Sort Variant",
  },
  checkbox: {
    CheckboxDefault: "Default",
    CheckboxChecked: "Checked",
    CheckboxWithDescription: "With Description",
    CheckboxSize: "Size",
    CheckboxDisabled: "Disabled",
    CheckboxCheckedDisabled: "Checked Disabled",
    CheckboxIndeterminate: "Indeterminate",
    CheckboxGroup: "Group",
    CheckboxGroupColumn: "Group Column",
    CheckboxChip: "Chip Variant",
  },
  select: {
    SelectDefault: "Default",
    SelectStates: "States",
    SelectSizes: "Sizes",
    SelectSorting: "Sorting",
    SelectControlled: "Controlled",
  },
  tag: {
    TagDefault: "Default",
    TagDeletable: "Deletable",
    TagLink: "Link",
    TagLinkTag: "Link Tag",
    TagDeleteDisabled: "Delete Disabled",
  },
  spinner: {
    SpinnerDefault: "Default",
    SpinnerWithoutLabel: "Without Label",
    SpinnerWithFormSpinner: "With Form Spinner",
    SpinnerMultipleSpinners: "Multiple Spinners",
  },

  // ── Feedback ──────────────────────────────────────────────────────────
  "toggle-switch": {
    ToggleSwitchDefault: "Default",
    ToggleSwitchChecked: "Checked",
    ToggleSwitchDisabled: "Disabled",
    ToggleSwitchDisabledChecked: "Disabled Checked",
    ToggleSwitchMedium: "Medium",
    ToggleSwitchLarge: "Large",
    ToggleSwitchControlled: "Controlled",
    ToggleSwitchAllVariants: "All Variants",
  },

  // ── Help ──────────────────────────────────────────────────────────────
  "coach-mark": {
    CoachMarkDefault: "Default",
    CoachMarkSecondStep: "Second Step",
    CoachMarkLongDescription: "Long Description",
    CoachMarkInteractive: "Interactive",
  },
  "help-panel": {
    HelpPanelDefault: "Default",
    HelpPanelWithTabs: "With Tabs",
  },
  "tutorial-panel": {
    TutorialPanelDefault: "Default",
    TutorialPanelControlled: "Controlled",
  },
  "contextual-help": {
    ContextualHelpDefault: "Default",
    ContextualHelpList: "List",
  },
  tooltip: {
    TooltipVertical: "Vertical",
    TooltipHorizontal: "Horizontal",
    TooltipBox: "Box",
    TooltipWithIcon: "With Icon",
    TooltipKeyboard: "Keyboard",
  },

  // ── Settings ──────────────────────────────────────────────────────────
  "language-switcher": {
    LanguageSwitcherDefault: "Default",
    LanguageSwitcherSimple: "Simple",
    LanguageSwitcherControlled: "Controlled",
  },
  resize: {
    ResizeDefault: "기본",
    ResizeControlled: "제어 상태",
    ResizeCustomLabels: "커스텀 라벨",
  },

  // ── Input ─────────────────────────────────────────────────────────────
  "file-upload": {
    FileUploadDefault: "Default",
    FileUploadWithFiles: "With Files",
    FileUploadDisabled: "Disabled",
    FileUploadNoDelete: "No Delete",
    FileUploadRestrictedFileTypes: "Restricted File Types",
    FileUploadInteractive: "Interactive",
  },
  "date-input": {
    DateInputDefault: "Default",
    DateInputWithHint: "With Hint",
    DateInputWithDefaultValue: "With Default Value",
    DateInputControlled: "Controlled",
    DateInputAllStates: "All States",
  },
  textarea: {
    TextareaDefault: "Default",
    TextareaWithCounter: "With Counter",
    TextareaWithMaxLength: "With Max Length",
    TextareaStates: "States",
    TextareaErrorWithCounter: "Error With Counter",
    TextareaControlled: "Controlled",
  },
  "text-input": {
    TextInputDefault: "Default",
    TextInputSizes: "Sizes",
    TextInputStates: "States",
    TextInputWithPasswordToggle: "With Password Toggle",
    TextInputWithClearButton: "With Clear Button",
    TextInputWithMultipleButtons: "With Multiple Buttons",
    TextInputControlled: "Controlled",
    TextInputUncontrolled: "Uncontrolled",
    TextInputWithoutLabel: "Without Label",
    TextInputWithoutHint: "Without Hint",
  },
} as const satisfies Partial<Record<ExampleSlug, Record<string, string>>>

export function getExampleTitle(slug: string, name: string): string | undefined {
  const group = (EXAMPLE_TITLES as Record<string, Record<string, string>>)[slug]
  return group?.[name]
}

// rsc:safe — static registry of all 168 example components.
//
// Uses static ESM imports (not lazy `() => import(...)`) so that the
// Next.js bundler fully resolves each "use client" module as a client
// reference at compile time. Lazy dynamic imports preserved the
// "use client" boundary incorrectly when called from a Server
// Component, causing RSC serialization errors for examples with
// interactive event handlers (e.g. TagClosable).

import type { ComponentType } from "react"

import _ex0 from "@/components/examples/accordion/AccordionControlled"
import _ex1 from "@/components/examples/accordion/AccordionDefault"
import _ex2 from "@/components/examples/accordion/AccordionSingleSelection"
import _ex3 from "@/components/examples/accordion/AccordionWithComplexContent"
import _ex4 from "@/components/examples/badge/BadgeColors"
import _ex5 from "@/components/examples/badge/BadgeDefault"
import _ex6 from "@/components/examples/badge/BadgeRounded"
import _ex7 from "@/components/examples/badge/BadgeSizes"
import _ex8 from "@/components/examples/badge/BadgeVariants"
import _ex9 from "@/components/examples/breadcrumb/BreadcrumbDefault"
import _ex10 from "@/components/examples/breadcrumb/BreadcrumbSingleItem"
import _ex11 from "@/components/examples/breadcrumb/BreadcrumbWithDisabledItem"
import _ex12 from "@/components/examples/button/ButtonDisabled"
import _ex13 from "@/components/examples/button/ButtonIcon"
import _ex14 from "@/components/examples/button/ButtonPrimary"
import _ex15 from "@/components/examples/button/ButtonSecondary"
import _ex16 from "@/components/examples/button/ButtonSizes"
import _ex17 from "@/components/examples/button/ButtonTertiary"
import _ex18 from "@/components/examples/button/ButtonText"
import _ex19 from "@/components/examples/calendar/CalendarBottomPosition"
import _ex20 from "@/components/examples/calendar/CalendarControlled"
import _ex21 from "@/components/examples/calendar/CalendarControlledRange"
import _ex22 from "@/components/examples/calendar/CalendarCustomButtonText"
import _ex23 from "@/components/examples/calendar/CalendarDefault"
import _ex24 from "@/components/examples/calendar/CalendarDisabled"
import _ex25 from "@/components/examples/calendar/CalendarOpenState"
import _ex26 from "@/components/examples/calendar/CalendarRange"
import _ex27 from "@/components/examples/calendar/CalendarReadOnly"
import _ex28 from "@/components/examples/calendar/CalendarSingle"
import _ex29 from "@/components/examples/calendar/CalendarTopPosition"
import _ex30 from "@/components/examples/calendar/CalendarWithDefaultRange"
import _ex31 from "@/components/examples/calendar/CalendarWithDefaultValue"
import _ex32 from "@/components/examples/calendar/CalendarWithDisabledDates"
import _ex33 from "@/components/examples/calendar/CalendarWithEventDates"
import _ex34 from "@/components/examples/carousel/CarouselAutoplay"
import _ex35 from "@/components/examples/carousel/CarouselDefault"
import _ex36 from "@/components/examples/carousel/CarouselElementBanner"
import _ex37 from "@/components/examples/carousel/CarouselFullBanner"
import _ex38 from "@/components/examples/carousel/CarouselMultiple"
import _ex39 from "@/components/examples/carousel/CarouselVertical"
import _ex40 from "@/components/examples/checkbox/CheckboxDefault"
import _ex41 from "@/components/examples/checkbox/CheckboxDisabled"
import _ex42 from "@/components/examples/checkbox/CheckboxGroup"
import _ex43 from "@/components/examples/checkbox/CheckboxIndeterminate"
import _ex44 from "@/components/examples/coach-mark/CoachMarkSecondStep"
import _ex45 from "@/components/examples/coach-mark/CoachMarkDefault"
import _ex46 from "@/components/examples/coach-mark/CoachMarkInteractive"
import _ex186 from "@/components/examples/coach-mark/CoachMarkLongDescription"
import _ex47 from "@/components/examples/contextual-help/ContextualHelpDefault"
import _ex48 from "@/components/examples/contextual-help/ContextualHelpList"
import _ex49 from "@/components/examples/critical-alert/CriticalAlertCustomLinkText"
import _ex50 from "@/components/examples/critical-alert/CriticalAlertDefault"
import _ex51 from "@/components/examples/critical-alert/CriticalAlertWithoutLink"
import _ex52 from "@/components/examples/date-input/DateInputDefault"
import _ex53 from "@/components/examples/date-input/DateInputWithHint"
import _ex54 from "@/components/examples/date-input/DateInputWithDefaultValue"
import _ex55 from "@/components/examples/date-input/DateInputControlled"
import _ex56 from "@/components/examples/date-input/DateInputAllStates"
import _ex57 from "@/components/examples/disclosure/DisclosureControlledExample"
import _ex58 from "@/components/examples/disclosure/DisclosureDefault"
import _ex59 from "@/components/examples/disclosure/DisclosureDefaultExpanded"
import _ex60 from "@/components/examples/disclosure/DisclosureMultipleDisclosures"
import _ex61 from "@/components/examples/disclosure/DisclosureWithRichContent"
import _ex62 from "@/components/examples/file-upload/FileUploadDefault"
import _ex63 from "@/components/examples/file-upload/FileUploadWithFiles"
import _ex64 from "@/components/examples/file-upload/FileUploadDisabled"
import _ex194 from "@/components/examples/file-upload/FileUploadNoDelete"
import _ex195 from "@/components/examples/file-upload/FileUploadRestrictedFileTypes"
import _ex196 from "@/components/examples/file-upload/FileUploadInteractive"
import _ex65 from "@/components/examples/footer/FooterDefault"
import _ex66 from "@/components/examples/footer/FooterMinimal"
import _ex67 from "@/components/examples/footer/FooterSimple"
import _ex68 from "@/components/examples/header/HeaderDefault"
import _ex69 from "@/components/examples/header/HeaderLoggedIn"
import _ex70 from "@/components/examples/help-panel/HelpPanelDefault"
import _ex71 from "@/components/examples/help-panel/HelpPanelWithTabs"
import _ex72 from "@/components/examples/identifier/IdentifierDefault"
import _ex73 from "@/components/examples/in-page-navigation/InPageNavigationDefault"
import _ex74 from "@/components/examples/in-page-navigation/InPageNavigationLongItems"
import _ex75 from "@/components/examples/in-page-navigation/InPageNavigationWithScrollFunctionality"
import _ex76 from "@/components/examples/in-page-navigation/InPageNavigationWithoutAction"
import _ex77 from "@/components/examples/language-switcher/LanguageSwitcherDefault"
import _ex78 from "@/components/examples/language-switcher/LanguageSwitcherSimple"
import _ex197 from "@/components/examples/language-switcher/LanguageSwitcherControlled"
import _ex79 from "@/components/examples/link/LinkDefault"
import _ex80 from "@/components/examples/link/LinkSizes"
import _ex81 from "@/components/examples/link/LinkUnderlines"
import _ex82 from "@/components/examples/link/LinkVariants"
import _ex83 from "@/components/examples/link/LinkWithIcons"
import _ex84 from "@/components/examples/main-menu/MainMenuDefault"
import _exMainMenuWithPanel from "@/components/examples/main-menu/MainMenuWithPanel"
import _ex85 from "@/components/examples/masthead/MastheadDefault"
import _ex86 from "@/components/examples/modal/ModalAsChildTrigger"
import _ex87 from "@/components/examples/modal/ModalBottomSheet"
import _ex88 from "@/components/examples/modal/ModalDefault"
import _ex89 from "@/components/examples/modal/ModalLongContentInitialBodyFocus"
import _ex90 from "@/components/examples/modal/ModalSizeLg"
import _ex91 from "@/components/examples/modal/ModalSizeMd"
import _ex92 from "@/components/examples/modal/ModalSizeSm"
import _ex93 from "@/components/examples/modal/ModalUsePortal"
import _ex94 from "@/components/examples/pagination/PaginationControlled"
import _ex95 from "@/components/examples/pagination/PaginationDefault"
import _ex96 from "@/components/examples/pagination/PaginationWithManyPages"
import _ex97 from "@/components/examples/radio-group/RadioCheckedDisabled"
import _ex98 from "@/components/examples/radio-group/RadioDefault"
import _ex99 from "@/components/examples/radio-group/RadioDisabled"
import _ex100 from "@/components/examples/radio-group/RadioGroupColumn"
import _ex101 from "@/components/examples/radio-group/RadioGroupColumnControlled"
import _ex102 from "@/components/examples/radio-group/RadioGroupExample"
import _ex103 from "@/components/examples/radio-group/RadioSize"
import _ex104 from "@/components/examples/radio-group/RadioSortDefault"
import _ex105 from "@/components/examples/radio-group/RadioWithDescription"
import _ex106 from "@/components/examples/resize/ResizeDefault"
import _ex198 from "@/components/examples/resize/ResizeControlled"
import _ex199 from "@/components/examples/resize/ResizeCustomLabels"
import _ex107 from "@/components/examples/select/SelectDefault"
import _ex108 from "@/components/examples/select/SelectStates"
import _ex109 from "@/components/examples/select/SelectSizes"
import _ex110 from "@/components/examples/select/SelectSorting"
import _ex174 from "@/components/examples/select/SelectControlled"
import _ex111 from "@/components/examples/side-navigation/SideNavigationDefault"
import _ex112 from "@/components/examples/side-navigation/SideNavigationSimpleMenu"
import _ex113 from "@/components/examples/side-navigation/SideNavigationWithPopupOnly"
import _ex114 from "@/components/examples/skip-link/SkipLinkCustomTarget"
import _ex115 from "@/components/examples/skip-link/SkipLinkDefault"
import _ex116 from "@/components/examples/spinner/SpinnerDefault"
import _ex183 from "@/components/examples/spinner/SpinnerWithoutLabel"
import _ex184 from "@/components/examples/spinner/SpinnerWithFormSpinner"
import _ex185 from "@/components/examples/spinner/SpinnerMultipleSpinners"
import _ex118 from "@/components/examples/step-indicator/StepIndicatorDefault"
import _ex119 from "@/components/examples/step-indicator/StepIndicatorAllCompleted"
import _ex120 from "@/components/examples/step-indicator/StepIndicatorAllDefault"
import _ex182 from "@/components/examples/step-indicator/StepIndicatorWithPageTitle"
import _ex121 from "@/components/examples/structured-list/StructuredListDefault"
import _ex122 from "@/components/examples/structured-list/StructuredListLongText"
import _ex123 from "@/components/examples/structured-list/StructuredListMinimalData"
import _ex124 from "@/components/examples/structured-list/StructuredListVariousBadges"
import _ex125 from "@/components/examples/tab/TabCompoundPatternExample"
import _ex126 from "@/components/examples/tab/TabControlled"
import _ex127 from "@/components/examples/tab/TabDefault"
import _ex128 from "@/components/examples/tab/TabFillType"
import _ex129 from "@/components/examples/tab/TabFillTypeFull"
import _ex130 from "@/components/examples/tab/TabKeyboardNavigation"
import _ex131 from "@/components/examples/tab/TabLineType"
import _ex132 from "@/components/examples/tab/TabLineTypeFull"
import _ex133 from "@/components/examples/tab/TabUncontrolled"
import _ex134 from "@/components/examples/tab/TabWithDisabledTabs"
import _ex135 from "@/components/examples/tab/TabWithRichContent"
import _ex136 from "@/components/examples/table/TableDefault"
import _ex137 from "@/components/examples/table/TableMobileScroll"
import _ex138 from "@/components/examples/table/TableMultipleColumns"
import _ex139 from "@/components/examples/table/TableWithScroll"
import _ex140 from "@/components/examples/table/TableWithoutCaption"
import _ex141 from "@/components/examples/tag/TagDeletable"
import _ex142 from "@/components/examples/tag/TagDeleteDisabled"
import _ex143 from "@/components/examples/tag/TagDefault"
import _ex144 from "@/components/examples/tag/TagLink"
import _ex175 from "@/components/examples/tag/TagLinkTag"
import _ex145 from "@/components/examples/text-input/TextInputDefault"
import _ex146 from "@/components/examples/text-input/TextInputSizes"
import _ex147 from "@/components/examples/text-input/TextInputStates"
import _ex148 from "@/components/examples/text-input/TextInputWithPasswordToggle"
import _ex149 from "@/components/examples/text-input/TextInputWithClearButton"
import _ex189 from "@/components/examples/text-input/TextInputWithMultipleButtons"
import _ex190 from "@/components/examples/text-input/TextInputControlled"
import _ex191 from "@/components/examples/text-input/TextInputUncontrolled"
import _ex192 from "@/components/examples/text-input/TextInputWithoutLabel"
import _ex193 from "@/components/examples/text-input/TextInputWithoutHint"
import _ex150 from "@/components/examples/text-list/TextListDefault"
import _ex151 from "@/components/examples/text-list/TextListMixed"
import _ex152 from "@/components/examples/text-list/TextListMixedOrdered"
import _ex153 from "@/components/examples/text-list/TextListOrdered"
import _ex154 from "@/components/examples/textarea/TextareaDefault"
import _ex155 from "@/components/examples/textarea/TextareaWithCounter"
import _ex156 from "@/components/examples/textarea/TextareaWithMaxLength"
import _ex157 from "@/components/examples/textarea/TextareaStates"
import _ex187 from "@/components/examples/textarea/TextareaErrorWithCounter"
import _ex188 from "@/components/examples/textarea/TextareaControlled"
import _ex158 from "@/components/examples/toggle-switch/ToggleSwitchDefault"
import _ex159 from "@/components/examples/toggle-switch/ToggleSwitchDisabled"
import _ex176 from "@/components/examples/toggle-switch/ToggleSwitchChecked"
import _ex177 from "@/components/examples/toggle-switch/ToggleSwitchDisabledChecked"
import _ex178 from "@/components/examples/toggle-switch/ToggleSwitchMedium"
import _ex179 from "@/components/examples/toggle-switch/ToggleSwitchLarge"
import _ex180 from "@/components/examples/toggle-switch/ToggleSwitchControlled"
import _ex181 from "@/components/examples/toggle-switch/ToggleSwitchAllVariants"
import _ex161 from "@/components/examples/tooltip/TooltipVertical"
import _ex162 from "@/components/examples/tooltip/TooltipHorizontal"
import _ex163 from "@/components/examples/tooltip/TooltipBox"
import _ex164 from "@/components/examples/tooltip/TooltipWithIcon"
import _ex164a from "@/components/examples/tooltip/TooltipKeyboard"
import _ex165 from "@/components/examples/tutorial-panel/TutorialPanelControlled"
import _ex166 from "@/components/examples/tutorial-panel/TutorialPanelDefault"
import _ex168 from "@/components/examples/checkbox/CheckboxCheckedDisabled"
import _ex169 from "@/components/examples/checkbox/CheckboxChip"
import _ex170 from "@/components/examples/checkbox/CheckboxGroupColumn"
import _ex171 from "@/components/examples/checkbox/CheckboxSize"
import _ex172 from "@/components/examples/checkbox/CheckboxWithDescription"
import _ex173 from "@/components/examples/checkbox/CheckboxChecked"

export const EXAMPLE_REGISTRY: Record<string, ComponentType> = {
  "accordion/AccordionControlled": _ex0,
  "accordion/AccordionDefault": _ex1,
  "accordion/AccordionSingleSelection": _ex2,
  "accordion/AccordionWithComplexContent": _ex3,
  "badge/BadgeColors": _ex4,
  "badge/BadgeDefault": _ex5,
  "badge/BadgeRounded": _ex6,
  "badge/BadgeSizes": _ex7,
  "badge/BadgeVariants": _ex8,
  "breadcrumb/BreadcrumbDefault": _ex9,
  "breadcrumb/BreadcrumbSingleItem": _ex10,
  "breadcrumb/BreadcrumbWithDisabledItem": _ex11,
  "button/ButtonDisabled": _ex12,
  "button/ButtonIcon": _ex13,
  "button/ButtonPrimary": _ex14,
  "button/ButtonSecondary": _ex15,
  "button/ButtonSizes": _ex16,
  "button/ButtonTertiary": _ex17,
  "button/ButtonText": _ex18,
  "calendar/CalendarBottomPosition": _ex19,
  "calendar/CalendarControlled": _ex20,
  "calendar/CalendarControlledRange": _ex21,
  "calendar/CalendarCustomButtonText": _ex22,
  "calendar/CalendarDefault": _ex23,
  "calendar/CalendarDisabled": _ex24,
  "calendar/CalendarOpenState": _ex25,
  "calendar/CalendarRange": _ex26,
  "calendar/CalendarReadOnly": _ex27,
  "calendar/CalendarSingle": _ex28,
  "calendar/CalendarTopPosition": _ex29,
  "calendar/CalendarWithDefaultRange": _ex30,
  "calendar/CalendarWithDefaultValue": _ex31,
  "calendar/CalendarWithDisabledDates": _ex32,
  "calendar/CalendarWithEventDates": _ex33,
  "carousel/CarouselAutoplay": _ex34,
  "carousel/CarouselDefault": _ex35,
  "carousel/CarouselElementBanner": _ex36,
  "carousel/CarouselFullBanner": _ex37,
  "carousel/CarouselMultiple": _ex38,
  "carousel/CarouselVertical": _ex39,
  "checkbox/CheckboxChecked": _ex173,
  "checkbox/CheckboxCheckedDisabled": _ex168,
  "checkbox/CheckboxChip": _ex169,
  "checkbox/CheckboxDefault": _ex40,
  "checkbox/CheckboxDisabled": _ex41,
  "checkbox/CheckboxGroup": _ex42,
  "checkbox/CheckboxGroupColumn": _ex170,
  "checkbox/CheckboxIndeterminate": _ex43,
  "checkbox/CheckboxSize": _ex171,
  "checkbox/CheckboxWithDescription": _ex172,
  "coach-mark/CoachMarkDefault": _ex45,
  "coach-mark/CoachMarkInteractive": _ex46,
  "coach-mark/CoachMarkLongDescription": _ex186,
  "coach-mark/CoachMarkSecondStep": _ex44,
  "contextual-help/ContextualHelpDefault": _ex47,
  "contextual-help/ContextualHelpList": _ex48,
  "critical-alert/CriticalAlertCustomLinkText": _ex49,
  "critical-alert/CriticalAlertDefault": _ex50,
  "critical-alert/CriticalAlertWithoutLink": _ex51,
  "date-input/DateInputDefault": _ex52,
  "date-input/DateInputWithHint": _ex53,
  "date-input/DateInputWithDefaultValue": _ex54,
  "date-input/DateInputControlled": _ex55,
  "date-input/DateInputAllStates": _ex56,
  "disclosure/DisclosureControlledExample": _ex57,
  "disclosure/DisclosureDefault": _ex58,
  "disclosure/DisclosureDefaultExpanded": _ex59,
  "disclosure/DisclosureMultipleDisclosures": _ex60,
  "disclosure/DisclosureWithRichContent": _ex61,
  "file-upload/FileUploadDefault": _ex62,
  "file-upload/FileUploadWithFiles": _ex63,
  "file-upload/FileUploadDisabled": _ex64,
  "file-upload/FileUploadNoDelete": _ex194,
  "file-upload/FileUploadRestrictedFileTypes": _ex195,
  "file-upload/FileUploadInteractive": _ex196,
  "footer/FooterDefault": _ex65,
  "footer/FooterMinimal": _ex66,
  "footer/FooterSimple": _ex67,
  "header/HeaderDefault": _ex68,
  "header/HeaderLoggedIn": _ex69,
  "help-panel/HelpPanelDefault": _ex70,
  "help-panel/HelpPanelWithTabs": _ex71,
  "identifier/IdentifierDefault": _ex72,
  "in-page-navigation/InPageNavigationDefault": _ex73,
  "in-page-navigation/InPageNavigationLongItems": _ex74,
  "in-page-navigation/InPageNavigationWithScrollFunctionality": _ex75,
  "in-page-navigation/InPageNavigationWithoutAction": _ex76,
  "language-switcher/LanguageSwitcherDefault": _ex77,
  "language-switcher/LanguageSwitcherSimple": _ex78,
  "language-switcher/LanguageSwitcherControlled": _ex197,
  "link/LinkDefault": _ex79,
  "link/LinkSizes": _ex80,
  "link/LinkUnderlines": _ex81,
  "link/LinkVariants": _ex82,
  "link/LinkWithIcons": _ex83,
  "main-menu/MainMenuDefault": _ex84,
  "main-menu/MainMenuWithPanel": _exMainMenuWithPanel,
  "masthead/MastheadDefault": _ex85,
  "modal/ModalAsChildTrigger": _ex86,
  "modal/ModalBottomSheet": _ex87,
  "modal/ModalDefault": _ex88,
  "modal/ModalLongContentInitialBodyFocus": _ex89,
  "modal/ModalSizeLg": _ex90,
  "modal/ModalSizeMd": _ex91,
  "modal/ModalSizeSm": _ex92,
  "modal/ModalUsePortal": _ex93,
  "pagination/PaginationControlled": _ex94,
  "pagination/PaginationDefault": _ex95,
  "pagination/PaginationWithManyPages": _ex96,
  "radio-group/RadioCheckedDisabled": _ex97,
  "radio-group/RadioDefault": _ex98,
  "radio-group/RadioDisabled": _ex99,
  "radio-group/RadioGroupColumn": _ex100,
  "radio-group/RadioGroupColumnControlled": _ex101,
  "radio-group/RadioGroupExample": _ex102,
  "radio-group/RadioSize": _ex103,
  "radio-group/RadioSortDefault": _ex104,
  "radio-group/RadioWithDescription": _ex105,
  "resize/ResizeDefault": _ex106,
  "resize/ResizeControlled": _ex198,
  "resize/ResizeCustomLabels": _ex199,
  "select/SelectControlled": _ex174,
  "select/SelectDefault": _ex107,
  "select/SelectSizes": _ex109,
  "select/SelectSorting": _ex110,
  "select/SelectStates": _ex108,
  "side-navigation/SideNavigationDefault": _ex111,
  "side-navigation/SideNavigationSimpleMenu": _ex112,
  "side-navigation/SideNavigationWithPopupOnly": _ex113,
  "skip-link/SkipLinkCustomTarget": _ex114,
  "skip-link/SkipLinkDefault": _ex115,
  "spinner/SpinnerDefault": _ex116,
  "spinner/SpinnerWithoutLabel": _ex183,
  "spinner/SpinnerWithFormSpinner": _ex184,
  "spinner/SpinnerMultipleSpinners": _ex185,
  "step-indicator/StepIndicatorDefault": _ex118,
  "step-indicator/StepIndicatorAllCompleted": _ex119,
  "step-indicator/StepIndicatorAllDefault": _ex120,
  "step-indicator/StepIndicatorWithPageTitle": _ex182,
  "structured-list/StructuredListDefault": _ex121,
  "structured-list/StructuredListLongText": _ex122,
  "structured-list/StructuredListMinimalData": _ex123,
  "structured-list/StructuredListVariousBadges": _ex124,
  "tab/TabCompoundPatternExample": _ex125,
  "tab/TabControlled": _ex126,
  "tab/TabDefault": _ex127,
  "tab/TabFillType": _ex128,
  "tab/TabFillTypeFull": _ex129,
  "tab/TabKeyboardNavigation": _ex130,
  "tab/TabLineType": _ex131,
  "tab/TabLineTypeFull": _ex132,
  "tab/TabUncontrolled": _ex133,
  "tab/TabWithDisabledTabs": _ex134,
  "tab/TabWithRichContent": _ex135,
  "table/TableDefault": _ex136,
  "table/TableMobileScroll": _ex137,
  "table/TableMultipleColumns": _ex138,
  "table/TableWithScroll": _ex139,
  "table/TableWithoutCaption": _ex140,
  "tag/TagDeletable": _ex141,
  "tag/TagDeleteDisabled": _ex142,
  "tag/TagDefault": _ex143,
  "tag/TagLink": _ex144,
  "tag/TagLinkTag": _ex175,
  "text-input/TextInputDefault": _ex145,
  "text-input/TextInputSizes": _ex146,
  "text-input/TextInputStates": _ex147,
  "text-input/TextInputWithPasswordToggle": _ex148,
  "text-input/TextInputWithClearButton": _ex149,
  "text-input/TextInputWithMultipleButtons": _ex189,
  "text-input/TextInputControlled": _ex190,
  "text-input/TextInputUncontrolled": _ex191,
  "text-input/TextInputWithoutLabel": _ex192,
  "text-input/TextInputWithoutHint": _ex193,
  "text-list/TextListDefault": _ex150,
  "text-list/TextListMixed": _ex151,
  "text-list/TextListMixedOrdered": _ex152,
  "text-list/TextListOrdered": _ex153,
  "textarea/TextareaDefault": _ex154,
  "textarea/TextareaWithCounter": _ex155,
  "textarea/TextareaWithMaxLength": _ex156,
  "textarea/TextareaStates": _ex157,
  "textarea/TextareaErrorWithCounter": _ex187,
  "textarea/TextareaControlled": _ex188,
  "toggle-switch/ToggleSwitchDefault": _ex158,
  "toggle-switch/ToggleSwitchDisabled": _ex159,
  "toggle-switch/ToggleSwitchChecked": _ex176,
  "toggle-switch/ToggleSwitchDisabledChecked": _ex177,
  "toggle-switch/ToggleSwitchMedium": _ex178,
  "toggle-switch/ToggleSwitchLarge": _ex179,
  "toggle-switch/ToggleSwitchControlled": _ex180,
  "toggle-switch/ToggleSwitchAllVariants": _ex181,
  "tooltip/TooltipVertical": _ex161,
  "tooltip/TooltipHorizontal": _ex162,
  "tooltip/TooltipBox": _ex163,
  "tooltip/TooltipWithIcon": _ex164,
  "tooltip/TooltipKeyboard": _ex164a,
  "tutorial-panel/TutorialPanelControlled": _ex165,
  "tutorial-panel/TutorialPanelDefault": _ex166,
}

export function loadExample(slug: string, name: string): ComponentType {
  const key = `${slug}/${name}`
  const Component = EXAMPLE_REGISTRY[key]
  if (!Component) {
    throw new Error(`Example not found in registry: ${key}`)
  }
  return Component
}

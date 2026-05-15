// rsc:safe — static registry of all 139 example components.
//
// Uses static ESM imports (not lazy `() => import(...)`) so that the
// Next.js bundler fully resolves each "use client" module as a client
// reference at compile time. Lazy dynamic imports preserved the
// "use client" boundary incorrectly when called from a Server
// Component, causing RSC serialization errors for examples with
// interactive event handlers (e.g. TagClosable).

import type { ComponentType } from "react";

import _ex0 from "@/components/examples/accordion/AccordionControlled";
import _ex1 from "@/components/examples/accordion/AccordionDefault";
import _ex2 from "@/components/examples/accordion/AccordionLine";
import _ex3 from "@/components/examples/accordion/AccordionMultiple";
import _ex4 from "@/components/examples/accordion/AccordionNested";
import _ex5 from "@/components/examples/badge/BadgeAllColors";
import _ex6 from "@/components/examples/badge/BadgeDefault";
import _ex7 from "@/components/examples/badge/BadgeRounded";
import _ex8 from "@/components/examples/badge/BadgeSizes";
import _ex9 from "@/components/examples/badge/BadgeVariants";
import _ex10 from "@/components/examples/breadcrumb/BreadcrumbDefault";
import _ex11 from "@/components/examples/breadcrumb/BreadcrumbLong";
import _ex12 from "@/components/examples/button/ButtonDisabled";
import _ex13 from "@/components/examples/button/ButtonIcon";
import _ex14 from "@/components/examples/button/ButtonPrimary";
import _ex15 from "@/components/examples/button/ButtonSecondary";
import _ex16 from "@/components/examples/button/ButtonSizes";
import _ex17 from "@/components/examples/button/ButtonTertiary";
import _ex18 from "@/components/examples/calendar/CalendarDefault";
import _ex19 from "@/components/examples/calendar/CalendarMultiple";
import _ex20 from "@/components/examples/calendar/CalendarRange";
import _ex21 from "@/components/examples/calendar/CalendarWithDisabled";
import _ex22 from "@/components/examples/carousel/CarouselAutoplay";
import _ex23 from "@/components/examples/carousel/CarouselDefault";
import _ex24 from "@/components/examples/carousel/CarouselMultiple";
import _ex25 from "@/components/examples/carousel/CarouselVertical";
import _ex26 from "@/components/examples/checkbox/CheckboxDefault";
import _ex27 from "@/components/examples/checkbox/CheckboxDisabled";
import _ex28 from "@/components/examples/checkbox/CheckboxGroup";
import _ex29 from "@/components/examples/checkbox/CheckboxIndeterminate";
import _ex30 from "@/components/examples/coach-mark/CoachMarkControlled";
import _ex31 from "@/components/examples/coach-mark/CoachMarkDefault";
import _ex32 from "@/components/examples/coach-mark/CoachMarkMultiStep";
import _ex33 from "@/components/examples/contextual-help/ContextualHelpDefault";
import _ex34 from "@/components/examples/contextual-help/ContextualHelpTrigger";
import _ex35 from "@/components/examples/critical-alert/CriticalAlertDanger";
import _ex36 from "@/components/examples/critical-alert/CriticalAlertDefault";
import _ex37 from "@/components/examples/critical-alert/CriticalAlertInfo";
import _ex38 from "@/components/examples/critical-alert/CriticalAlertSuccess";
import _ex39 from "@/components/examples/critical-alert/CriticalAlertWarning";
import _ex40 from "@/components/examples/date-input/DateInputDefault";
import _ex41 from "@/components/examples/date-input/DateInputDisabled";
import _ex42 from "@/components/examples/date-input/DateInputRange";
import _ex43 from "@/components/examples/date-input/DateInputRequired";
import _ex44 from "@/components/examples/date-input/DateInputWithLabel";
import _ex45 from "@/components/examples/disclosure/DisclosureControlled";
import _ex46 from "@/components/examples/disclosure/DisclosureDefault";
import _ex47 from "@/components/examples/disclosure/DisclosureMultiple";
import _ex48 from "@/components/examples/file-upload/FileUploadDefault";
import _ex49 from "@/components/examples/file-upload/FileUploadDragDrop";
import _ex50 from "@/components/examples/file-upload/FileUploadMultiple";
import _ex51 from "@/components/examples/footer/FooterDefault";
import _ex52 from "@/components/examples/header/HeaderDefault";
import _ex53 from "@/components/examples/help-panel/HelpPanelDefault";
import _ex54 from "@/components/examples/help-panel/HelpPanelWithActions";
import _ex55 from "@/components/examples/identifier/IdentifierDefault";
import _ex56 from "@/components/examples/in-page-navigation/InPageNavigationDefault";
import _ex57 from "@/components/examples/in-page-navigation/InPageNavigationFixed";
import _ex59 from "@/components/examples/language-switcher/LanguageSwitcherCompact";
import _ex60 from "@/components/examples/language-switcher/LanguageSwitcherDefault";
import _ex61 from "@/components/examples/link/LinkButton";
import _ex62 from "@/components/examples/link/LinkDefault";
import _ex63 from "@/components/examples/link/LinkDisabled";
import _ex64 from "@/components/examples/link/LinkExternal";
import _ex65 from "@/components/examples/link/LinkInline";
import _ex66 from "@/components/examples/link/LinkWithIcon";
import _ex67 from "@/components/examples/main-menu/MainMenuDefault";
import _ex68 from "@/components/examples/main-menu/MainMenuMobile";
import _ex69 from "@/components/examples/main-menu/MainMenuWithDropdown";
import _ex70 from "@/components/examples/masthead/MastheadDefault";
import _ex71 from "@/components/examples/modal/ModalDefault";
import _ex72 from "@/components/examples/modal/ModalFullscreen";
import _ex73 from "@/components/examples/modal/ModalLarge";
import _ex74 from "@/components/examples/modal/ModalSmall";
import _ex75 from "@/components/examples/modal/ModalWithForm";
import _ex76 from "@/components/examples/pagination/PaginationCompact";
import _ex77 from "@/components/examples/pagination/PaginationDefault";
import _ex78 from "@/components/examples/pagination/PaginationWithInfo";
import _ex79 from "@/components/examples/radio-group/RadioGroupControlled";
import _ex80 from "@/components/examples/radio-group/RadioGroupDefault";
import _ex81 from "@/components/examples/radio-group/RadioGroupDisabled";
import _ex82 from "@/components/examples/radio-group/RadioGroupHorizontal";
import _ex83 from "@/components/examples/resize/ResizeDefault";
import _ex84 from "@/components/examples/select/SelectDefault";
import _ex85 from "@/components/examples/select/SelectDisabled";
import _ex86 from "@/components/examples/select/SelectMultiple";
import _ex87 from "@/components/examples/select/SelectWithSearch";
import _ex88 from "@/components/examples/side-navigation/SideNavigationCollapsed";
import _ex89 from "@/components/examples/side-navigation/SideNavigationDefault";
import _ex90 from "@/components/examples/skip-link/SkipLinkDefault";
import _ex91 from "@/components/examples/skip-link/SkipLinkMultiple";
import _ex92 from "@/components/examples/spinner/SpinnerDefault";
import _ex93 from "@/components/examples/spinner/SpinnerSizes";
import _ex94 from "@/components/examples/step-indicator/StepIndicatorDefault";
import _ex95 from "@/components/examples/step-indicator/StepIndicatorVertical";
import _ex96 from "@/components/examples/step-indicator/StepIndicatorWithStatus";
import _ex97 from "@/components/examples/structured-list/StructuredListDefault";
import _ex98 from "@/components/examples/structured-list/StructuredListDense";
import _ex99 from "@/components/examples/structured-list/StructuredListHorizontal";
import _ex100 from "@/components/examples/structured-list/StructuredListWithBorder";
import _ex101 from "@/components/examples/tab/TabControlled";
import _ex102 from "@/components/examples/tab/TabDefault";
import _ex103 from "@/components/examples/tab/TabScrollable";
import _ex104 from "@/components/examples/tab/TabVertical";
import _ex105 from "@/components/examples/tab/TabWithIcons";
import _ex106 from "@/components/examples/table/TableCompact";
import _ex107 from "@/components/examples/table/TableDefault";
import _ex108 from "@/components/examples/table/TableEmpty";
import _ex109 from "@/components/examples/table/TableSelectable";
import _ex110 from "@/components/examples/table/TableSortable";
import _ex111 from "@/components/examples/table/TableWithPagination";
import _ex112 from "@/components/examples/tag/TagClosable";
import _ex113 from "@/components/examples/tag/TagColors";
import _ex114 from "@/components/examples/tag/TagDefault";
import _ex115 from "@/components/examples/tag/TagSizes";
import _ex116 from "@/components/examples/text-input/TextInputDefault";
import _ex117 from "@/components/examples/text-input/TextInputError";
import _ex118 from "@/components/examples/text-input/TextInputPassword";
import _ex119 from "@/components/examples/text-input/TextInputSearch";
import _ex120 from "@/components/examples/text-input/TextInputWithIcon";
import _ex121 from "@/components/examples/text-list/TextListDefault";
import _ex122 from "@/components/examples/text-list/TextListDense";
import _ex123 from "@/components/examples/text-list/TextListNested";
import _ex124 from "@/components/examples/text-list/TextListOrdered";
import _ex125 from "@/components/examples/textarea/TextareaDefault";
import _ex126 from "@/components/examples/textarea/TextareaDisabled";
import _ex127 from "@/components/examples/textarea/TextareaResizable";
import _ex128 from "@/components/examples/textarea/TextareaWithCounter";
import _ex129 from "@/components/examples/toggle-switch/ToggleSwitchDefault";
import _ex130 from "@/components/examples/toggle-switch/ToggleSwitchDisabled";
import _ex131 from "@/components/examples/toggle-switch/ToggleSwitchLabeled";
import _ex132 from "@/components/examples/tooltip/TooltipDefault";
import _ex133 from "@/components/examples/tooltip/TooltipDelayed";
import _ex134 from "@/components/examples/tooltip/TooltipDisabled";
import _ex135 from "@/components/examples/tooltip/TooltipPositions";
import _ex136 from "@/components/examples/tutorial-panel/TutorialPanelControlled";
import _ex137 from "@/components/examples/tutorial-panel/TutorialPanelDefault";
import _ex138 from "@/components/examples/tutorial-panel/TutorialPanelMultiStep";

export const EXAMPLE_REGISTRY: Record<string, ComponentType> = {
  "accordion/AccordionControlled": _ex0,
  "accordion/AccordionDefault": _ex1,
  "accordion/AccordionLine": _ex2,
  "accordion/AccordionMultiple": _ex3,
  "accordion/AccordionNested": _ex4,
  "badge/BadgeAllColors": _ex5,
  "badge/BadgeDefault": _ex6,
  "badge/BadgeRounded": _ex7,
  "badge/BadgeSizes": _ex8,
  "badge/BadgeVariants": _ex9,
  "breadcrumb/BreadcrumbDefault": _ex10,
  "breadcrumb/BreadcrumbLong": _ex11,
  "button/ButtonDisabled": _ex12,
  "button/ButtonIcon": _ex13,
  "button/ButtonPrimary": _ex14,
  "button/ButtonSecondary": _ex15,
  "button/ButtonSizes": _ex16,
  "button/ButtonTertiary": _ex17,
  "calendar/CalendarDefault": _ex18,
  "calendar/CalendarMultiple": _ex19,
  "calendar/CalendarRange": _ex20,
  "calendar/CalendarWithDisabled": _ex21,
  "carousel/CarouselAutoplay": _ex22,
  "carousel/CarouselDefault": _ex23,
  "carousel/CarouselMultiple": _ex24,
  "carousel/CarouselVertical": _ex25,
  "checkbox/CheckboxDefault": _ex26,
  "checkbox/CheckboxDisabled": _ex27,
  "checkbox/CheckboxGroup": _ex28,
  "checkbox/CheckboxIndeterminate": _ex29,
  "coach-mark/CoachMarkControlled": _ex30,
  "coach-mark/CoachMarkDefault": _ex31,
  "coach-mark/CoachMarkMultiStep": _ex32,
  "contextual-help/ContextualHelpDefault": _ex33,
  "contextual-help/ContextualHelpTrigger": _ex34,
  "critical-alert/CriticalAlertDanger": _ex35,
  "critical-alert/CriticalAlertDefault": _ex36,
  "critical-alert/CriticalAlertInfo": _ex37,
  "critical-alert/CriticalAlertSuccess": _ex38,
  "critical-alert/CriticalAlertWarning": _ex39,
  "date-input/DateInputDefault": _ex40,
  "date-input/DateInputDisabled": _ex41,
  "date-input/DateInputRange": _ex42,
  "date-input/DateInputRequired": _ex43,
  "date-input/DateInputWithLabel": _ex44,
  "disclosure/DisclosureControlled": _ex45,
  "disclosure/DisclosureDefault": _ex46,
  "disclosure/DisclosureMultiple": _ex47,
  "file-upload/FileUploadDefault": _ex48,
  "file-upload/FileUploadDragDrop": _ex49,
  "file-upload/FileUploadMultiple": _ex50,
  "footer/FooterDefault": _ex51,
  "header/HeaderDefault": _ex52,
  "help-panel/HelpPanelDefault": _ex53,
  "help-panel/HelpPanelWithActions": _ex54,
  "identifier/IdentifierDefault": _ex55,
  "in-page-navigation/InPageNavigationDefault": _ex56,
  "in-page-navigation/InPageNavigationFixed": _ex57,
  "language-switcher/LanguageSwitcherCompact": _ex59,
  "language-switcher/LanguageSwitcherDefault": _ex60,
  "link/LinkButton": _ex61,
  "link/LinkDefault": _ex62,
  "link/LinkDisabled": _ex63,
  "link/LinkExternal": _ex64,
  "link/LinkInline": _ex65,
  "link/LinkWithIcon": _ex66,
  "main-menu/MainMenuDefault": _ex67,
  "main-menu/MainMenuMobile": _ex68,
  "main-menu/MainMenuWithDropdown": _ex69,
  "masthead/MastheadDefault": _ex70,
  "modal/ModalDefault": _ex71,
  "modal/ModalFullscreen": _ex72,
  "modal/ModalLarge": _ex73,
  "modal/ModalSmall": _ex74,
  "modal/ModalWithForm": _ex75,
  "pagination/PaginationCompact": _ex76,
  "pagination/PaginationDefault": _ex77,
  "pagination/PaginationWithInfo": _ex78,
  "radio-group/RadioGroupControlled": _ex79,
  "radio-group/RadioGroupDefault": _ex80,
  "radio-group/RadioGroupDisabled": _ex81,
  "radio-group/RadioGroupHorizontal": _ex82,
  "resize/ResizeDefault": _ex83,
  "select/SelectDefault": _ex84,
  "select/SelectDisabled": _ex85,
  "select/SelectMultiple": _ex86,
  "select/SelectWithSearch": _ex87,
  "side-navigation/SideNavigationCollapsed": _ex88,
  "side-navigation/SideNavigationDefault": _ex89,
  "skip-link/SkipLinkDefault": _ex90,
  "skip-link/SkipLinkMultiple": _ex91,
  "spinner/SpinnerDefault": _ex92,
  "spinner/SpinnerSizes": _ex93,
  "step-indicator/StepIndicatorDefault": _ex94,
  "step-indicator/StepIndicatorVertical": _ex95,
  "step-indicator/StepIndicatorWithStatus": _ex96,
  "structured-list/StructuredListDefault": _ex97,
  "structured-list/StructuredListDense": _ex98,
  "structured-list/StructuredListHorizontal": _ex99,
  "structured-list/StructuredListWithBorder": _ex100,
  "tab/TabControlled": _ex101,
  "tab/TabDefault": _ex102,
  "tab/TabScrollable": _ex103,
  "tab/TabVertical": _ex104,
  "tab/TabWithIcons": _ex105,
  "table/TableCompact": _ex106,
  "table/TableDefault": _ex107,
  "table/TableEmpty": _ex108,
  "table/TableSelectable": _ex109,
  "table/TableSortable": _ex110,
  "table/TableWithPagination": _ex111,
  "tag/TagClosable": _ex112,
  "tag/TagColors": _ex113,
  "tag/TagDefault": _ex114,
  "tag/TagSizes": _ex115,
  "text-input/TextInputDefault": _ex116,
  "text-input/TextInputError": _ex117,
  "text-input/TextInputPassword": _ex118,
  "text-input/TextInputSearch": _ex119,
  "text-input/TextInputWithIcon": _ex120,
  "text-list/TextListDefault": _ex121,
  "text-list/TextListDense": _ex122,
  "text-list/TextListNested": _ex123,
  "text-list/TextListOrdered": _ex124,
  "textarea/TextareaDefault": _ex125,
  "textarea/TextareaDisabled": _ex126,
  "textarea/TextareaResizable": _ex127,
  "textarea/TextareaWithCounter": _ex128,
  "toggle-switch/ToggleSwitchDefault": _ex129,
  "toggle-switch/ToggleSwitchDisabled": _ex130,
  "toggle-switch/ToggleSwitchLabeled": _ex131,
  "tooltip/TooltipDefault": _ex132,
  "tooltip/TooltipDelayed": _ex133,
  "tooltip/TooltipDisabled": _ex134,
  "tooltip/TooltipPositions": _ex135,
  "tutorial-panel/TutorialPanelControlled": _ex136,
  "tutorial-panel/TutorialPanelDefault": _ex137,
  "tutorial-panel/TutorialPanelMultiStep": _ex138
};

export function loadExample(slug: string, name: string): ComponentType {
  const key = `${slug}/${name}`;
  const Component = EXAMPLE_REGISTRY[key];
  if (!Component) {
    throw new Error(`Example not found in registry: ${key}`);
  }
  return Component;
}

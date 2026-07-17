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
  masthead: { MastheadDefault: "기본" },
  identifier: { IdentifierDefault: "기본" },
  header: { HeaderDefault: "기본", HeaderLoggedIn: "로그인 상태" },
  footer: { FooterDefault: "기본", FooterMinimal: "미니멀", FooterSimple: "심플" },

  // ── Navigation ────────────────────────────────────────────────────────
  "skip-link": { SkipLinkDefault: "기본", SkipLinkCustomTarget: "커스텀 타겟" },
  "main-menu": { MainMenuDefault: "기본", MainMenuWithPanel: "패널 포함", MainMenuMobileDefault: "모바일 기본" },
  breadcrumb: {
    BreadcrumbDefault: "기본",
    BreadcrumbSingleItem: "단일 항목",
    BreadcrumbWithDisabledItem: "비활성화 항목 포함",
  },
  "side-navigation": {
    SideNavigationDefault: "기본",
    SideNavigationSimpleMenu: "심플 메뉴",
    SideNavigationWithPopupOnly: "팝업 전용",
    SideNavigationFourDepth: "4Depth 팝업",
  },
  "in-page-navigation": {
    InPageNavigationDefault: "기본",
    InPageNavigationLongItems: "긴 항목",
    InPageNavigationWithScrollFunctionality: "스크롤 기능 포함",
    InPageNavigationWithoutAction: "액션 없음",
  },
  pagination: {
    PaginationDefault: "기본",
    PaginationControlled: "제어 상태",
    PaginationWithManyPages: "많은 페이지 포함",
  },

  // ── Layout ────────────────────────────────────────────────────────────
  "step-indicator": {
    StepIndicatorDefault: "기본",
    StepIndicatorAllCompleted: "전체 완료",
    StepIndicatorAllDefault: "전체 기본",
    StepIndicatorWithPageTitle: "페이지 제목 포함",
  },
  "structured-list": {
    StructuredListDefault: "기본",
    StructuredListLongText: "긴 텍스트",
    StructuredListMinimalData: "미니멀 데이터",
    StructuredListVariousBadges: "다양한 배지",
  },
  "critical-alert": {
    CriticalAlertDefault: "기본",
    CriticalAlertCustomLinkText: "커스텀 링크 텍스트",
    CriticalAlertWithoutLink: "링크 없음",
  },
  calendar: {
    CalendarDefault: "기본",
    CalendarSingle: "단일",
    CalendarRange: "범위",
    CalendarControlled: "제어 상태",
    CalendarControlledRange: "제어 상태 범위",
    CalendarBottomPosition: "하단 위치",
    CalendarTopPosition: "상단 위치",
    CalendarOpenState: "열린 상태",
    CalendarReadOnly: "읽기 전용",
    CalendarDisabled: "비활성화",
    CalendarCustomButtonText: "커스텀 버튼 텍스트",
    CalendarWithDefaultValue: "기본값 포함",
    CalendarWithDefaultRange: "기본 범위 포함",
    CalendarWithDisabledDates: "비활성화 날짜 포함",
    CalendarWithEventDates: "이벤트 날짜 포함",
  },
  disclosure: {
    DisclosureDefault: "기본",
    DisclosureDefaultExpanded: "기본 확장",
    DisclosureMultipleDisclosures: "다중 디스클로저",
    DisclosureControlledExample: "제어 상태 예제",
    DisclosureWithRichContent: "풍부한 콘텐츠 포함",
  },
  modal: {
    ModalDefault: "기본",
    ModalAsChildTrigger: "asChild 트리거",
    ModalBottomSheet: "바텀 시트",
    ModalLongContentInitialBodyFocus: "긴 콘텐츠 초기 본문 포커스",
    ModalSizeLg: "큰 크기",
    ModalSizeMd: "중간 크기",
    ModalSizeSm: "작은 크기",
    ModalUsePortal: "포탈 사용",
  },
  badge: {
    BadgeDefault: "기본",
    BadgeColors: "색상",
    BadgeRounded: "라운드",
    BadgeSizes: "크기",
    BadgeVariants: "변형",
  },
  accordion: {
    AccordionDefault: "기본",
    AccordionLineType: "라인형",
    AccordionSingleSelection: "단일 선택",
    AccordionControlled: "제어 상태",
    AccordionWithComplexContent: "복잡한 콘텐츠 포함",
  },
  carousel: {
    CarouselDefault: "기본",
    CarouselFullBanner: "전체 배너",
    CarouselElementBanner: "요소 배너",
    CarouselAutoplay: "자동 재생",
    CarouselMultiple: "다중",
    CarouselVertical: "세로형",
  },
  tab: {
    TabDefault: "기본",
    TabFillType: "채움형",
    TabFillTypeFull: "채움형 (전체 너비)",
    TabLineType: "라인형",
    TabLineTypeFull: "라인형 (전체 너비)",
    TabControlled: "제어 상태",
    TabUncontrolled: "비제어 상태",
    TabWithDisabledTabs: "비활성화 탭 포함",
    TabWithRichContent: "풍부한 콘텐츠 포함",
    TabCompoundPatternExample: "컴파운드 패턴 예제",
    TabKeyboardNavigation: "키보드 조작",
  },
  table: {
    TableDefault: "기본",
    TableMobileScroll: "모바일 스크롤",
    TableMultipleColumns: "다중 컬럼",
    TableWithScroll: "스크롤 포함",
    TableWithoutCaption: "캡션 없음",
  },
  "text-list": {
    TextListDefault: "기본",
    TextListOrdered: "순서형",
    TextListMixed: "혼합형",
    TextListMixedOrdered: "혼합 순서형",
  },

  // ── Action ────────────────────────────────────────────────────────────
  link: {
    LinkDefault: "기본",
    LinkVariants: "변형",
    LinkSizes: "크기",
    LinkUnderlines: "밑줄",
    LinkWithIcons: "아이콘 포함",
  },
  button: {
    ButtonPrimary: "Primary",
    ButtonSecondary: "Secondary",
    ButtonTertiary: "Tertiary",
    ButtonText: "텍스트",
    ButtonDisabled: "비활성화",
    ButtonIcon: "아이콘",
    ButtonSizes: "크기",
  },

  // ── Selection ─────────────────────────────────────────────────────────
  "radio-group": {
    RadioDefault: "기본",
    RadioWithDescription: "설명 포함",
    RadioSize: "크기",
    RadioDisabled: "비활성화",
    RadioCheckedDisabled: "선택된 비활성화",
    RadioGroupExample: "라디오 그룹 예제",
    RadioGroupColumn: "라디오 그룹 세로 배치",
    RadioGroupColumnControlled: "라디오 그룹 세로 배치 (제어 상태)",
    RadioChipDefault: "칩",
    RadioSortDefault: "정렬 변형",
  },
  checkbox: {
    CheckboxDefault: "기본",
    CheckboxChecked: "선택됨",
    CheckboxWithDescription: "설명 포함",
    CheckboxSize: "크기",
    CheckboxDisabled: "비활성화",
    CheckboxCheckedDisabled: "선택된 비활성화",
    CheckboxIndeterminate: "중간 상태",
    CheckboxGroup: "그룹",
    CheckboxGroupColumn: "그룹 세로 배치",
    CheckboxChip: "칩 변형",
  },
  select: {
    SelectDefault: "기본",
    SelectStates: "상태",
    SelectSizes: "크기",
    SelectSorting: "정렬",
    SelectControlled: "제어 상태",
  },
  tag: {
    TagDefault: "기본",
    TagDeletable: "삭제 가능",
    TagLink: "링크",
    TagLinkTag: "링크 태그",
    TagDeleteDisabled: "삭제 비활성화",
  },
  spinner: {
    SpinnerDefault: "기본",
    SpinnerWithoutLabel: "라벨 없음",
    SpinnerWithFormSpinner: "폼 스피너 포함",
    SpinnerMultipleSpinners: "다중 스피너",
  },

  // ── Feedback ──────────────────────────────────────────────────────────
  "toggle-switch": {
    ToggleSwitchDefault: "기본",
    ToggleSwitchChecked: "선택됨",
    ToggleSwitchDisabled: "비활성화",
    ToggleSwitchDisabledChecked: "비활성화 선택됨",
    ToggleSwitchMedium: "중간 크기",
    ToggleSwitchLarge: "큰 크기",
    ToggleSwitchControlled: "제어 상태",
    ToggleSwitchAllVariants: "전체 변형",
  },

  // ── Help ──────────────────────────────────────────────────────────────
  "coach-mark": {
    CoachMarkDefault: "기본",
    CoachMarkSecondStep: "두 번째 단계",
    CoachMarkLongDescription: "긴 설명",
    CoachMarkInteractive: "인터랙티브",
  },
  "help-panel": {
    HelpPanelDefault: "기본",
    HelpPanelWithTabs: "탭 포함",
  },
  "tutorial-panel": {
    TutorialPanelDefault: "기본",
    TutorialPanelControlled: "제어 상태",
  },
  "contextual-help": {
    ContextualHelpDefault: "기본",
    ContextualHelpList: "목록",
  },
  tooltip: {
    TooltipVertical: "세로형",
    TooltipHorizontal: "가로형",
    TooltipBox: "박스형",
    TooltipWithIcon: "아이콘 포함",
    TooltipKeyboard: "키보드 조작",
  },

  // ── Settings ──────────────────────────────────────────────────────────
  "language-switcher": {
    LanguageSwitcherDefault: "기본",
    LanguageSwitcherSimple: "심플",
    LanguageSwitcherControlled: "제어 상태",
  },
  resize: {
    ResizeDefault: "기본",
    ResizeControlled: "제어 상태",
    ResizeCustomLabels: "커스텀 라벨",
  },

  // ── Input ─────────────────────────────────────────────────────────────
  "file-upload": {
    FileUploadDefault: "기본",
    FileUploadWithFiles: "파일 목록 포함",
    FileUploadDisabled: "비활성화",
    FileUploadNoDelete: "삭제 불가",
    FileUploadRestrictedFileTypes: "제한된 파일 형식",
    FileUploadInteractive: "인터랙티브",
  },
  "date-input": {
    DateInputDefault: "기본",
    DateInputWithHint: "힌트 포함",
    DateInputWithDefaultValue: "기본값 포함",
    DateInputControlled: "제어 상태",
    DateInputAllStates: "전체 상태",
  },
  textarea: {
    TextareaDefault: "기본",
    TextareaWithCounter: "카운터 포함",
    TextareaWithMaxLength: "최대 길이 포함",
    TextareaStates: "상태",
    TextareaErrorWithCounter: "에러 카운터 포함",
    TextareaControlled: "제어 상태",
  },
  "text-input": {
    TextInputDefault: "기본",
    TextInputSizes: "크기",
    TextInputStates: "상태",
    TextInputWithPasswordToggle: "비밀번호 토글 포함",
    TextInputWithClearButton: "지우기 버튼 포함",
    TextInputWithMultipleButtons: "다중 버튼 포함",
    TextInputControlled: "제어 상태",
    TextInputUncontrolled: "비제어 상태",
    TextInputWithoutLabel: "라벨 없음",
    TextInputWithoutHint: "힌트 없음",
  },
} as const satisfies Partial<Record<ExampleSlug, Record<string, string>>>

export function getExampleTitle(slug: string, name: string): string | undefined {
  const group = (EXAMPLE_TITLES as Record<string, Record<string, string>>)[slug]
  return group?.[name]
}

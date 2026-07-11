// rsc:safe

export type SidebarItem = {
  id: string
  labelKo: string
  labelEn: string
  implemented: boolean
}

export type SidebarGroup = {
  id: string
  title: string
  items: readonly SidebarItem[]
}

export const SIDEBAR_GROUPS: readonly SidebarGroup[] = [
  {
    id: "identity",
    title: "아이덴티티",
    items: [
      { id: "masthead", labelKo: "공식 배너", labelEn: "Masthead", implemented: true },
      { id: "identifier", labelKo: "운영기관 식별자", labelEn: "Identifier", implemented: true },
      { id: "header", labelKo: "헤더", labelEn: "Header", implemented: true },
      { id: "footer", labelKo: "푸터", labelEn: "Footer", implemented: true },
    ],
  },
  {
    id: "navigation",
    title: "탐색",
    items: [
      { id: "skip-link", labelKo: "건너뛰기 링크", labelEn: "Skip link", implemented: true },
      { id: "main-menu", labelKo: "메인 메뉴", labelEn: "Main menu", implemented: true },
      { id: "breadcrumb", labelKo: "브레드크럼", labelEn: "Breadcrumb", implemented: true },
      { id: "side-navigation", labelKo: "사이드 메뉴", labelEn: "Side navigation", implemented: true },
      { id: "in-page-navigation", labelKo: "콘텐츠 내 탐색", labelEn: "In-page navigation", implemented: true },
      { id: "pagination", labelKo: "페이지네이션", labelEn: "Pagination", implemented: true },
    ],
  },
  {
    id: "layout",
    title: "레이아웃 및 표현",
    items: [
      { id: "structured-list", labelKo: "구조화 목록", labelEn: "Structured list", implemented: true },
      { id: "critical-alert", labelKo: "긴급 공지", labelEn: "Critical alerts", implemented: true },
      { id: "calendar", labelKo: "달력", labelEn: "Calendar", implemented: true },
      { id: "disclosure", labelKo: "디스클로저", labelEn: "Disclosure", implemented: true },
      { id: "modal", labelKo: "모달", labelEn: "Modal", implemented: true },
      { id: "badge", labelKo: "배지", labelEn: "Badge", implemented: true },
      { id: "accordion", labelKo: "아코디언", labelEn: "Accordion", implemented: true },
      { id: "carousel", labelKo: "캐러셀", labelEn: "Carousel", implemented: true },
      { id: "tab", labelKo: "탭", labelEn: "Tab", implemented: true },
      { id: "table", labelKo: "표", labelEn: "Table", implemented: true },
      { id: "text-list", labelKo: "텍스트 목록", labelEn: "Text list", implemented: true },
    ],
  },
  {
    id: "action",
    title: "액션",
    items: [
      { id: "link", labelKo: "링크", labelEn: "Link", implemented: true },
      { id: "button", labelKo: "버튼", labelEn: "Button", implemented: true },
    ],
  },
  {
    id: "selection",
    title: "선택",
    items: [
      { id: "radio-group", labelKo: "라디오 버튼", labelEn: "Radio button", implemented: true },
      { id: "checkbox", labelKo: "체크박스", labelEn: "Checkbox", implemented: true },
      { id: "select", labelKo: "셀렉트", labelEn: "Select", implemented: true },
      { id: "tag", labelKo: "태그", labelEn: "Tag", implemented: true },
      { id: "toggle-switch", labelKo: "토글 스위치", labelEn: "Toggle switch", implemented: true },
    ],
  },
  {
    id: "feedback",
    title: "피드백",
    items: [
      { id: "step-indicator", labelKo: "단계 표시기", labelEn: "Step indicator", implemented: true },
      { id: "spinner", labelKo: "스피너", labelEn: "Spinner", implemented: true },
    ],
  },
  {
    id: "help",
    title: "도움",
    items: [
      { id: "help-panel", labelKo: "도움 패널", labelEn: "Help panel", implemented: true },
      { id: "tutorial-panel", labelKo: "따라하기 패널", labelEn: "Tutorial panel", implemented: true },
      { id: "contextual-help", labelKo: "맥락적 도움말", labelEn: "Contextual help", implemented: true },
      { id: "coach-mark", labelKo: "코치마크", labelEn: "Coach mark", implemented: true },
      { id: "tooltip", labelKo: "툴팁", labelEn: "Tooltip", implemented: true },
    ],
  },
  {
    id: "input",
    title: "입력",
    items: [
      { id: "date-input", labelKo: "날짜 입력 필드", labelEn: "Date input", implemented: true },
      { id: "textarea", labelKo: "텍스트 영역", labelEn: "Textarea", implemented: true },
      { id: "text-input", labelKo: "텍스트 입력 필드", labelEn: "Text input", implemented: true },
      { id: "file-upload", labelKo: "파일 업로드", labelEn: "File upload", implemented: true },
    ],
  },
  {
    id: "settings",
    title: "설정",
    items: [
      { id: "language-switcher", labelKo: "언어 변경", labelEn: "Language switcher", implemented: true },
      { id: "resize", labelKo: "화면 크기 조정", labelEn: "Resize", implemented: true },
    ],
  },
] as const

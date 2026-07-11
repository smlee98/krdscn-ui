# Components — KRDS vs shadcn vs Wrappers

> KRDS Storybook을 source of truth로, 우리 래퍼와 shadcn base가 어떻게 매핑되어 있는지 정리한 문서.

- 마지막 갱신: 2026-05-13
- KRDS Storybook: https://www.krds.go.kr/storybook/react/
- 시각 비교 결과: `.omc/krds-verify/storybook-parity-report.md`

## 매핑 현황 요약

- 전체 KRDS 컴포넌트: 40
- 래핑 완료: 23 (57.5%)
- 미래핑(gap): 17 (42.5%)
- shadcn base 인벤토리: 17

## 컴포넌트 매핑 표

KRDS 기준으로 알파벳 정렬. 미래핑은 — 로 표기.

| KRDS 컴포넌트 | 래핑 | Phase | shadcn base | 래퍼 파일 | 구성 요약 |
| --- | :-: | :-: | --- | --- | --- |
| Accordion | ✅ | 3 | `accordion.tsx` | `ui/krds/accordion.tsx` | Accordion + 4 sub-parts, KRDS 토큰 |
| Badge | ✅ | 1 | `badge.tsx` | `ui/krds/badge.tsx` | Badge + variant/size, 색상 제어 |
| Breadcrumb | ✅ | 4 | `breadcrumb.tsx` | `ui/krds/breadcrumb.tsx` | Breadcrumb + Home icon, 스타일 |
| Button | ✅ | 1 | `button.tsx` | `ui/krds/button.tsx` | shadcn Button + 6 variant × 5 size |
| Calendar | ✅ | 5 | `calendar.tsx` | `ui/krds/calendar.tsx` | Calendar + 5 sub-parts, 년/월 선택 |
| Checkbox | ✅ | 2 | `checkbox.tsx` | `ui/krds/checkbox.tsx` | Checkbox + Group/Chip, 3개 sub |
| CoachMark | — | — | — | — | https://www.krds.go.kr/storybook/react/?path=/story/components-coachmark--default |
| ContextualHelp | — | — | — | — | https://www.krds.go.kr/storybook/react/?path=/story/components-contextualhelp--default |
| CriticalAlert | — | — | — | — | https://www.krds.go.kr/storybook/react/?path=/story/components-criticalalert--default |
| DateInput | ✅ | 2 | `popover.tsx` | `ui/krds/date-input.tsx` | Popover + Calendar picker, 날짜 |
| Disclosure | ✅ | 3 | `collapsible.tsx` | `ui/krds/disclosure.tsx` | Collapsible, 단일 아코디언 패턴 |
| FileUpload | ✅ | 2 | — | `ui/krds/file-upload.tsx` | 파일 input + list, drag-drop 지원 |
| Footer | — | — | — | — | https://www.krds.go.kr/storybook/react/?path=/story/components-footer--default |
| Header | — | — | — | — | https://www.krds.go.kr/storybook/react/?path=/story/components-header--default |
| HelpPanel | — | — | — | — | https://www.krds.go.kr/storybook/react/?path=/story/components-helppanel--default |
| Identifier | — | — | — | — | https://www.krds.go.kr/storybook/react/?path=/story/components-identifier--default |
| InPageNavigation | — | — | — | — | https://www.krds.go.kr/storybook/react/?path=/story/components-inpagenavigation--default |
| LanguageSwitcher | — | — | — | — | https://www.krds.go.kr/storybook/react/?path=/story/components-languageswitcher--default |
| Link | ✅ | 4 | `next/link` | `ui/krds/link.tsx` | Next.js Link + 3 variant, 색상 |
| MainMenu | — | — | — | — | https://www.krds.go.kr/storybook/react/?path=/story/components-mainmenu--default |
| Masthead | — | — | — | — | https://www.krds.go.kr/storybook/react/?path=/story/components-masthead--default |
| Modal | ✅ | 3 | `dialog.tsx` | `ui/krds/modal.tsx` | Dialog + 8 sub-parts, size 제어 |
| Pagination | ✅ | 4 | — | `ui/krds/pagination.tsx` | 상태 관리형 페이지네이션 |
| Radio | ✅ | 2 | `radio-group.tsx` | `ui/krds/radio-group.tsx` | RadioGroup + Chip, 3개 sub |
| Resize | — | — | — | — | https://www.krds.go.kr/storybook/react/?path=/story/components-resize--default |
| Select | ✅ | 2 | `select.tsx` | `ui/krds/select.tsx` | Select + 10 sub-parts, 커스텀 |
| SideNavigation | — | — | — | — | https://www.krds.go.kr/storybook/react/?path=/story/components-sidenavigation--default |
| SkipLink | — | — | — | — | https://www.krds.go.kr/storybook/react/?path=/story/components-skiplink--default |
| Spinner | ✅ | 4 | — | `ui/krds/spinner.tsx` | 로딩 스피너, size/color 제어 |
| StepIndicator | ✅ | 4 | — | `ui/krds/step-indicator.tsx` | 순차 단계 표시, state 추적 |
| StructuredList | — | — | — | — | https://www.krds.go.kr/storybook/react/?path=/story/components-structuredlist--default |
| Tab | ✅ | 3 | `tabs.tsx` | `ui/krds/tab.tsx` | Tabs + 5 sub-parts, context 기반 |
| Table | — | — | — | — | https://www.krds.go.kr/storybook/react/?path=/story/components-table--default |
| Tag | ✅ | 1 | — | `ui/krds/tag.tsx` | 독립 tag, deletable/link variant |
| TextInput | ✅ | 1 | `input.tsx` | `ui/krds/text-input.tsx` | Input + KRDS 토큰, 상태 |
| TextList | ✅ | 4 | — | `ui/krds/text-list.tsx` | List + 4 유형, 2개 sub-part |
| Textarea | ✅ | 1 | `textarea.tsx` | `ui/krds/textarea.tsx` | Textarea + KRDS 스타일 |
| ToggleSwitch | ✅ | 2 | `switch.tsx` | `ui/krds/toggle-switch.tsx` | Switch + size prop, 토큰 |
| Tooltip | ✅ | 4 | `tooltip.tsx` | `ui/krds/tooltip.tsx` | Tooltip, variant (default/info) |
| TutorialPanel | — | — | — | — | https://www.krds.go.kr/storybook/react/?path=/story/components-tutorialpanel--default |

**표 정보:**

- **래핑**: ✅ = 래퍼 완료, — = 미래핑
- **Phase**: Phase 1–5 (README 참고), — = 미래핑
- **shadcn base**: 사용된 shadcn 베이스 파일 또는 Radix 직접 사용(—)
- **래퍼 파일**: `components/ui/krds/` 상대 경로
- **구성 요약**: 한 줄 요약 (40자 내외)

---

## 미래핑(gap) — 17개 컴포넌트

KRDS Storybook에 존재하지만 아직 래핑되지 않은 컴포넌트:

| 순번 | 컴포넌트         | Storybook 링크                                                                           |
| ---- | ---------------- | ---------------------------------------------------------------------------------------- |
| 1    | CoachMark        | https://www.krds.go.kr/storybook/react/?path=/story/components-coachmark--default        |
| 2    | ContextualHelp   | https://www.krds.go.kr/storybook/react/?path=/story/components-contextualhelp--default   |
| 3    | CriticalAlert    | https://www.krds.go.kr/storybook/react/?path=/story/components-criticalalert--default    |
| 4    | Footer           | https://www.krds.go.kr/storybook/react/?path=/story/components-footer--default           |
| 5    | Header           | https://www.krds.go.kr/storybook/react/?path=/story/components-header--default           |
| 6    | HelpPanel        | https://www.krds.go.kr/storybook/react/?path=/story/components-helppanel--default        |
| 7    | Identifier       | https://www.krds.go.kr/storybook/react/?path=/story/components-identifier--default       |
| 8    | InPageNavigation | https://www.krds.go.kr/storybook/react/?path=/story/components-inpagenavigation--default |
| 9    | LanguageSwitcher | https://www.krds.go.kr/storybook/react/?path=/story/components-languageswitcher--default |
| 10   | MainMenu         | https://www.krds.go.kr/storybook/react/?path=/story/components-mainmenu--default         |
| 11   | Masthead         | https://www.krds.go.kr/storybook/react/?path=/story/components-masthead--default         |
| 12   | Resize           | https://www.krds.go.kr/storybook/react/?path=/story/components-resize--default           |
| 13   | SideNavigation   | https://www.krds.go.kr/storybook/react/?path=/story/components-sidenavigation--default   |
| 14   | SkipLink         | https://www.krds.go.kr/storybook/react/?path=/story/components-skiplink--default         |
| 15   | StructuredList   | https://www.krds.go.kr/storybook/react/?path=/story/components-structuredlist--default   |
| 16   | Table            | https://www.krds.go.kr/storybook/react/?path=/story/components-table--default            |
| 17   | TutorialPanel    | https://www.krds.go.kr/storybook/react/?path=/story/components-tutorialpanel--default    |

---

## shadcn Base 인벤토리

| 파일 | 내보낸 컴포넌트 | Radix 프리미티브 | 비고 |
| --- | --- | --- | --- |
| **accordion.tsx** | Accordion, AccordionItem, AccordionTrigger, AccordionContent | `@radix-ui/react-accordion` | 루트 + Item + Trigger + Content |
| **alert-dialog.tsx** | AlertDialog + 10 sub-parts | `@radix-ui/react-alert-dialog` | 복합 Dialog + Button variant |
| **badge.tsx** | Badge, badgeVariants | `@radix-ui/react-slot` | CVA + asChild |
| **breadcrumb.tsx** | Breadcrumb + 5 sub-parts | `@radix-ui/react-slot` | 시맨틱 nav+ol+li |
| **button.tsx** | Button, buttonVariants | `@radix-ui/react-slot` | 6 variant × 6 size |
| **calendar.tsx** | Calendar | `react-day-picker` | DayPicker + date-fns ko |
| **checkbox.tsx** | Checkbox | `@radix-ui/react-checkbox` | Indicator + Icon |
| **collapsible.tsx** | Collapsible + 2 sub-parts | `@radix-ui/react-collapsible` | 최소 래퍼 |
| **dialog.tsx** | Dialog + 8 sub-parts | `@radix-ui/react-dialog` | 복합 Dialog |
| **input.tsx** | Input | — | HTML input |
| **popover.tsx** | Popover + 3 sub-parts | `@radix-ui/react-popover` | 루트 + Trigger + Content |
| **radio-group.tsx** | RadioGroup, RadioGroupItem | `@radix-ui/react-radio-group` | 루트 + Item + Indicator |
| **select.tsx** | Select + 10 sub-parts | `@radix-ui/react-select` | Trigger + Popper + Viewport |
| **switch.tsx** | Switch | `@radix-ui/react-switch` | 루트 + Thumb |
| **tabs.tsx** | Tabs + 3 sub-parts | `@radix-ui/react-tabs` | 루트 + List + Trigger + Content |
| **textarea.tsx** | Textarea | — | HTML textarea |
| **tooltip.tsx** | Tooltip + 3 sub-parts | `@radix-ui/react-tooltip` | Provider + Trigger + Content + Arrow |

**shadcn Base Total: 17개**

---

## 참고

- **시각 검증**: `yarn visual-diff:storybook` → `.omc/krds-verify/storybook-parity/` PNG + 보고서 생성
- **컴포넌트 추가**: `yarn ui:add <name>` (shadcn base) → `components/ui/krds/<name>.tsx`에 KRDS 래퍼 작성
- **Phase 조직**: Phase 1–5는 KRDS Storybook 릴리스 주기를 반영 (README 참고)
- **sub-parts 표기**: "8 sub-parts"는 Modal의 경우 ModalRoot + ModalTrigger + ... + ModalClose를 의미

---

## 통계

| 항목 | 값 |
| --- | --- |
| KRDS Storybook 컴포넌트 | 40 |
| 래핑 완료 | 23 (57.5%) |
| 미래핑(Gap) | 17 (42.5%) |
| shadcn Base 컴포넌트 | 17 |
| KRDS 래퍼 파일 | 24 (AlertModal 포함) |
| 래퍼별 sub-parts | ~37 (Modal 8, Select 10, Dialog 10, Tab 5, Accordion 4, Calendar 5, Radio 3, Checkbox 3, Breadcrumb 6 등) |

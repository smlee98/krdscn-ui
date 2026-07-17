# KRDS 컴포넌트 계약 (Component Contract)

`registry/krds/ui/*.tsx` — krdscn/ui가 배포하는 KRDS 컴포넌트의 저작 규칙. 이 문서가 유일한 계약이다. 규칙과 코드가 어긋나면 **코드 또는 이 문서를 같은 PR에서 정합**시킨다 — 어긋난 채로 머지 금지.

## 0. 원칙

shadcn/ui의 설계를 그대로 따른다:

1. **단일 소유** — 한 컴포넌트의 로직·스타일은 한 파일에만 존재한다. 다른 파일에 복제·재구성 금지.
2. **얇은 래퍼** — 프리미티브(radix-ui) 위에 cva + className 병합만. 프리미티브가 제공하는 동작(포커스 관리, 외부클릭, ESC, 포털)을 직접 구현하지 않는다.
3. **균일한 해부학** — 모든 파일이 아래 §2 형태를 따라, 어느 파일을 열어도 같은 모양이어야 한다.

수용 기준은 **KRDS 픽셀 충실도**: 원본 실렌더와의 대조(렌더 대조 하네스, `scripts/krds/`)를 통과해야 한다. 파일 첫 docstring에 근거 Figma 노드/원본 셀렉터를 기록한다.

## 1. 파일·배치

- 위치: `registry/krds/ui/<name>.tsx` (flat, kebab-case). 그룹 폴더 금지.
- 한 파일 = 한 컴포넌트 패밀리(compound 포함). 내부 전용 헬퍼는 파일 안에 둔다. 2개 이상 파일이 공유하는 헬퍼만 `lib/`로 승격.
- **RSC 마커**가 첫 비공백 줄: `// rsc:safe`(“use client” 없음) 또는 `// rsc:client`(다음 줄이 `"use client"`).
- import는 `@/` 절대 경로만. KRDS→KRDS는 `@/registry/krds/ui/<name>` 직접 import. `@/lib/utils`의 `cn` 사용.

## 2. 해부학 (모든 컴포넌트 공통)

```tsx
// rsc:client
"use client"

import { Dialog as DialogPrimitive } from "radix-ui"          // ① 통합 radix-ui 패키지만
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const modalVariants = cva("...", { variants: { ... } })       // ② 변형은 cva로만

function ModalContent({ className, size, ...props }: ModalContentProps) {
  return (
    <DialogPrimitive.Content
      data-slot="krds-modal-content"                          // ③ 모든 파트에 data-slot
      className={cn(modalVariants({ size }), className)}      // ④ 모든 파트에 className 병합
      {...props}                                              // ⑤ rest 전파 — 프롭 삼키지 않기
    />
  )
}

export { ModalRoot, ModalTrigger, ModalContent, ... }         // ⑥ named export, flat compound
export type { ModalContentProps, ... }                        // ⑦ 프롭 타입도 export
```

- **Props 형태**: `type XProps = React.ComponentProps<"tag" | typeof Primitive.X> & VariantProps<typeof xVariants> & { /* 최소한의 KRDS 축 */ }`.
  - `interface`형 폐쇄 API 금지. options 배열로 렌더를 대신하는 API 금지 — 서브파트 children 합성으로 표현한다 (shadcn Select처럼 `<Select><SelectItem/></Select>`).
  - 제어/비제어: `value`/`defaultValue` + `onValueChange` 쌍. `isControlled = value !== undefined` 패턴 통일.
- **data-slot**: 루트는 `krds-<name>`, 파트는 `krds-<name>-<part>`.
- **compound**: 모든 서브파트를 같은 파일에서 flat named export. dot-notation(`Modal.Content`) 금지.
- **context**: compound당 최대 1개(예외는 파일 docstring에 근거 명시), 진짜 파트 간 상태만. 스타일 전달용 context 금지.
- **자식 분류 금지**: `child.type === X` 신원 비교로 children을 분해하지 않는다. 슬롯이 필요하면 명시적 prop 또는 context로 받는다.

## 3. 프리미티브·합성

- Radix는 **통합 `radix-ui` 패키지에서만** import (`@radix-ui/react-*` 스코프 패키지 금지). Slot도 `radix-ui`의 `Slot.Root`.
- 프리미티브 재발명 금지: 드롭다운/팝업 → `Popover`/`DropdownMenu`, 오버레이 → `Dialog`, 접기 → `Collapsible`. useEffect로 외부클릭·ESC를 손으로 다루는 코드는 리뷰에서 반려.
- shadcn 베이스(`components/ui/*`) 직접 합성은 **legacy 3파일**(calendar, carousel, table)만 잠정 허용 — Phase 3에서 흡수(직접 radix/라이브러리 합성)로 졸업시킨다. 신규 파일에서 신규 도입 금지.
- **asChild**: 원본 KRDS 표면이 요구하는 트리거/링크형 컴포넌트(Button, Link, Tag, Badge, ModalTrigger/Close 등)에 한해 `asChild?: boolean` + Slot 허용. 다형성 `as?: T` 제네릭은 금지.
- 내비게이션 앵커: raw `<a>` 복붙 금지 — `@/registry/krds/ui/link`를 합성하거나, href 유무 다형성이 필요하면 파일 내 단일 헬퍼로 통일하고 `as` 캐스트 없이 타입을 분기한다.

## 4. 색·스타일 토큰

- 색은 `bg-krds-*` / `text-krds-*` / `border-krds-*` / `ring-krds-*` 유틸리티로만. 컴포넌트 본문에서 `var(--krds-*)` 직접 참조 금지, inline `style`로 색 지정 금지.
- 텍스트/표면/보더 역할엔 **세만틱 토큰**(`text-krds-foreground*`, `bg-krds-surface*`, `border-krds-border*`) — 라이트/다크(고대비) 자동 전환. 세만틱 토큰이 없을 때만 numeric + `dark:` 병기하고 사유를 주석으로.
- hex 하드코딩 금지. 예외: 정부 상징 SVG(태극기 등 브랜드 고정색)만, 주석으로 명시.
- `!important`가 파일에 3개 이상 필요하면 그 파트는 베이스를 감싸지 말고 native + cva로 다시 쓴다.
- 포커스는 `focus-visible:krds-focus-ring` / inset 변형 사용.

## 5. 문자열·접근성

- 사용자 노출 문자열(라벨, aria-label 포함)은 하드코딩하지 않는다 — **prop + 한국어 기본값**으로 노출한다 (`closeLabel = "닫기"`).
- WAI-ARIA 배선(role, aria-expanded/controls/current)은 KRDS 원본 마크업 기준으로 유지하고, 프리미티브가 제공하는 것을 중복 부여하지 않는다.

## 6. 타입

- `any`, `as unknown as`, `as object` 금지. 파트 간 프롭 변환은 타입이 실제로 호환되게 설계한다 — 캐스트로 봉합하지 않는다.
- 렌더하는 엘리먼트와 프롭 타입이 일치해야 한다 (`<button>`에 `InputHTMLAttributes` 스프레드 금지).
- 모든 public 프롭 타입은 `export type`으로 노출.

## 7. 검증 (머지 게이트)

1. `yarn typecheck` + `yarn lint` 통과.
2. rsc 마커 감사: `grep -crE "^// rsc:(safe|client)$" registry/krds/ui/*.tsx` = 파일 수.
3. rsc:safe 파일에 클라이언트 훅 없음: `grep -lE "useState|useEffect|useRef|useLayoutEffect|useReducer|useContext" $(grep -l "^// rsc:safe" registry/krds/ui/*.tsx)` → 빈 출력.
4. 금지 패턴 grep → 빈 출력:
   - `grep -rn "@radix-ui/react-" registry/krds/ui/`
   - `grep -rn "as unknown as\|as object" registry/krds/ui/`
   - `grep -rnE "#[0-9a-fA-F]{3,8}" registry/krds/ui/` (브랜드 SVG 예외는 `// brand-hex` 주석 라인만 허용)
5. 시각 변경이 있는 파일: 렌더 대조 하네스 재캡처로 픽셀 회귀 확인.
6. `yarn registry:build` 통과 (레지스트리 스키마·의존성 그래프 검증).

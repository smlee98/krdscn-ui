# krds-shadcn

KRDS(Korea Government Design System) 컴포넌트를 shadcn/ui + Radix Primitives + Tailwind CSS v4 위에 구현한 래퍼 라이브러리.

컴포넌트별 문서 카탈로그 — 각 KRDS 컴포넌트는 사이드바 네비게이션, 코드 예제, Props 테이블, 한국어 설명을 포함한 전용 라우트(`/components/<group>/<id>`)를 가집니다. KRDS를 중심으로 설계되었으며, shadcn/ui + Radix + Tailwind v4는 기반 기술입니다.

## Stack

- **Next.js 16** (App Router) — 컴포넌트 카탈로그 + 동적 라우팅
- **React 19** + **TypeScript 5.9**
- **Tailwind CSS 4.0** — KRDS 토큰 (`--krds-*`) 정의
- **Radix UI Primitives** — 모든 인터랙티브 컴포넌트의 기반
- **shadcn/ui (new-york style)** — `components/ui/*.tsx` (base)
- **KRDS 래퍼** — `components/ui/krds/*.tsx` (KRDS 토큰/스타일 적용)

## Quickstart

```bash
yarn install
yarn dev
# https://localhost:8080 ← KRDS 랜딩 페이지 + 컴포넌트 카탈로그
```

자체 서명 HTTPS 인증서가 자동 생성됩니다. 브라우저 경고를 무시하고 진행하세요.

## Scripts

| Script | Description |
|--------|-------------|
| `yarn dev` | HTTPS 개발 서버 (포트 8080) |
| `yarn build` | 프로덕션 빌드 |
| `yarn start` | 프로덕션 서버 |
| `yarn lint` | ESLint |
| `yarn typecheck` | TypeScript 타입 검사 |
| `yarn format` | Prettier 포맷 |
| `yarn visual-diff:storybook` | 공식 KRDS Storybook과 시각 비교 (Playwright) |
| `yarn visual-diff:per-component` | 컴포넌트별 light/dark 시각 비교 |
| `yarn ui:add <name>` | shadcn 컴포넌트 추가 |

## Directory layout

```
app/
  (catalog)/
    components/[group]/[id]/
      page.tsx            # 동적 컴포넌트 문서 페이지 (정적 사전 렌더링 42 라우트)
      example-host.tsx    # 클라이언트 경계 래퍼 (RSC)
    layout.tsx            # 카탈로그 레이아웃 (사이드바 + KrdsPageHeader)
  globals.css             # Tailwind v4 + KRDS 토큰
  layout.tsx              # 루트 레이아웃
  page.tsx                # 루트 페이지 (KRDS 랜딩 + 테마 토글 데모)
components/
  ui/                     # shadcn base 컴포넌트 (Radix primitives)
  ui/krds/                # KRDS 래퍼 × 42 (KRDS 토큰/스타일)
  examples/
    <slug>/
      <Name>.tsx          # 예제 구성 × 139 (클라이언트 컴포넌트)
    examples-config.ts    # 타입화된 예제 레지스트리
  krds-app/
    example-preview.tsx   # 예제 미리보기 (ExamplePreview)
    code-block.tsx        # 코드 블록 + 펼침 토글 (CodeBlock)
    props-table.tsx       # Props 테이블 렌더러 (PropsTable)
    page-header.tsx       # 페이지 헤더 (KrdsPageHeader)
    demo-card.tsx         # 데모 카드 (DemoCard)
lib/
  sidebar-nav.ts          # SIDEBAR_GROUPS (10 그룹, 42 아이템 원본)
  component-copy.ts       # 한국어 설명 레지스트리 (42 엔트리)
  get-example-source.ts   # 예제 소스 코드 접근자 (server-only)
  get-props-data.ts       # Props 데이터 접근자 (server-only)
  example-registry.ts     # 정적 import 클라이언트 레지스트리 × 139 (RSC)
  cn.ts                   # clsx + tailwind-merge 헬퍼
data/
  props-data.json         # Props 메타데이터 (생성됨)
scripts/
  generate-props-data.ts  # Props 데이터 생성 (yarn props:generate)
  scaffold-examples.ts    # 예제 스캐폴드 생성
scripts/krds/
  visual-diff-vs-storybook.mjs    # KRDS Storybook 시각 비교
  visual-diff-per-component.mjs   # light/dark 시각 비교
```

## KRDS 컴포넌트 (Phase 1–5)

- **Phase 1** — Button, TextInput, Textarea, Badge, Tag
- **Phase 2** — ToggleSwitch, Select, DateInput, FileUpload, Checkbox, Radio
- **Phase 3** — Modal, AlertModal, Tab, Accordion, Disclosure
- **Phase 4** — Breadcrumb, Pagination, Tooltip, Spinner, StepIndicator, Link, TextList
- **Phase 5** — Calendar

모든 컴포넌트는 `components/ui/krds/index.ts` 배럴에서 named export 됩니다.

## Visual parity

KRDS 사양(공식 KRDS Storybook: `https://www.krds.go.kr/storybook/react/`)과 본 구현 사이의 시각적 동등성을 검증합니다. `yarn visual-diff:storybook` 실행 시 Playwright가 카탈로그의 컴포넌트들과 공식 Storybook을 나란히 캡처해 `.omc/krds-verify/storybook-parity/`에 PNG와 보고서를 생성합니다.

Modal·AlertModal·Tooltip·DateInput popover와 같은 오픈 상태도 자동 인터랙션 후 캡처됩니다.

## License

Internal — GridOne Cloud Frontend.

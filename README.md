# krds-shadcn

KRDS(Korea Government Design System) 컴포넌트를 shadcn/ui + Radix Primitives + Tailwind CSS v4 위에 구현한 래퍼 라이브러리.

루트 페이지(`/`)는 모든 컴포넌트가 KRDS Storybook과 시각적으로 동등한지 확인하기 위한 비교 그리드(comparison grid)를 렌더링합니다.

## Stack

- **Next.js 16** (App Router) — 단일 페이지 verification 그리드
- **React 19** + **TypeScript 5.9**
- **Tailwind CSS 4.0** — KRDS 토큰 (`--krds-*`) 정의
- **Radix UI Primitives** — 모든 인터랙티브 컴포넌트의 기반
- **shadcn/ui (new-york style)** — `components/ui/*.tsx` (base)
- **KRDS 래퍼** — `components/ui/krds/*.tsx` (KRDS 토큰/스타일 적용)

## Quickstart

```bash
yarn install
yarn dev
# https://localhost:8080 ← verification 그리드
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
  comparison-grid.tsx   # KRDS verification 그리드 (모든 래퍼를 한 페이지에 렌더)
  globals.css           # Tailwind v4 + KRDS 토큰
  layout.tsx
  page.tsx              # 루트 페이지 → ComparisonGrid 표시
components/
  ui/                   # shadcn base 컴포넌트 (Radix primitives)
  ui/krds/              # KRDS 래퍼 (KRDS 토큰/스타일)
lib/
  cn.ts                 # clsx + tailwind-merge 헬퍼
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

`yarn visual-diff:storybook` 실행 시 Playwright가 verification 그리드와 공식 KRDS Storybook(`https://www.krds.go.kr/storybook/react/`)을 나란히 캡처해 `.omc/krds-verify/storybook-parity/`에 PNG와 보고서를 생성합니다.

Modal·AlertModal·Tooltip·DateInput popover와 같은 오픈 상태도 자동 인터랙션 후 캡처됩니다.

## License

Internal — GridOne Cloud Frontend.

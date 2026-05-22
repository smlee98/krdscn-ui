# KRDS + shadcn Catalog — Agent Guidelines

This file documents architectural decisions and constraints for AI agents (Claude Code, etc.)
working in this codebase. Read before making changes to components, providers, or catalog pages.

---

## Inviolable Constraints

### shadcn 원본 불가침 (shadcn Originals — Read-Only)
`components/ui/*.tsx` (27 files at root level: button.tsx, badge.tsx, tooltip.tsx, etc.)
**must never be modified, renamed, extended, or moved** under any circumstances.
All integration work happens in `components/ui/krds/*` (KRDS implementations) or
`components/ui/dynamic/*` (runtime dispatcher layer).

### Master Branch Only
No feature/topic branches. All changes commit directly to `master` as atomic commits.
One component = one commit. Run `git branch --show-current` and confirm `master` before committing.

### Composition Last
Composition containers (`masthead`, `header`, `footer`, `main-menu`) are worked on
**only after** all internal leaf components are fully aligned (Phase 5).
See: `memory: header_footer_last`.

### Icon + Text Alignment
When combining a lucide icon with Korean text in a flex layout, always add `translate-y-px`
to the Korean text `<span>`. Example:
```tsx
<SomeIcon className="size-4" />
<span className="translate-y-px">한국어 텍스트</span>
```

---

## UI System Runtime Toggle (v1) — SSR Boundary

### Policy (CD-5)
`UISystemProvider` (`lib/ui-system.tsx`) is a **Client Component** that uses
`useSyncExternalStore` with `localStorage`. All dispatched components
(`components/ui/dynamic/<name>.tsx`) use `useUISystem()` which is also client-only.

**v1 constraint**: Dispatcher components MUST be rendered inside a `"use client"` boundary.
Do NOT import dispatcher components directly into Server Component pages or layouts
without first crossing a client boundary.

### Pattern for Server Component pages that need a dispatched component
```tsx
// my-server-page.tsx (RSC)
import { MyClientSection } from "./my-client-section"; // "use client" file
export default function Page() {
  return <MyClientSection />;
}

// my-client-section.tsx
"use client";
import { Button } from "@/components/ui/dynamic/button";
export function MyClientSection() { return <Button>Click</Button>; }
```

### SSR Snapshot
Server renders with the **default system** (`"krds"` per CD-3). After hydration,
`useSyncExternalStore` switches to `localStorage` value if present. There is no
flash mitigation in v1 — this is an accepted limitation.

### Tooltip Provider (CD-4 sub-note)
`TooltipProvider` is **not dispatched**. Mount `shadcn TooltipProvider` once in the
catalog client layout tree (`app/(catalog)/layout.tsx` or `app-shell.tsx`).
Both KRDS and shadcn `Tooltip` share `@radix-ui/react-tooltip` primitive, so one
Provider instance is sufficient for both systems.

### v2 Follow-up (F4)
Server-readable dispatcher (cookie or `?ui=shadcn|krds` searchParam parsed in server
layout → server-component prop drilling) is deferred to v2. Provider rework required.

---

## KRDS data-slot Invariant (CD-2)

All `data-slot` attributes in `components/ui/krds/**` must use the `krds-` prefix:
```
data-slot="krds-button"      ✅
data-slot="button"           ❌
```
Run `npx tsx scripts/probe-data-slot-prefix.ts` to verify (CI regression gate).

---

## Slot Import Source (CD-1)

KRDS components use `import { Root as Slot } from "@radix-ui/react-slot"` (v1.2.4,
same instance as shadcn originals). Do **not** revert to `import { Slot } from "radix-ui"`
(that barrel ships its own nested v1.2.3 instance, causing bundle duplication).

---

## Compound Dispatch Policy (CD-4)

Dispatcher files in `components/ui/dynamic/` route compound components at the **root only**.
Subparts (`Trigger`, `Content`, `Item`, etc.) are NOT individually dispatched — they are
bound to the library chosen by the root dispatcher. Creating subpart-level dispatchers
crosses Radix Context library boundaries and causes silent Context propagation failures.

Affected tasks: T-3.4 (select), T-3.6 (radio-group), T-4.1 (accordion), T-4.3 (tab),
T-4.11 (table), T-4.14 (tooltip).

---

## Probe Scripts (Research / CI Gates)

| Script | Purpose |
|---|---|
| `scripts/probe-slot-equality.ts` | Verify `Root === Slot` in `@radix-ui/react-slot` (post-CD-1) |
| `scripts/probe-data-slot-prefix.ts` | Verify all KRDS `data-slot` use `krds-` prefix (CD-2) |
| `scripts/probe-compound-dispatch.tsx` | CD-4 compound dispatch policy evidence |
| `scripts/probe-rsc-boundary.ts` | CD-5 SSR/RSC boundary evidence |

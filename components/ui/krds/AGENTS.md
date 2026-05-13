# KRDS Wrapper Authoring Rules

This directory (`components/ui/krds/`) contains KRDS design-system wrappers that coexist
with the existing shadcn/ui components at `components/ui/`. Call sites pick by import path.

## Mandatory invariants (enforce on every file)

1. **shadcn-first composition** — wrappers compose `@/components/ui/*` (shadcn) as their base,
   never `@radix-ui/*` directly. 16 of 24 wrappers map cleanly to a shadcn base component.
   Only components with no shadcn equivalent stay custom (see R3 classification below).

2. **No krds-react runtime** — the `krds-react` package has been removed from this project.
   No imports of `krds-react/*` are permitted anywhere. KRDS color tokens are inlined directly
   in `app/globals.css` as `--krds-color-*` custom properties.

3. **Color tokens via Tailwind utility classes** — color is applied via `bg-krds-*` /
   `text-krds-*` / `border-krds-*` / `ring-krds-*` utilities generated from `app/globals.css`
   `@theme inline --color-krds-*` mappings. Never use `var(--krds-*)` directly inside wrapper
   component bodies.

4. **No `dark:` Tailwind utility classes inside `components/ui/krds/`.** The project is
   light-only (`forcedTheme="light"` in `UIProvider`; see `app/globals.css`), so `dark:`
   variants are never active and must not be written.

5. **Named exports only** (`export { X }`). No `export default`.

6. **Absolute imports** starting with `@/`. No relative imports (no `from "../"` or `from "./"`).

7. **`"use client"` directive** only where the component genuinely needs client-side APIs
   (event handlers, refs, state, browser APIs). Pure-presentational wrappers (e.g., Badge,
   Breadcrumb) may be RSC-compatible — match the `"use client"` placement of the underlying
   shadcn component.

## R3 Component Classification

Three categories determine how a wrapper is implemented:

| Category | Technique           | Example files                         |
|----------|---------------------|---------------------------------------|
| 2D       | native  cva         | `button.tsx`                          |
| 1D       | shadcn JSX wrap     | `badge.tsx`, `modal.tsx`, `select.tsx`|
| Custom   | native HTML + utils | `link.tsx`, `tag.tsx`, `spinner.tsx`  |


### 2D variant×color — native + cva

`button.tsx` uses a native `<button>` element + `cva()` directly — no
`import { Button } from "@/components/ui/button"`. Rationale: the 2D variant×color matrix
(kind × color) requires full cva control, and wrapping shadcn Button would leak its
`asChild`/Slot surface. Any wrapper requiring more than 2 `!important` overrides should
graduate to this pattern (native + cva, still no `@radix-ui` import).

### 1D shadcn JSX wrap

Wrappers that compose a single shadcn primitive, adding KRDS variant/color via `className`
overrides and re-exporting the sub-parts under KRDS names. Examples: Badge, Breadcrumb,
Tooltip, Accordion, Tab (→ shadcn Tabs), Disclosure (→ shadcn Collapsible), Checkbox,
RadioGroup, ToggleSwitch (→ shadcn Switch), Modal (→ shadcn Dialog), AlertModal
(→ shadcn AlertDialog), Select, Calendar (→ shadcn Calendar with `DayButton` slot),
DateInput (→ shadcn Popover + new Calendar), TextInput (→ shadcn Input), Textarea.

### Custom keep

Components with no shadcn equivalent stay fully custom but must still use `bg-krds-*` /
`text-krds-*` / `border-krds-*` / `ring-krds-*` utilities for color. Examples: Link, Tag,
TextList, StepIndicator, Spinner, FileUpload, Pagination.

## Compound export pattern

Compound components export all sub-parts as named exports from the same file:
```tsx
export { ModalRoot, ModalTrigger, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalClose };
```

## Spinner naming-collision policy

The project's canonical loading spinner is `components/spinner.tsx` (Loader2-based).
The KRDS Spinner is at `components/ui/krds/spinner.tsx`. In mixed pages, always alias:
```tsx
import { Spinner as KrdsSpinner } from "@/components/ui/krds";
```
Never shadow the project spinner with an unaliased import.

## tailwind-merge collision policy

`lib/cn.ts` uses `extendTailwindMerge` to register any KRDS-specific collision-prone
families. After the migration to Tailwind utility colors, `bg-krds-*` / `text-krds-*` /
`border-krds-*` / `ring-krds-*` are first-class Tailwind classes resolved by the standard
color-group rules — do not add arbitrary-value collision entries for these classes.
If a specific wrapper exposes an actual merge collision, add a single targeted group entry
in `lib/cn.ts` with an inline rationale comment.

## No `asChild` / Slot / polymorphic `as` generic

KRDS wrappers do NOT expose `asChild`, `Slot`, or `as?: T` generic polymorphism, with
ONE narrow exception: `ModalTrigger` and `ModalClose` preserve `asChild?: boolean` to
match the original KRDS surface exactly (required for accessibility pattern).

## Verification page

`app/krds-verify/` — dev-only route (returns 404 in production). Renders all 24 KRDS
components side-by-side for mechanical pixel diff.
Run `yarn dev` and open `https://localhost:8080/krds-verify` to smoke-test all wrappers.

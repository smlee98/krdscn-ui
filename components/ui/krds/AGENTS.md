# KRDS Wrapper Authoring Rules

This directory (`components/ui/krds/`) contains KRDS design-system wrappers that coexist
with the existing shadcn/ui components at `components/ui/`. Call sites pick by import path.

## Import path convention

Wrappers live under `components/ui/krds/(<group>)/<file>.tsx`, where `(<group>)` is the
literal directory name (the parentheses are part of the folder, not Next.js route-group
syntax — this folder is outside `app/` so it has no routing semantics).

The barrel `components/ui/krds/index.ts` has been **removed**. Consumers MUST import
directly from the owning wrapper file:

```tsx
// correct
import { Button } from "@/components/ui/krds/(action)/button";
import { ModalRoot, ModalContent } from "@/components/ui/krds/(layout)/modal";

// incorrect (barrel no longer exists)
import { Button, ModalRoot } from "@/components/ui/krds";
```

One import statement per owning wrapper file; symbols from the same file stay grouped.
Sort import statements alphabetically by path for stable diffs.

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

4. **Color via mode-aware semantic tokens; dark mode IS supported.** The project supports
   light and dark themes (next-themes `class` strategy via `app/providers.tsx`; dark = KRDS
   high-contrast mode). Express color through KRDS semantic utilities — `text-krds-foreground*`,
   `bg-krds-surface*`, `border-krds-border*`, `bg-krds-secondary-bold`, etc. — which auto-switch
   between light (`:root`) and `.dark` (high-contrast) values defined in `app/globals.css`.
   Never hardcode hex, and avoid raw numeric `krds-*` primitives for text/surface/border roles
   (primitives are mode-fixed and won't switch in dark). Saturated solid fills/badges that should
   stay branded in both modes (e.g. `bg-krds-primary-50`, status `-50` fills) may remain numeric.
   `dark:` Tailwind variants are permitted only where no semantic token fits — e.g. translucent
   hover overlays: `hover:bg-black/5 dark:hover:bg-white/10`.

5. **Named exports only** (`export { X }`). No `export default`.

6. **Absolute imports** starting with `@/`. No relative imports (no `from "../"` or `from "./"`).

7. **`"use client"` directive** only where the component genuinely needs client-side APIs
   (event handlers, refs, state, browser APIs). Pure-presentational wrappers (e.g., Badge,
   Breadcrumb) may be RSC-compatible — match the `"use client"` placement of the underlying
   shadcn component.

8. **KRDS-internal atom imports go through the runtime dispatcher** (`@/components/ui/dynamic/*`),
   not the direct KRDS wrapper path. When a KRDS compound (e.g. `TutorialPanel`, `HelpPanel`,
   `CoachMark`, `FileUpload`, `Header`) renders another KRDS-owned atom (Button, SkipLink, …),
   it MUST import that atom from `@/components/ui/dynamic/<name>` so the `<UISystemProvider>`
   toggle reaches the atom too. Direct KRDS-to-KRDS atom imports are reserved for the dispatcher
   layer itself.

   ```tsx
   // correct (KRDS compound → dispatcher → KRDS atom or shadcn atom)
   import { Button } from "@/components/ui/dynamic/button";

   // incorrect — bypasses the toggle, KRDS atom stays KRDS even in shadcn mode
   import { Button } from "@/components/ui/krds/(action)/button";
   ```

   Cycle safety: `components/ui/dynamic/<atom>` imports `krds/(…)/<atom>` and `ui/<atom>` (shadcn)
   only — atom wrappers themselves never import from `dynamic/`, so the graph remains acyclic.

## R3 Component Classification

Three categories determine how a wrapper is implemented:

| Category | Technique           | Example files                                              |
|----------|---------------------|------------------------------------------------------------|
| 2D       | native + cva        | `(action)/button.tsx`                                      |
| 1D       | shadcn JSX wrap     | `(layout)/badge.tsx`, `(layout)/modal.tsx`, `(selection)/select.tsx` |
| Custom   | native HTML + utils | `(action)/link.tsx`, `(selection)/tag.tsx`, `(feedback)/spinner.tsx` |


### 2D variant×color — native + cva

`(action)/button.tsx` uses a native `<button>` element + `cva()` directly — no
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

**Phase 6 1D wrappers (added by unwrapped-krds-implementation):**

| Component | shadcn base | File |
|---|---|---|
| ContextualHelp | `popover.tsx` | `(help)/contextual-help.tsx` |
| HelpPanel | `sheet.tsx` | `(help)/help-panel.tsx` |
| Table | `table.tsx` | `(layout)/table.tsx` |
| MainMenu | `navigation-menu.tsx` | `(navigation)/main-menu.tsx` |
| LanguageSwitcher | `popover.tsx` | `(settings)/language-switcher.tsx` |
| SideNavigation | `collapsible.tsx` | `(navigation)/side-navigation.tsx` |
| CoachMark | `popover.tsx` | `(help)/coach-mark.tsx` |
| TutorialPanel | `sheet.tsx` | `(help)/tutorial-panel.tsx` |

> **MainMenu R1 note:** shadcn `NavigationMenu` (Radix `NavigationMenuPrimitive`) was sufficient for the KRDS Default story shape (one level of submenu items). The R1 fallback (pure-custom `<nav aria-haspopup/aria-expanded>`) was **not** needed.

### Custom keep

Components with no shadcn equivalent stay fully custom but must still use `bg-krds-*` /
`text-krds-*` / `border-krds-*` / `ring-krds-*` utilities for color. Examples: Link, Tag,
TextList, StepIndicator, Spinner, FileUpload, Pagination.

**Phase 6 Custom wrappers (added by unwrapped-krds-implementation):**

| Component | DOM root | RSC | File |
|---|---|---|---|
| Resize | native button group | `rsc:client` | `(settings)/resize.tsx` |
| InPageNavigation | `<nav>` + IntersectionObserver | `rsc:client` | `(navigation)/in-page-navigation.tsx` |
| CriticalAlert | `<div role="alert">` | `rsc:client` | `(layout)/critical-alert.tsx` |
| Identifier | `<div role="contentinfo">` | `rsc:safe` | `(identity)/identifier.tsx` |
| Masthead | `<div role="banner">` | `rsc:safe` | `(identity)/masthead.tsx` |
| SkipLink | `<a>` sr-only/focus reveal | `rsc:safe` | `(navigation)/skip-link.tsx` |
| StructuredList | `<dl>` grid | `rsc:safe` | `(layout)/structured-list.tsx` |
| Footer | `<footer>` 3-column | `rsc:safe` | `(identity)/footer.tsx` |

### P5 composition-of-wrappers

Components that compose other KRDS wrappers (not shadcn primitives directly).

| Component | Composes | File |
|---|---|---|
| Header | SkipLink + Masthead + MainMenu + LanguageSwitcher + Resize | `(identity)/header.tsx` |

> **WAI constraint (F7):** `SkipLink` MUST be the first child of `<header>` per the WAI Skip Navigation pattern. `Header` enforces this layout — do not move SkipLink below Masthead.

## Compound export pattern

Compound components export all sub-parts as named exports from the same file:
```tsx
export { ModalRoot, ModalTrigger, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalClose };
```

## Spinner naming-collision policy

The project's canonical loading spinner is `components/spinner.tsx` (Loader2-based).
The KRDS Spinner is at `components/ui/krds/(feedback)/spinner.tsx`. In mixed pages, always alias:
```tsx
import { Spinner as KrdsSpinner } from "@/components/ui/krds/(feedback)/spinner";
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

## Phase 6 layout note

Each of the 17 Phase 6 wrappers renders under its own `Phase 6.N — <Name>` `<h2>` heading
in `app/comparison-grid.tsx`. This sub-section structure enables per-component
dark-invariance verdicts from the verification scripts.

**Shared regex contract — BIDIRECTIONAL, keep in lock-step:**

Both verification scripts parse the bare component name from `<h2>` text via:

```js
const m = text.match(/Phase\s+\d+(?:\.\d+)?\s*—\s*(.+)$/);
```

| Script | Location |
|---|---|
| `scripts/krds/visual-diff-per-component.mjs` | line 51 |
| `scripts/krds/visual-diff-vs-storybook.mjs` | line 122 |

**Rules for future heading authoring:**
- Every Phase 6 heading MUST match `/^Phase\s+\d+(?:\.\d+)?\s*—\s*\S.*$/` exactly.
- The em-dash `—` (U+2014) and single spaces around it are required — not a hyphen.
- If you add a new Phase 6.N section, update both script files' regex capture at the same time if the pattern changes.
- The `\d+(?:\.\d+)?` form covers both legacy `Phase 5 — Calendar` and new `Phase 6.1 — ContextualHelp` shapes.

## RSC marker rule

Every wrapper file in `components/ui/krds/` MUST have an RSC posture marker as its
**first non-blank line**, before any `"use client"` directive or imports:

```
// rsc:safe    ← file has NO "use client"; safe to import from RSC
// rsc:client  ← file has "use client" on the next line
```

**Audit command** (must return 20 — every wrapper with an explicit posture marker):
```sh
grep -crE "^// rsc:(safe|client)$" "components/ui/krds/"**/*.tsx | awk -F: '{s+=$NF} END {print s}'
```

**RSC-safe files** (must contain NO `"use client"` directive):
`(identity)/identifier.tsx`, `(identity)/masthead.tsx`, `(navigation)/skip-link.tsx`, `(layout)/structured-list.tsx`, `(identity)/footer.tsx`, `(layout)/table.tsx`

**RSC-safe verification:**
```sh
grep -L '"use client"' "components/ui/krds/(identity)/identifier.tsx" "components/ui/krds/(identity)/masthead.tsx" "components/ui/krds/(navigation)/skip-link.tsx" "components/ui/krds/(layout)/structured-list.tsx" "components/ui/krds/(identity)/footer.tsx" "components/ui/krds/(layout)/table.tsx"
# must return all 6 files
```

## Reviewer spot-check rule (G3)

For every PR touching `components/ui/krds/`, the reviewer MUST verify:

**For `// rsc:safe` files** — no client-only React hooks appear in the file body:
```sh
grep -E "useState|useEffect|useRef|useLayoutEffect|useReducer|useContext" \
  "components/ui/krds/(identity)/identifier.tsx" "components/ui/krds/(identity)/masthead.tsx" \
  "components/ui/krds/(navigation)/skip-link.tsx" "components/ui/krds/(layout)/structured-list.tsx" \
  "components/ui/krds/(identity)/footer.tsx" "components/ui/krds/(layout)/table.tsx"
# must return empty (zero matches)
```

This check is required because `app/comparison-grid.tsx` is already `"use client"` at
line 1, so importing a `rsc:safe` wrapper into the grid page does NOT prove the wrapper
itself is RSC-compatible. The marker + grep is the auditable gate.

## Verification page

`app/krds-verify/` — dev-only route (returns 404 in production). Renders all 24 KRDS
components side-by-side for mechanical pixel diff.
Run `yarn dev` and open `https://localhost:8080/krds-verify` to smoke-test all wrappers.

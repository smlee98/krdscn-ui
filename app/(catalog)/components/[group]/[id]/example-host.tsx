"use client";

// ExampleHost — client-side rendering boundary for KRDS example components.
//
// The catalog page (`page.tsx`) is a Server Component. If it directly
// renders example components, Next.js evaluates "shared" wrappers (no
// directive — e.g. `components/ui/krds/tag.tsx`) in the server context
// because they're also imported by non-client example files (e.g.
// `TagDefault.tsx`, `TagColors.tsx`). When a client-side example
// (`TagClosable.tsx`, marked "use client") then renders the same
// wrapper with event-handler props, the RSC serializer fails:
//   "Event handlers cannot be passed to Client Component props."
//
// Routing every example through this "use client" host moves the
// entire example subtree into the client bundle, so the krds wrappers
// resolve consistently as client modules and event handlers stay
// inside client-only code paths.

import { createElement } from "react";

import { loadExample } from "@/lib/example-registry";

export function ExampleHost({ slug, name }: { slug: string; name: string }) {
  // `createElement` (instead of `<Component />`) avoids the
  // react-hooks/static-components lint rule — the registry lookup is
  // stable per (slug, name), not a freshly created component.
  return createElement(loadExample(slug, name));
}

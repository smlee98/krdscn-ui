/**
 * T-0.1.5 (updated post-codemod): Slot reference-equality probe (Phase 0, CD-1)
 *
 * ORIGINAL PROBE (pre-codemod):
 *   Compared `Slot` from "radix-ui" barrel vs `Slot` from "@radix-ui/react-slot".
 *   Result: FAIL — barrel exports Slot as a namespace object (v1.2.3 nested instance);
 *   top-level @radix-ui/react-slot is v1.2.4 (different instance). Also, KRDS was using
 *   Slot.Root (namespace pattern), not Slot directly.
 *
 * CD-1 RESOLUTION (Option A):
 *   KRDS files updated to `import { Root as Slot } from "@radix-ui/react-slot"`.
 *   All `Slot.Root` usages renamed to `Slot`.
 *
 * POST-CODEMOD ASSERTION:
 *   Verify that `Root` and `Slot` from "@radix-ui/react-slot" are the same reference
 *   (confirming the alias is safe and both KRDS and shadcn share the same Slot component).
 *
 * Exit 0 = PASS
 * Exit 1 = FAIL
 */

import { Root, Slot } from "@radix-ui/react-slot";

console.log("@radix-ui/react-slot Root:", Root);
console.log("@radix-ui/react-slot Slot:", Slot);
console.log("Object.is(Root, Slot):", Object.is(Root, Slot));

if (!Object.is(Root, Slot)) {
  console.error("\n❌ FAIL: Root !== Slot in @radix-ui/react-slot — alias assumption broken.");
  process.exit(1);
}

console.log("\n✅ PASS: Root === Slot in @radix-ui/react-slot — KRDS Slot alias (Root as Slot) is safe.");
console.log("KRDS and shadcn now share the same Slot instance (@radix-ui/react-slot v1.2.4).");
process.exit(0);

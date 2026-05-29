"use client";

// shadcn has no Header primitive — re-export the KRDS implementation directly.
// Direct re-export (not function wrapping) preserves React element type identity,
// which the KRDS Header relies on to split its children into utility row vs nav
// row vs top row via `c.type === HeaderUtility` / `c.type === HeaderNav`.

export {
  Header,
  HeaderBrand,
  HeaderUtility,
  HeaderUtilityItem,
  HeaderUtilityDivider,
  HeaderActions,
  HeaderActionItem,
  HeaderNav,
  HeaderNavItem
} from "@/components/ui/krds/(identity)/header";

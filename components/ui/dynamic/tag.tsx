"use client";

import {
  Tag as KrdsTag,
  TagDelete,
  tagVariants,
  type TagProps as KrdsTagProps
} from "@/components/ui/krds/(selection)/tag";

// shadcn has no Tag equivalent (deletable/link semantics are KRDS-specific)
// — always render the KRDS Tag regardless of active UI system.
export type TagProps = KrdsTagProps;

export function Tag(props: TagProps) {
  return <KrdsTag {...props} />;
}

export { TagDelete, tagVariants };

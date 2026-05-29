"use client";
import { SkipLink as KrdsSkipLink } from "@/components/ui/krds/(navigation)/skip-link";

type SkipLinkProps = React.ComponentProps<typeof KrdsSkipLink>;

export function SkipLink(props: SkipLinkProps) {
  return <KrdsSkipLink {...props} />;
}

export type { SkipLinkProps };

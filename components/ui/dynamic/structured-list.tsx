"use client";

import type * as React from "react";
import {
  StructuredList as KrdsStructuredList,
  StructuredListActions as KrdsStructuredListActions,
  StructuredListBadge as KrdsStructuredListBadge,
  StructuredListBody as KrdsStructuredListBody,
  StructuredListDescription as KrdsStructuredListDescription,
  StructuredListHeader as KrdsStructuredListHeader,
  StructuredListImage as KrdsStructuredListImage,
  StructuredListMetadata as KrdsStructuredListMetadata,
  StructuredListMetadataItem as KrdsStructuredListMetadataItem,
  StructuredListPeriod as KrdsStructuredListPeriod,
  StructuredListSubAction as KrdsStructuredListSubAction,
  StructuredListSubActions as KrdsStructuredListSubActions,
  StructuredListTag as KrdsStructuredListTag,
  StructuredListTagList as KrdsStructuredListTagList,
  StructuredListTitle as KrdsStructuredListTitle
} from "@/components/ui/krds/(layout)/structured-list";

export type {
  StructuredListProps,
  StructuredListImageProps,
  StructuredListBodyProps,
  StructuredListHeaderProps,
  StructuredListBadgeProps,
  StructuredListTitleProps,
  StructuredListDescriptionProps,
  StructuredListPeriodProps,
  StructuredListMetadataProps,
  StructuredListMetadataItemProps,
  StructuredListActionsProps,
  StructuredListSubActionProps,
  StructuredListSubActionsProps,
  StructuredListTagListProps,
  StructuredListTagProps
} from "@/components/ui/krds/(layout)/structured-list";

// shadcn has no StructuredList primitive — render KRDS regardless of active UI system.
export function StructuredList(props: React.ComponentProps<typeof KrdsStructuredList>) {
  return <KrdsStructuredList {...props} />;
}

export function StructuredListImage(props: React.ComponentProps<typeof KrdsStructuredListImage>) {
  return <KrdsStructuredListImage {...props} />;
}

export function StructuredListBody(props: React.ComponentProps<typeof KrdsStructuredListBody>) {
  return <KrdsStructuredListBody {...props} />;
}

export function StructuredListHeader(props: React.ComponentProps<typeof KrdsStructuredListHeader>) {
  return <KrdsStructuredListHeader {...props} />;
}

export function StructuredListBadge(props: React.ComponentProps<typeof KrdsStructuredListBadge>) {
  return <KrdsStructuredListBadge {...props} />;
}

export function StructuredListTitle(props: React.ComponentProps<typeof KrdsStructuredListTitle>) {
  return <KrdsStructuredListTitle {...props} />;
}

export function StructuredListDescription(props: React.ComponentProps<typeof KrdsStructuredListDescription>) {
  return <KrdsStructuredListDescription {...props} />;
}

export function StructuredListPeriod(props: React.ComponentProps<typeof KrdsStructuredListPeriod>) {
  return <KrdsStructuredListPeriod {...props} />;
}

export function StructuredListMetadata(props: React.ComponentProps<typeof KrdsStructuredListMetadata>) {
  return <KrdsStructuredListMetadata {...props} />;
}

export function StructuredListMetadataItem(props: React.ComponentProps<typeof KrdsStructuredListMetadataItem>) {
  return <KrdsStructuredListMetadataItem {...props} />;
}

export function StructuredListActions(props: React.ComponentProps<typeof KrdsStructuredListActions>) {
  return <KrdsStructuredListActions {...props} />;
}

export function StructuredListSubAction(props: React.ComponentProps<typeof KrdsStructuredListSubAction>) {
  return <KrdsStructuredListSubAction {...props} />;
}

export function StructuredListSubActions(props: React.ComponentProps<typeof KrdsStructuredListSubActions>) {
  return <KrdsStructuredListSubActions {...props} />;
}

export function StructuredListTagList(props: React.ComponentProps<typeof KrdsStructuredListTagList>) {
  return <KrdsStructuredListTagList {...props} />;
}

export function StructuredListTag(props: React.ComponentProps<typeof KrdsStructuredListTag>) {
  return <KrdsStructuredListTag {...props} />;
}

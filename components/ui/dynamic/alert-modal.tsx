"use client";

import type * as React from "react";
import { AlertModal as KrdsAlertModal } from "@/components/ui/krds/(layout)/alert-modal";

export type { AlertModalProps } from "@/components/ui/krds/(layout)/alert-modal";

// KRDS AlertModal already composes shadcn AlertDialog with KRDS chrome
// (title/description/action/cancel layout). Render KRDS regardless of
// active UI system.
export function AlertModal(props: React.ComponentProps<typeof KrdsAlertModal>) {
  return <KrdsAlertModal {...props} />;
}

"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { AlertModal as KrdsAlertModal } from "@/components/ui/krds/(layout)/alert-modal";
import type { AlertModalProps } from "@/components/ui/krds/(layout)/alert-modal";
import { useUISystem } from "@/lib/ui-system";

export type { AlertModalProps } from "@/components/ui/krds/(layout)/alert-modal";

// Runtime dispatcher: the public surface is the KRDS AlertModal compound API,
// rendered either as the KRDS-chromed wrapper or assembled from the vanilla
// shadcn AlertDialog anatomy depending on <UISystemProvider>. The props API is
// system-agnostic (title/description/labels/handlers/trigger), so the shadcn
// branch maps every prop — there are no KRDS-only props to drop. The shadcn
// branch carries no KRDS classes and uses AlertDialogAction/AlertDialogCancel's
// default buttonVariants styling.

// ─── shadcn-mode: KRDS AlertModal props → shadcn AlertDialog anatomy ───────────

function ShadcnAlertModal({
  open,
  defaultOpen,
  onOpenChange,
  title,
  description,
  confirmLabel = "확인",
  cancelLabel = "취소",
  onConfirm,
  onCancel,
  trigger,
  className,
  children
}: AlertModalProps) {
  return (
    <AlertDialog open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}

      <AlertDialogContent className={className}>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {(description ?? children) && <AlertDialogDescription>{description ?? children}</AlertDialogDescription>}
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>{cancelLabel}</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>{confirmLabel}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// ─── Dispatched component ──────────────────────────────────────────────────────

export function AlertModal(props: AlertModalProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsAlertModal {...props} />;
  return <ShadcnAlertModal {...props} />;
}

/**
 * KRDS AlertModal — single compound component wrapping @/components/ui/alert-dialog (shadcn).
 * Portal and overlay are managed internally by AlertDialogContent.
 */

"use client";

import * as React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/dynamic/button";
import { cn } from "@/lib/cn";

// ─── Types ────────────────────────────────────────────────────────────────────

type AlertModalProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Modal title */
  title: React.ReactNode;
  /** Modal body / description */
  description?: React.ReactNode;
  /** Confirm button label (default: "확인") */
  confirmLabel?: string;
  /** Cancel button label (default: "취소") */
  cancelLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  /** Trigger element */
  trigger?: React.ReactNode;
  /** Additional class on the content panel */
  className?: string;
  children?: React.ReactNode;
};

// ─── AlertModal ───────────────────────────────────────────────────────────────

function AlertModal({
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

      <AlertDialogContent
        data-slot="krds-alert-modal"
        className={cn("bg-krds-surface border-krds-border-light min-h-48 rounded-xl p-6 sm:max-w-sm", className)}
      >
        {/* Header */}
        <AlertDialogTitle className="text-krds-foreground text-lg leading-none font-semibold">{title}</AlertDialogTitle>

        {/* Body */}
        {(description ?? children) && (
          <AlertDialogDescription className="text-krds-foreground pt-4 pb-4 text-sm">
            {description ?? children}
          </AlertDialogDescription>
        )}

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <AlertDialogCancel asChild>
            <Button variant="tertiary" size="default" className="min-w-24" onClick={onCancel}>
              {cancelLabel}
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant="default" size="default" className="min-w-24" onClick={onConfirm}>
              {confirmLabel}
            </Button>
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export { AlertModal };
export type { AlertModalProps };

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
import { cn } from "@/lib/cn";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AlertModalProps {
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
}

// ─── Button class helpers ─────────────────────────────────────────────────────

const btnBase =
  "inline-flex items-center justify-center min-w-24 h-11 px-4 rounded text-sm font-medium outline-none " +
  "focus-visible:ring-2 focus-visible:ring-krds-primary-50 focus-visible:ring-offset-2";

const cancelCls = cn(
  btnBase,
  "bg-krds-gray-0 border border-krds-gray-20 text-krds-gray-90",
  "hover:bg-krds-gray-5 active:bg-krds-gray-10"
);

const confirmCls = cn(
  btnBase,
  "bg-krds-primary-50 border border-krds-primary-50 text-white",
  "hover:bg-krds-primary-90 active:bg-krds-primary-90"
);

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
        className={cn("bg-krds-gray-0 border-krds-gray-10 min-h-48 rounded-xl p-6 sm:max-w-sm", className)}
      >
        {/* Header */}
        <AlertDialogTitle className="text-krds-gray-90 text-lg leading-none font-semibold">{title}</AlertDialogTitle>

        {/* Body */}
        {(description ?? children) && (
          <AlertDialogDescription className="text-krds-gray-90 pt-4 pb-4 text-sm">
            {description ?? children}
          </AlertDialogDescription>
        )}

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <AlertDialogCancel onClick={onCancel} className={cancelCls}>
            {cancelLabel}
          </AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className={confirmCls}>
            {confirmLabel}
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export { AlertModal };

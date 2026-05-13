/**
 * KRDS Modal — compound wrapper over @/components/ui/dialog (shadcn).
 * Sub-parts (locked): ModalRoot, ModalTrigger, ModalOverlay, ModalContent,
 *   ModalHeader, ModalBody, ModalFooter, ModalClose
 * NOTE: ModalOverlay is a no-op stub kept for API compatibility — the overlay
 *   is managed internally by DialogContent (which portals to document.body).
 */

"use client";

import * as React from "react";
import { XIcon } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { cn } from "@/lib/cn";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ModalSize = "sm" | "md" | "lg";
export type ModalVariant = "default" | "bottom-sheet";

export interface ModalRootProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  size?: ModalSize;
  variant?: ModalVariant;
  /** Pressing Escape closes the dialog (default: true). Implemented via Radix default. */
  closeOnEsc?: boolean;
  closeOnOverlayClick?: boolean;
  /** @deprecated Portal is now managed by the shadcn Dialog layer. Ignored. */
  usePortal?: boolean;
  /** @deprecated Portal container is now document.body. Ignored. */
  portalContainer?: string | HTMLElement;
  children?: React.ReactNode;
}

export type ModalTriggerProps = React.ComponentProps<"button"> & {
  asChild?: boolean;
};

export type ModalOverlayProps = React.ComponentProps<"div">;

export type ModalContentProps = React.ComponentProps<"div">;

export type ModalHeaderProps = React.ComponentProps<"div"> & {
  title?: React.ReactNode;
  titleId?: string;
};

export type ModalBodyProps = React.ComponentProps<"div"> & {
  descriptionId?: string;
};

export type ModalFooterProps = React.ComponentProps<"div">;

export type ModalCloseProps = React.ComponentProps<"button"> & {
  asChild?: boolean;
};

// ─── Context ──────────────────────────────────────────────────────────────────

interface ModalContextValue {
  size: ModalSize;
  variant: ModalVariant;
  closeOnOverlayClick: boolean;
}

const ModalContext = React.createContext<ModalContextValue>({
  size: "md",
  variant: "default",
  closeOnOverlayClick: true
});

// ─── ModalRoot ────────────────────────────────────────────────────────────────

function ModalRoot({
  open,
  defaultOpen,
  onOpenChange,
  size = "md",
  variant = "default",
  closeOnEsc: _closeOnEsc = true,
  closeOnOverlayClick = true,
  usePortal: _usePortal = true,
  portalContainer: _portalContainer,
  children
}: ModalRootProps) {
  return (
    <ModalContext.Provider value={{ size, variant, closeOnOverlayClick }}>
      <Dialog open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
        {children}
      </Dialog>
    </ModalContext.Provider>
  );
}

// ─── ModalTrigger ─────────────────────────────────────────────────────────────

function ModalTrigger({ asChild, children, className, ...rest }: ModalTriggerProps) {
  return (
    <DialogTrigger asChild={asChild} className={className} {...rest}>
      {children}
    </DialogTrigger>
  );
}

// ─── ModalOverlay ─────────────────────────────────────────────────────────────
// No-op stub: shadcn's DialogContent renders its own overlay via portal internally.

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ModalOverlay(_props: ModalOverlayProps) {
  return null;
}

// ─── ModalContent ─────────────────────────────────────────────────────────────

function ModalContent({ className, children, ...rest }: ModalContentProps) {
  const { size, variant, closeOnOverlayClick } = React.useContext(ModalContext);

  const sizeClass = {
    sm: "sm:max-w-sm",
    md: "sm:max-w-lg",
    lg: "sm:max-w-2xl"
  }[size];

  const isBottomSheet = variant === "bottom-sheet";

  return (
    <DialogContent
      showCloseButton={false}
      onInteractOutside={(e) => {
        if (!closeOnOverlayClick) e.preventDefault();
      }}
      className={cn(
        "bg-krds-gray-0 border-krds-gray-10 min-h-48 rounded-xl p-6",
        isBottomSheet
          ? "!top-auto !right-0 !bottom-0 !left-0 !max-w-none !translate-x-0 !translate-y-0 !rounded-none rounded-t-xl"
          : sizeClass,
        className
      )}
      {...(rest as object)}
    >
      {children}
    </DialogContent>
  );
}

// ─── ModalHeader ──────────────────────────────────────────────────────────────

function ModalHeader({ title, titleId, className, children, ...rest }: ModalHeaderProps) {
  const idProp = titleId ? { id: titleId } : {};
  return (
    <DialogTitle
      {...idProp}
      className={cn("text-krds-gray-90 text-lg leading-none font-semibold", className)}
      {...(rest as React.ComponentProps<typeof DialogTitle>)}
    >
      {title ?? children}
    </DialogTitle>
  );
}

// ─── ModalBody ────────────────────────────────────────────────────────────────

function ModalBody({ descriptionId, className, children, ...rest }: ModalBodyProps) {
  return (
    <div className={cn("text-krds-gray-90 gap-2 pt-4 pb-4", className)} {...rest}>
      {descriptionId ? (
        <DialogDescription id={descriptionId} className="contents">
          {children}
        </DialogDescription>
      ) : (
        children
      )}
    </div>
  );
}

// ─── ModalFooter ──────────────────────────────────────────────────────────────

function ModalFooter({ className, children, ...rest }: ModalFooterProps) {
  return (
    <div className={cn("flex items-center justify-end gap-3 pt-4", className)} {...rest}>
      {children}
    </div>
  );
}

// ─── ModalClose ───────────────────────────────────────────────────────────────

function ModalClose({ asChild, children, className, ...rest }: ModalCloseProps) {
  if (children) {
    return (
      <DialogClose asChild={asChild} className={className} {...rest}>
        {children}
      </DialogClose>
    );
  }
  return (
    <DialogClose asChild>
      <button
        type="button"
        className={cn(
          "absolute top-4 right-4 outline-none",
          "text-krds-gray-90",
          "focus-visible:ring-krds-primary-50 focus-visible:ring-2 focus-visible:ring-offset-2",
          className
        )}
        aria-label="닫기"
        {...rest}
      >
        <XIcon className="size-5" />
      </button>
    </DialogClose>
  );
}

export { ModalRoot, ModalTrigger, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalClose };

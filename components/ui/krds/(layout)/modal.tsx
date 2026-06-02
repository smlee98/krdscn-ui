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
export type ModalVariant = "default" | "bottom-sheet" | "fullscreen";

export type ModalRootProps = {
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
};

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

type ModalContextValue = {
  size: ModalSize;
  variant: ModalVariant;
  closeOnOverlayClick: boolean;
};

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
    <DialogTrigger data-slot="krds-modal-trigger" asChild={asChild} className={className} {...rest}>
      {children}
    </DialogTrigger>
  );
}

// ─── ModalOverlay ─────────────────────────────────────────────────────────────
// No-op stub: shadcn's DialogContent renders its own overlay via portal internally.

function ModalOverlay(_props: ModalOverlayProps) {
  return null;
}

// ─── ModalContent ─────────────────────────────────────────────────────────────

function ModalContent({ className, children, ...rest }: ModalContentProps) {
  const { size, variant, closeOnOverlayClick } = React.useContext(ModalContext);

  const sizeClass = {
    sm: "sm:max-w-[400px]",
    md: "sm:max-w-[560px]",
    lg: "sm:max-w-[760px]"
  }[size];

  const isBottomSheet = variant === "bottom-sheet";
  const isFullscreen = variant === "fullscreen";

  const variantClass = isBottomSheet
    ? "!top-auto !right-0 !bottom-0 !left-0 !max-w-none !translate-x-0 !translate-y-0 !rounded-none rounded-t-xl"
    : isFullscreen
      ? "!top-0 !right-0 !bottom-0 !left-0 !max-w-none !translate-x-0 !translate-y-0 !rounded-none"
      : sizeClass;

  return (
    <DialogContent
      data-slot="krds-modal-content"
      showCloseButton={false}
      onInteractOutside={(e) => {
        if (!closeOnOverlayClick) e.preventDefault();
      }}
      className={cn(
        "flex flex-col items-start gap-0",
        "bg-krds-surface border-krds-border rounded-[12px] p-6",
        variantClass,
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
      data-slot="krds-modal-header"
      {...idProp}
      className={cn("text-krds-foreground w-full px-4 pt-8 pb-4 text-2xl leading-[1.5] font-bold", className)}
      {...(rest as React.ComponentProps<typeof DialogTitle>)}
    >
      {title ?? children}
    </DialogTitle>
  );
}

// ─── ModalBody ────────────────────────────────────────────────────────────────

function ModalBody({ descriptionId, className, children, ...rest }: ModalBodyProps) {
  const { variant } = React.useContext(ModalContext);
  return (
    <div
      data-slot="krds-modal-body"
      className={cn(
        "text-krds-foreground flex w-full flex-col gap-4 px-4 pb-2 text-krds-body-md font-normal",
        variant === "fullscreen" && "flex-1",
        className
      )}
      {...rest}
    >
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
    <div
      data-slot="krds-modal-footer"
      className={cn("flex w-full items-center justify-end gap-2 p-4", className)}
      {...rest}
    >
      {children}
    </div>
  );
}

// ─── ModalClose ───────────────────────────────────────────────────────────────

function ModalClose({ asChild, children, className, ...rest }: ModalCloseProps) {
  if (children) {
    return (
      <DialogClose data-slot="krds-modal-close" asChild={asChild} className={className} {...rest}>
        {children}
      </DialogClose>
    );
  }
  return (
    <DialogClose asChild>
      <button
        type="button"
        data-slot="krds-modal-close"
        className={cn(
          "absolute top-6 right-6 outline-none",
          "text-krds-foreground",
          "focus:krds-focus-ring",
          className
        )}
        aria-label="닫기"
        {...rest}
      >
        <XIcon className="size-6" />
      </button>
    </DialogClose>
  );
}

export { ModalRoot, ModalTrigger, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalClose };

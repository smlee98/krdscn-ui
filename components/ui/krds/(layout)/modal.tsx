/**
 * KRDS Modal — radix Dialog 직접 합성.
 * Sub-parts (locked): ModalRoot, ModalTrigger, ModalOverlay, ModalContent,
 *   ModalHeader, ModalBody, ModalFooter, ModalClose
 * NOTE: ModalOverlay is a no-op stub kept for API compatibility — the overlay
 *   is managed internally by ModalContent (which portals to document.body).
 */

"use client";

import * as React from "react";
import { XIcon } from "lucide-react";
import { Dialog as DialogPrimitive } from "radix-ui";

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
  /** @deprecated Portal is now managed by the radix Dialog layer. Ignored. */
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
      <DialogPrimitive.Root data-slot="krds-modal" open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
        {children}
      </DialogPrimitive.Root>
    </ModalContext.Provider>
  );
}

// ─── ModalTrigger ─────────────────────────────────────────────────────────────

function ModalTrigger({ asChild, children, className, ...rest }: ModalTriggerProps) {
  return (
    <DialogPrimitive.Trigger
      data-slot="krds-modal-trigger"
      asChild={asChild}
      className={className}
      {...(rest as object)}
    >
      {children}
    </DialogPrimitive.Trigger>
  );
}

// ─── ModalOverlay ─────────────────────────────────────────────────────────────
// No-op stub: overlay is managed internally by ModalContent via portal.

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
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay
        data-slot="krds-modal-overlay"
        className="fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0"
      />
      <DialogPrimitive.Content
        data-slot="krds-modal-content"
        onInteractOutside={(e) => {
          if (!closeOnOverlayClick) e.preventDefault();
        }}
        className={cn(
          "fixed top-[50%] left-[50%] z-50 w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] duration-200 outline-none",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          "flex flex-col items-start gap-0",
          "bg-krds-surface border-krds-border rounded-[12px] p-6",
          // KRDS: 콘텐츠 최대 높이를 뷰포트로 제한 → 긴 본문은 ModalBody 내부에서 스크롤.
          // (bottom-sheet/fullscreen 은 variantClass 가 위치·높이를 직접 제어하므로 default 에만 적용.)
          !isBottomSheet && !isFullscreen && "max-h-[calc(100dvh-2rem)]",
          variantClass,
          className
        )}
        {...(rest as object)}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

// ─── ModalHeader ──────────────────────────────────────────────────────────────

function ModalHeader({ title, titleId, className, children, ...rest }: ModalHeaderProps) {
  const idProp = titleId ? { id: titleId } : {};
  return (
    <DialogPrimitive.Title
      data-slot="krds-modal-header"
      {...idProp}
      className={cn("text-krds-foreground w-full px-4 pt-8 pb-4 text-2xl leading-[1.5] font-bold", className)}
      {...(rest as React.ComponentProps<typeof DialogPrimitive.Title>)}
    >
      {title ?? children}
    </DialogPrimitive.Title>
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
        // KRDS: 긴 본문은 다이얼로그 밖으로 넘치지 않고 본문 영역 내부에서 스크롤.
        "min-h-0 flex-1 overflow-y-auto",
        className
      )}
      {...rest}
    >
      {descriptionId ? (
        <DialogPrimitive.Description id={descriptionId} className="contents">
          {children}
        </DialogPrimitive.Description>
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
      <DialogPrimitive.Close
        data-slot="krds-modal-close"
        asChild={asChild}
        className={className}
        {...(rest as object)}
      >
        {children}
      </DialogPrimitive.Close>
    );
  }
  return (
    <DialogPrimitive.Close asChild>
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
    </DialogPrimitive.Close>
  );
}

export { ModalRoot, ModalTrigger, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalClose };

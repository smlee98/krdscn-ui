"use client";

import * as React from "react";
import { XIcon } from "lucide-react";

import {
  ModalBody as KrdsModalBody,
  ModalClose as KrdsModalClose,
  ModalContent as KrdsModalContent,
  ModalFooter as KrdsModalFooter,
  ModalHeader as KrdsModalHeader,
  ModalOverlay as KrdsModalOverlay,
  ModalRoot as KrdsModalRoot,
  ModalTrigger as KrdsModalTrigger
} from "@/components/ui/krds/(layout)/modal";
import type {
  ModalBodyProps,
  ModalCloseProps,
  ModalContentProps,
  ModalFooterProps,
  ModalHeaderProps,
  ModalOverlayProps,
  ModalRootProps,
  ModalTriggerProps
} from "@/components/ui/krds/(layout)/modal";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { cn } from "@/lib/cn";
import { useUISystem } from "@/lib/ui-system";

export type {
  ModalSize,
  ModalVariant,
  ModalRootProps,
  ModalTriggerProps,
  ModalOverlayProps,
  ModalContentProps,
  ModalHeaderProps,
  ModalBodyProps,
  ModalFooterProps,
  ModalCloseProps
} from "@/components/ui/krds/(layout)/modal";

// Dual-render dispatcher (template: dynamic/accordion.tsx). The public surface is
// the KRDS Modal compound API; each part renders either the KRDS-chromed wrapper
// or the vanilla shadcn Dialog primitive based on <UISystemProvider>.
//
// In shadcn mode the KRDS-only props (size / variant / usePortal / portalContainer)
// are intentionally dropped — Radix Dialog has no such axes. closeOnOverlayClick /
// closeOnEsc are honored on the shadcn path via DialogContent interaction guards.

// ─── Dispatcher-internal context: thread Root-level options to shadcn parts ─────

type ShadcnModalContextValue = {
  closeOnOverlayClick: boolean;
  closeOnEsc: boolean;
};

const ShadcnModalContext = React.createContext<ShadcnModalContextValue>({
  closeOnOverlayClick: true,
  closeOnEsc: true
});

// ─── shadcn-mode parts ──────────────────────────────────────────────────────────

function ShadcnModalRoot({
  open,
  defaultOpen,
  onOpenChange,
  size: _size,
  variant: _variant,
  closeOnEsc = true,
  closeOnOverlayClick = true,
  usePortal: _usePortal,
  portalContainer: _portalContainer,
  children
}: ModalRootProps) {
  return (
    <ShadcnModalContext.Provider value={{ closeOnOverlayClick, closeOnEsc }}>
      <Dialog open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
        {children}
      </Dialog>
    </ShadcnModalContext.Provider>
  );
}

function ShadcnModalContent({ children, className, ...rest }: ModalContentProps) {
  const { closeOnOverlayClick, closeOnEsc } = React.useContext(ShadcnModalContext);
  return (
    <DialogContent
      showCloseButton={false}
      onInteractOutside={(e) => {
        if (!closeOnOverlayClick) e.preventDefault();
      }}
      onEscapeKeyDown={(e) => {
        if (!closeOnEsc) e.preventDefault();
      }}
      className={className}
      {...(rest as React.ComponentProps<typeof DialogContent>)}
    >
      {children}
    </DialogContent>
  );
}

function ShadcnModalHeader({ title, titleId, className, children, ...rest }: ModalHeaderProps) {
  const idProp = titleId ? { id: titleId } : {};
  return (
    <DialogHeader className={className} {...rest}>
      <DialogTitle {...idProp}>{title ?? children}</DialogTitle>
    </DialogHeader>
  );
}

function ShadcnModalBody({ descriptionId, className, children, ...rest }: ModalBodyProps) {
  if (descriptionId) {
    return (
      <DialogDescription
        id={descriptionId}
        className={className}
        {...(rest as React.ComponentProps<typeof DialogDescription>)}
      >
        {children}
      </DialogDescription>
    );
  }
  return (
    <div className={className} {...rest}>
      {children}
    </div>
  );
}

function ShadcnModalFooter({ children, className, ...rest }: ModalFooterProps) {
  return (
    <DialogFooter className={className} {...rest}>
      {children}
    </DialogFooter>
  );
}

function ShadcnModalClose({ asChild, children, className, ...rest }: ModalCloseProps) {
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
          "ring-offset-background focus:ring-ring absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none",
          className
        )}
        aria-label="Close"
        {...rest}
      >
        <XIcon className="size-4" />
        <span className="sr-only">Close</span>
      </button>
    </DialogClose>
  );
}

// ─── Dispatched parts (public surface preserved) ────────────────────────────────

export function ModalRoot(props: ModalRootProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsModalRoot {...props} />;
  return <ShadcnModalRoot {...props} />;
}

export function ModalTrigger(props: ModalTriggerProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsModalTrigger {...props} />;
  const { asChild, children, className, ...rest } = props;
  return (
    <DialogTrigger asChild={asChild} className={className} {...rest}>
      {children}
    </DialogTrigger>
  );
}

export function ModalOverlay(props: ModalOverlayProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsModalOverlay {...props} />;
  // shadcn DialogContent renders its own overlay internally — no-op, matching KRDS.
  return null;
}

export function ModalContent(props: ModalContentProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsModalContent {...props} />;
  return <ShadcnModalContent {...props} />;
}

export function ModalHeader(props: ModalHeaderProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsModalHeader {...props} />;
  return <ShadcnModalHeader {...props} />;
}

export function ModalBody(props: ModalBodyProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsModalBody {...props} />;
  return <ShadcnModalBody {...props} />;
}

export function ModalFooter(props: ModalFooterProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsModalFooter {...props} />;
  return <ShadcnModalFooter {...props} />;
}

export function ModalClose(props: ModalCloseProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsModalClose {...props} />;
  return <ShadcnModalClose {...props} />;
}

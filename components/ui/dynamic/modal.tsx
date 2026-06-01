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
  ModalSize,
  ModalTriggerProps,
  ModalVariant
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
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
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
// or a vanilla shadcn primitive based on <UISystemProvider>.
//
// shadcn-mode mapping by variant:
//   default / fullscreen → shadcn Dialog; `size` maps to sm:max-w-[400|560|760px].
//   bottom-sheet         → shadcn Drawer (vaul; direction="bottom", drag handle +
//                          drag-to-dismiss). Because vaul's Title/Description live in
//                          vaul's own Radix-dialog context (distinct from the umbrella
//                          `radix-ui` Dialog this file imports), the bottom-sheet path
//                          uses Drawer* parts for Root/Trigger/Content/Close/Header/
//                          Body/Footer — not a mix of Dialog* and Drawer*.
// closeOnOverlayClick / closeOnEsc are honored via the Content interaction guards
// (vaul Content is a Radix Dialog Content, so the same guards apply). usePortal /
// portalContainer are dropped — neither primitive exposes such axes.

// ─── Dispatcher-internal context: thread Root-level options to shadcn parts ─────

type ShadcnModalContextValue = {
  closeOnOverlayClick: boolean;
  closeOnEsc: boolean;
  size: ModalSize;
  variant: ModalVariant;
};

const ShadcnModalContext = React.createContext<ShadcnModalContextValue>({
  closeOnOverlayClick: true,
  closeOnEsc: true,
  size: "md",
  variant: "default"
});

// ─── shadcn-mode parts ──────────────────────────────────────────────────────────

function ShadcnModalRoot({
  open,
  defaultOpen,
  onOpenChange,
  size = "md",
  variant = "default",
  closeOnEsc = true,
  closeOnOverlayClick = true,
  usePortal: _usePortal,
  portalContainer: _portalContainer,
  children
}: ModalRootProps) {
  const isBottomSheet = variant === "bottom-sheet";
  return (
    <ShadcnModalContext.Provider value={{ closeOnOverlayClick, closeOnEsc, size, variant }}>
      {isBottomSheet ? (
        <Drawer open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
          {children}
        </Drawer>
      ) : (
        <Dialog open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
          {children}
        </Dialog>
      )}
    </ShadcnModalContext.Provider>
  );
}

function ShadcnModalTrigger({ asChild, children, className, ...rest }: ModalTriggerProps) {
  const { variant } = React.useContext(ShadcnModalContext);
  const Trigger = variant === "bottom-sheet" ? DrawerTrigger : DialogTrigger;
  return (
    <Trigger asChild={asChild} className={className} {...rest}>
      {children}
    </Trigger>
  );
}

function ShadcnModalContent({ children, className, ...rest }: ModalContentProps) {
  const { closeOnOverlayClick, closeOnEsc, size, variant } = React.useContext(ShadcnModalContext);
  if (variant === "bottom-sheet") {
    return (
      <DrawerContent
        onInteractOutside={(e) => {
          if (!closeOnOverlayClick) e.preventDefault();
        }}
        onEscapeKeyDown={(e) => {
          if (!closeOnEsc) e.preventDefault();
        }}
        className={className}
        {...(rest as React.ComponentProps<typeof DrawerContent>)}
      >
        {children}
      </DrawerContent>
    );
  }
  const sizeClass = {
    sm: "sm:max-w-[400px]",
    md: "sm:max-w-[560px]",
    lg: "sm:max-w-[760px]"
  }[size];
  return (
    <DialogContent
      showCloseButton={false}
      onInteractOutside={(e) => {
        if (!closeOnOverlayClick) e.preventDefault();
      }}
      onEscapeKeyDown={(e) => {
        if (!closeOnEsc) e.preventDefault();
      }}
      className={cn(sizeClass, className)}
      {...(rest as React.ComponentProps<typeof DialogContent>)}
    >
      {children}
    </DialogContent>
  );
}

function ShadcnModalHeader({ title, titleId, className, children, ...rest }: ModalHeaderProps) {
  const { variant } = React.useContext(ShadcnModalContext);
  const idProp = titleId ? { id: titleId } : {};
  if (variant === "bottom-sheet") {
    return (
      <DrawerHeader className={className} {...rest}>
        <DrawerTitle {...idProp}>{title ?? children}</DrawerTitle>
      </DrawerHeader>
    );
  }
  return (
    <DialogHeader className={className} {...rest}>
      <DialogTitle {...idProp}>{title ?? children}</DialogTitle>
    </DialogHeader>
  );
}

function ShadcnModalBody({ descriptionId, className, children, ...rest }: ModalBodyProps) {
  const { variant } = React.useContext(ShadcnModalContext);
  if (descriptionId) {
    if (variant === "bottom-sheet") {
      return (
        <DrawerDescription
          id={descriptionId}
          className={cn("px-4 pb-4", className)}
          {...(rest as React.ComponentProps<typeof DrawerDescription>)}
        >
          {children}
        </DrawerDescription>
      );
    }
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
  // bottom-sheet (Drawer) has no content padding of its own — DrawerHeader/Footer
  // self-pad, but the body div does not, so pad it to match. Dialog keeps p-6.
  return (
    <div className={cn(variant === "bottom-sheet" && "px-4 pb-4", className)} {...rest}>
      {children}
    </div>
  );
}

function ShadcnModalFooter({ children, className, ...rest }: ModalFooterProps) {
  const { variant } = React.useContext(ShadcnModalContext);
  if (variant === "bottom-sheet") {
    return (
      <DrawerFooter className={className} {...rest}>
        {children}
      </DrawerFooter>
    );
  }
  return (
    <DialogFooter className={className} {...rest}>
      {children}
    </DialogFooter>
  );
}

function ShadcnModalClose({ asChild, children, className, ...rest }: ModalCloseProps) {
  const { variant } = React.useContext(ShadcnModalContext);
  const Close = variant === "bottom-sheet" ? DrawerClose : DialogClose;
  if (children) {
    return (
      <Close asChild={asChild} className={className} {...rest}>
        {children}
      </Close>
    );
  }
  return (
    <Close asChild>
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
    </Close>
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
  return <ShadcnModalTrigger {...props} />;
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

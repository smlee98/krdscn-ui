"use client";

import type * as React from "react";
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

// KRDS Modal already composes shadcn Dialog with KRDS chrome (size/variant,
// bottom-sheet/fullscreen layouts). Render KRDS regardless of active UI system.
export function ModalRoot(props: React.ComponentProps<typeof KrdsModalRoot>) {
  return <KrdsModalRoot {...props} />;
}

export function ModalTrigger(props: React.ComponentProps<typeof KrdsModalTrigger>) {
  return <KrdsModalTrigger {...props} />;
}

export function ModalOverlay(props: React.ComponentProps<typeof KrdsModalOverlay>) {
  return <KrdsModalOverlay {...props} />;
}

export function ModalContent(props: React.ComponentProps<typeof KrdsModalContent>) {
  return <KrdsModalContent {...props} />;
}

export function ModalHeader(props: React.ComponentProps<typeof KrdsModalHeader>) {
  return <KrdsModalHeader {...props} />;
}

export function ModalBody(props: React.ComponentProps<typeof KrdsModalBody>) {
  return <KrdsModalBody {...props} />;
}

export function ModalFooter(props: React.ComponentProps<typeof KrdsModalFooter>) {
  return <KrdsModalFooter {...props} />;
}

export function ModalClose(props: React.ComponentProps<typeof KrdsModalClose>) {
  return <KrdsModalClose {...props} />;
}

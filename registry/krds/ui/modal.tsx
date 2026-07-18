// rsc:client
"use client"
/**
 * KRDS Modal — radix Dialog 직접 합성. (_modal.scss / KRDS 모달 컴포넌트)
 * Sub-parts: ModalRoot, ModalTrigger, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalClose.
 *
 * 합성 진실: 오버레이·포털·포커스 트랩·ESC·외부클릭은 radix Dialog 프리미티브가 소유한다.
 *   오버레이는 ModalContent 내부에서 DialogPrimitive.Overlay 로 렌더한다(별도 Overlay 파트 미노출).
 * context(1개): ModalRoot 에 지정한 size/variant/closeOnEsc/closeOnOverlayClick 을 ModalContent 로
 *   전달하는 용도. 열림·선택 상태는 프리미티브가 소유하며 context 로 복제하지 않는다(스타일/배선 전용 아님 —
 *   closeOn* 은 프리미티브 콜백 배선에 실제로 필요한 파트 간 상태).
 */

import * as React from "react"
import { XIcon } from "lucide-react"
import { Dialog as DialogPrimitive } from "radix-ui"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

type ModalSize = "sm" | "md" | "lg"
type ModalVariant = "default" | "bottom-sheet" | "fullscreen"

type ModalRootProps = React.ComponentProps<typeof DialogPrimitive.Root> & {
  size?: ModalSize
  variant?: ModalVariant
  /** Escape 키로 닫기 (기본값: true). */
  closeOnEsc?: boolean
  /** 오버레이(딤) 클릭으로 닫기 (기본값: true). */
  closeOnOverlayClick?: boolean
}

type ModalTriggerProps = React.ComponentProps<typeof DialogPrimitive.Trigger>

type ModalContentProps = React.ComponentProps<typeof DialogPrimitive.Content>

type ModalHeaderProps = React.ComponentProps<typeof DialogPrimitive.Title> & {
  title?: React.ReactNode
  titleId?: string
}

type ModalBodyProps = React.ComponentProps<"div"> & {
  descriptionId?: string
}

type ModalFooterProps = React.ComponentProps<"div"> & {
  /** KRDS .modal-btn.multi-conts — 버튼 그룹을 좌우로 벌려 배치(justify-between). 기본값 false(justify-end) (_modal.scss:180-182). */
  multiConts?: boolean
}

type ModalCloseProps = React.ComponentProps<typeof DialogPrimitive.Close> & {
  /** 기본 닫기 버튼의 접근성 라벨 (children 미지정 시). */
  closeLabel?: string
}

// ─── Content 스타일 (cva) ───────────────────────────────────────────────────────
// 위치·크기·모서리는 변형별로 완결한다 — 베이스가 중앙정렬을 단정하지 않으므로
// bottom-sheet/fullscreen 이 !important 로 되돌릴 필요가 없다.
const modalContentVariants = cva(
  cn(
    "fixed z-50 flex w-full flex-col items-start gap-0 p-6 outline-none duration-200",
    "bg-krds-surface border-krds-border border",
    // KRDS --krds-modal--wrap-shadow: 0 0 0.2rem shadow2, 0 1.6rem 2.4rem shadow3 (_modal.scss:38,133)
    "shadow-[0_0_2px_0_rgba(0,0,0,0.08),0_16px_24px_0_rgba(0,0,0,0.12)]",
    "dark:shadow-[0_0_2px_0_rgba(0,0,0,0.2),0_16px_24px_0_rgba(0,0,0,0.4)]",
    "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
    "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
  ),
  {
    variants: {
      variant: {
        default: cn(
          "top-[50%] left-[50%] max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] rounded-[12px]",
          // KRDS: modal-content max-height 80%, min-height 26.4rem(264px) (_modal.scss:113,126) → 긴 본문은 ModalBody 내부에서 스크롤.
          "max-h-[80%] min-h-[264px]"
        ),
        "bottom-sheet": "top-auto right-0 bottom-0 left-0 max-w-none translate-x-0 translate-y-0 rounded-t-xl",
        fullscreen: "inset-0 max-w-none translate-x-0 translate-y-0 rounded-none",
      },
      size: {
        sm: "",
        md: "",
        lg: "",
      },
    },
    // 크기(max-width)는 default 변형에서만 의미를 가진다 — bottom-sheet/fullscreen 은 폭을 꽉 채운다.
    compoundVariants: [
      { variant: "default", size: "sm", className: "sm:max-w-[400px]" },
      { variant: "default", size: "md", className: "sm:max-w-[560px]" },
      { variant: "default", size: "lg", className: "sm:max-w-[760px]" },
    ],
    defaultVariants: { variant: "default", size: "md" },
  }
)

// ─── Context ──────────────────────────────────────────────────────────────────

type ModalContextValue = {
  size: ModalSize
  variant: ModalVariant
  closeOnEsc: boolean
  closeOnOverlayClick: boolean
}

const ModalContext = React.createContext<ModalContextValue>({
  size: "md",
  variant: "default",
  closeOnEsc: true,
  closeOnOverlayClick: true,
})

// ─── ModalRoot ────────────────────────────────────────────────────────────────

function ModalRoot({
  size = "md",
  variant = "default",
  closeOnEsc = true,
  closeOnOverlayClick = true,
  children,
  ...props
}: ModalRootProps) {
  return (
    <ModalContext.Provider value={{ size, variant, closeOnEsc, closeOnOverlayClick }}>
      <DialogPrimitive.Root data-slot="krds-modal" {...props}>
        {children}
      </DialogPrimitive.Root>
    </ModalContext.Provider>
  )
}

// ─── ModalTrigger ─────────────────────────────────────────────────────────────

function ModalTrigger({ className, ...props }: ModalTriggerProps) {
  return <DialogPrimitive.Trigger data-slot="krds-modal-trigger" className={className} {...props} />
}

// ─── ModalContent ─────────────────────────────────────────────────────────────

function ModalContent({ className, children, ...props }: ModalContentProps) {
  const { size, variant, closeOnEsc, closeOnOverlayClick } = React.useContext(ModalContext)

  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay
        data-slot="krds-modal-overlay"
        className="data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/75"
      />
      <DialogPrimitive.Content
        data-slot="krds-modal-content"
        onEscapeKeyDown={(e) => {
          if (!closeOnEsc) e.preventDefault()
        }}
        onInteractOutside={(e) => {
          if (!closeOnOverlayClick) e.preventDefault()
        }}
        className={cn(modalContentVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}

// ─── ModalHeader ──────────────────────────────────────────────────────────────

function ModalHeader({ title, titleId, className, children, ...props }: ModalHeaderProps) {
  const idProp = titleId ? { id: titleId } : {}
  return (
    <DialogPrimitive.Title
      data-slot="krds-modal-header"
      {...idProp}
      className={cn(
        // KRDS 모바일 헤딩은 mobile-font-size-heading-medium(22px)로 축소 (_modal.scss:283).
        "text-krds-foreground w-full px-4 pt-8 pb-4 text-2xl leading-[1.5] font-bold max-md:text-[22px]",
        className
      )}
      {...props}
    >
      {title ?? children}
    </DialogPrimitive.Title>
  )
}

// ─── ModalBody ────────────────────────────────────────────────────────────────

function ModalBody({ descriptionId, className, children, ...props }: ModalBodyProps) {
  return (
    <div
      data-slot="krds-modal-body"
      className={cn(
        "text-krds-foreground text-krds-body-md flex w-full flex-col gap-4 px-4 pb-2 font-normal",
        // KRDS: 긴 본문은 다이얼로그 밖으로 넘치지 않고 본문 영역 내부에서 스크롤.
        "min-h-0 flex-1 overflow-y-auto",
        className
      )}
      {...props}
    >
      {descriptionId ? (
        <DialogPrimitive.Description id={descriptionId} className="contents">
          {children}
        </DialogPrimitive.Description>
      ) : (
        children
      )}
    </div>
  )
}

// ─── ModalFooter ──────────────────────────────────────────────────────────────

function ModalFooter({ className, children, multiConts = false, ...props }: ModalFooterProps) {
  return (
    <div
      data-slot="krds-modal-footer"
      data-multi-conts={multiConts || undefined}
      className={cn(
        "flex w-full items-center gap-2 p-4",
        multiConts ? "justify-between" : "justify-end",
        // KRDS .krds-btn min-width 7.8rem(78px) — 직접 자식 버튼에 적용 (_modal.scss:178).
        "[&>*]:min-w-[78px]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// ─── ModalClose ───────────────────────────────────────────────────────────────

function ModalClose({ asChild, children, className, closeLabel = "닫기", ...props }: ModalCloseProps) {
  if (children) {
    return (
      <DialogPrimitive.Close data-slot="krds-modal-close" asChild={asChild} className={className} {...props}>
        {children}
      </DialogPrimitive.Close>
    )
  }
  return (
    <DialogPrimitive.Close asChild>
      <button
        type="button"
        data-slot="krds-modal-close"
        className={cn(
          "absolute top-6 right-6 outline-none",
          "text-krds-foreground",
          "focus-visible:krds-focus-ring",
          className
        )}
        aria-label={closeLabel}
        {...props}
      >
        <XIcon className="size-6" />
      </button>
    </DialogPrimitive.Close>
  )
}

export { ModalRoot, ModalTrigger, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalClose }
export type {
  ModalRootProps,
  ModalTriggerProps,
  ModalContentProps,
  ModalHeaderProps,
  ModalBodyProps,
  ModalFooterProps,
  ModalCloseProps,
  ModalSize,
  ModalVariant,
}

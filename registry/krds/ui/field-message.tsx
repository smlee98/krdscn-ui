import * as React from "react"
import { Info } from "lucide-react"
import { cn } from "@/lib/utils"

// KRDS 상태 메시지 아이콘은 채움형(ico_error_fill/ico_success_fill/ico_information_fill —
// 색 원 + 흰 기호)이다. lucide는 스트로크 기반이라 채움형 인라인 SVG로 복제한다.
// currentColor 로 원을 채워 각 메시지의 텍스트 색을 그대로 따른다.
function IconErrorFill({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="8" fill="currentColor" />
      <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function IconSuccessFill({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="8" fill="currentColor" />
      <path
        d="M4.5 8.2l2.4 2.4 4.6-4.8"
        stroke="#fff"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

function IconInformationFill({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="8" fill="currentColor" />
      <path d="M8 7.2v4" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="8" cy="4.8" r="0.9" fill="#fff" />
    </svg>
  )
}

// Shared prop type for icon-bearing field messages
export type FieldMessageProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode
}

// KRDS 메시지 줄바꿈 시 아이콘을 첫 줄에 맞춰 상단 정렬 (items-start), items-center 아님.
const BASE = "flex items-start gap-1 text-krds-body-xs"

// FieldHint — gray helper text with a leading info icon, no role; uses <p>
// (KRDS [class^=form-hint]::before = ico_information, _form_layout.scss:115-131)
function FieldHint({ children, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p data-slot="krds-field-hint" className={cn(BASE, "text-krds-foreground-subtle", className)} {...props}>
      <Info className="size-4 shrink-0" aria-hidden="true" />
      <span>{children}</span>
    </p>
  )
}

// FieldError — red text + CircleAlert icon + role="alert"
function FieldError({ children, className, ...props }: FieldMessageProps) {
  return (
    <div
      data-slot="krds-field-error"
      role="alert"
      className={cn(BASE, "text-krds-foreground-danger", className)}
      {...props}
    >
      <IconErrorFill className="size-4 shrink-0" />
      <span>{children}</span>
    </div>
  )
}

// FieldSuccess — green text + CheckCircle2 icon
function FieldSuccess({ children, className, ...props }: FieldMessageProps) {
  return (
    <div data-slot="krds-field-success" className={cn(BASE, "text-krds-foreground-success", className)} {...props}>
      <IconSuccessFill className="size-4 shrink-0" />
      <span>{children}</span>
    </div>
  )
}

// FieldInformation — info-blue text + Info icon
function FieldInformation({ children, className, ...props }: FieldMessageProps) {
  return (
    <div
      data-slot="krds-field-information"
      className={cn(BASE, "text-krds-foreground-information", className)}
      {...props}
    >
      <IconInformationFill className="size-4 shrink-0" />
      <span>{children}</span>
    </div>
  )
}

// Shared message props for form-field components.
export type FieldMessages = {
  hint?: React.ReactNode
  error?: React.ReactNode
  success?: React.ReactNode
  information?: React.ReactNode
}

// Renders a single field message below a control with precedence:
// error > success > information > hint. The element is given id `${id}-message`
// so it can be referenced via aria-describedby. Returns null when no message.
function renderFieldMessage(id: string, { error, success, information, hint }: FieldMessages): React.ReactNode {
  const messageId = `${id}-message`
  if (error != null && error !== false) return <FieldError id={messageId}>{error}</FieldError>
  if (success != null && success !== false) return <FieldSuccess id={messageId}>{success}</FieldSuccess>
  if (information != null && information !== false)
    return <FieldInformation id={messageId}>{information}</FieldInformation>
  if (hint != null && hint !== false) return <FieldHint id={messageId}>{hint}</FieldHint>
  return null
}

export { FieldHint, FieldError, FieldSuccess, FieldInformation, renderFieldMessage }

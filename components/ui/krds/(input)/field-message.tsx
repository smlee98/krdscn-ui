import * as React from "react";
import { CircleAlert, CheckCircle2, Info } from "lucide-react";
import { cn } from "@/lib/cn";

// Shared prop type for icon-bearing field messages
export type FieldMessageProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode;
};

const BASE = "flex items-center gap-1 text-krds-body-xs";

// FieldHint — gray helper text, no icon, no role; uses <p>
function FieldHint({ children, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p data-slot="krds-field-hint" className={cn("text-krds-body-xs text-krds-foreground-subtle", className)} {...props}>
      {children}
    </p>
  );
}

// FieldError — red text + CircleAlert icon + role="alert"
function FieldError({ children, className, ...props }: FieldMessageProps) {
  return (
    <div data-slot="krds-field-error" role="alert" className={cn(BASE, "text-krds-foreground-danger", className)} {...props}>
      <CircleAlert className="size-4 shrink-0" />
      <span>{children}</span>
    </div>
  );
}

// FieldSuccess — green text + CheckCircle2 icon
function FieldSuccess({ children, className, ...props }: FieldMessageProps) {
  return (
    <div data-slot="krds-field-success" className={cn(BASE, "text-krds-foreground-success", className)} {...props}>
      <CheckCircle2 className="size-4 shrink-0" />
      <span>{children}</span>
    </div>
  );
}

// FieldInformation — info-blue text + Info icon
function FieldInformation({ children, className, ...props }: FieldMessageProps) {
  return (
    <div data-slot="krds-field-information" className={cn(BASE, "text-krds-foreground-information", className)} {...props}>
      <Info className="size-4 shrink-0" />
      <span>{children}</span>
    </div>
  );
}

// Shared message props for form-field components.
export type FieldMessages = {
  hint?: React.ReactNode;
  error?: React.ReactNode;
  success?: React.ReactNode;
  information?: React.ReactNode;
};

// Renders a single field message below a control with precedence:
// error > success > information > hint. The element is given id `${id}-message`
// so it can be referenced via aria-describedby. Returns null when no message.
function renderFieldMessage(id: string, { error, success, information, hint }: FieldMessages): React.ReactNode {
  const messageId = `${id}-message`;
  if (error != null && error !== false) return <FieldError id={messageId}>{error}</FieldError>;
  if (success != null && success !== false) return <FieldSuccess id={messageId}>{success}</FieldSuccess>;
  if (information != null && information !== false) return <FieldInformation id={messageId}>{information}</FieldInformation>;
  if (hint != null && hint !== false) return <FieldHint id={messageId}>{hint}</FieldHint>;
  return null;
}

export { FieldHint, FieldError, FieldSuccess, FieldInformation, renderFieldMessage };

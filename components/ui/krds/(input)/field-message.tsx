import * as React from "react";
import { CircleAlert, CheckCircle2, Info } from "lucide-react";
import { cn } from "@/lib/cn";

// Shared prop type for icon-bearing field messages
export type FieldMessageProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode;
};

const BASE = "flex items-center gap-1 text-[13px] leading-[1.5]";

// FieldHint — gray helper text, no icon, no role; uses <p>
function FieldHint({ children, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p data-slot="krds-field-hint" className={cn("text-[13px] leading-[1.5] text-[#464c53]", className)} {...props}>
      {children}
    </p>
  );
}

// FieldError — red text + CircleAlert icon + role="alert"
function FieldError({ children, className, ...props }: FieldMessageProps) {
  return (
    <div data-slot="krds-field-error" role="alert" className={cn(BASE, "text-[#bd2c0f]", className)} {...props}>
      <CircleAlert className="size-4 shrink-0" />
      <span>{children}</span>
    </div>
  );
}

// FieldSuccess — green text + CheckCircle2 icon
function FieldSuccess({ children, className, ...props }: FieldMessageProps) {
  return (
    <div data-slot="krds-field-success" className={cn(BASE, "text-[#267337]", className)} {...props}>
      <CheckCircle2 className="size-4 shrink-0" />
      <span>{children}</span>
    </div>
  );
}

// FieldInformation — info-blue text + Info icon
function FieldInformation({ children, className, ...props }: FieldMessageProps) {
  return (
    <div data-slot="krds-field-information" className={cn(BASE, "text-[#096ab3]", className)} {...props}>
      <Info className="size-4 shrink-0" />
      <span>{children}</span>
    </div>
  );
}

export { FieldHint, FieldError, FieldSuccess, FieldInformation };

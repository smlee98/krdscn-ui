// rsc:client
"use client";

import * as React from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/cn";

// ─── Types ────────────────────────────────────────────────────────────────────

type LanguageOption = {
  value: string;
  label: string;
  href?: string;
  external?: boolean;
};

type LanguageSwitcherProps = Omit<React.ComponentPropsWithRef<"div">, "onChange" | "defaultValue"> & {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, option: LanguageOption) => void;
  options?: LanguageOption[];
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  closeOnClickOutside?: boolean;
  children: React.ReactNode;
};

type LanguageSwitcherTriggerProps = {
  label?: string;
  className?: string;
};

type LanguageSwitcherMenuProps = {
  className?: string;
  children?: React.ReactNode;
};

type LanguageSwitcherCurrentProps = {
  label: string;
  className?: string;
};

type LanguageSwitcherOptionListProps = {
  className?: string;
};

type LanguageSwitcherOptionItemProps = {
  value: string;
  label: string;
  href?: string;
  external?: boolean;
  className?: string;
};

// ─── Context ──────────────────────────────────────────────────────────────────

type LangCtx = {
  value: string;
  setValue: (v: string, opt: LanguageOption) => void;
  options: LanguageOption[];
  open: boolean;
  setOpen: (o: boolean) => void;
  closeOnClickOutside: boolean;
};

const LangContext = React.createContext<LangCtx | null>(null);

function useLangCtx(): LangCtx {
  const ctx = React.useContext(LangContext);
  if (!ctx) throw new Error("LanguageSwitcher compound components must be used inside <LanguageSwitcher>");
  return ctx;
}

// ─── Inline SVG Icons ─────────────────────────────────────────────────────────

function IconGlobe({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 12h18M12 3a13 13 0 0 1 0 18M12 3a13 13 0 0 0 0 18" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function IconChevronDown({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconExternal({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}


// ─── Root ─────────────────────────────────────────────────────────────────────

function LanguageSwitcherRoot({
  value,
  defaultValue = "",
  onChange,
  options = [],
  open,
  defaultOpen,
  onOpenChange,
  closeOnClickOutside = true,
  className,
  children,
  ...rest
}: LanguageSwitcherProps) {
  const [internalValue, setInternalValue] = React.useState<string>(defaultValue);
  const [internalOpen, setInternalOpen] = React.useState<boolean>(defaultOpen ?? false);

  const isControlledValue = value !== undefined;
  const isControlledOpen = open !== undefined;

  const currentValue = isControlledValue ? value : internalValue;
  const isOpen = isControlledOpen ? open : internalOpen;

  function handleSetOpen(o: boolean) {
    if (!isControlledOpen) setInternalOpen(o);
    onOpenChange?.(o);
  }

  function handleSetValue(v: string, opt: LanguageOption) {
    if (!isControlledValue) setInternalValue(v);
    onChange?.(v, opt);
    handleSetOpen(false);
  }

  return (
    <LangContext.Provider
      value={{
        value: currentValue,
        setValue: handleSetValue,
        options,
        open: isOpen,
        setOpen: handleSetOpen,
        closeOnClickOutside,
      }}
    >
      <Popover open={isOpen} onOpenChange={handleSetOpen}>
        <div
          data-slot="krds-language-switcher"
          className={cn("relative inline-flex flex-col items-center", className)}
          {...rest}
        >
          {children}
        </div>
      </Popover>
    </LangContext.Provider>
  );
}

// ─── Trigger ──────────────────────────────────────────────────────────────────

function LanguageSwitcherTrigger({ label = "Language", className }: LanguageSwitcherTriggerProps) {
  const { value, options, open } = useLangCtx();
  const resolvedLabel = options.find((o) => o.value === value)?.label ?? label;

  return (
    <PopoverTrigger asChild>
      <button
        type="button"
        aria-label={label}
        aria-expanded={open}
        className={cn(
          "inline-flex h-6 items-center gap-0.5 rounded-[4px] px-0.5 transition-colors",
          "text-krds-fg hover:bg-krds-surface-secondary-subtle data-[state=open]:bg-krds-surface-secondary-subtle",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-krds-border-primary focus-visible:ring-offset-1",
          className
        )}
      >
        <IconGlobe className="size-4" />
        <span className="text-krds-body-sm">{resolvedLabel}</span>
        <IconChevronDown className="size-4" />
      </button>
    </PopoverTrigger>
  );
}

// ─── Menu ─────────────────────────────────────────────────────────────────────

function LanguageSwitcherMenu({ className, children }: LanguageSwitcherMenuProps) {
  const { closeOnClickOutside } = useLangCtx();

  return (
    <PopoverContent
      align="center"
      sideOffset={8}
      onPointerDownOutside={closeOnClickOutside ? undefined : (e) => e.preventDefault()}
      className={cn(
        "border-none bg-transparent p-0 shadow-none",
        "drop-shadow-[0_0_1px_rgba(0,0,0,0.05)] drop-shadow-[0_4px_4px_rgba(0,0,0,0.08)]",
        className
      )}
    >
      <div className="relative min-w-[200px] rounded-[8px] border border-krds-border-light bg-white p-2">
        <span
          aria-hidden
          className="pointer-events-none absolute -top-[4px] left-1/2 -translate-x-1/2 block h-2 w-2 rotate-45 border border-krds-border-light border-b-transparent border-r-transparent bg-white"
        />
        <ul role="listbox" aria-label="언어 선택" className="m-0 flex list-none flex-col gap-2 p-0">
          {children}
        </ul>
      </div>
    </PopoverContent>
  );
}

// ─── Current ──────────────────────────────────────────────────────────────────

function LanguageSwitcherCurrent({ label, className }: LanguageSwitcherCurrentProps) {
  const { value, options } = useLangCtx();
  const resolvedLabel = options.find((o) => o.value === value)?.label ?? value;

  return (
    <div className={cn("flex flex-col gap-0.5 border-b border-krds-border-light px-4 py-2", className)}>
      <span className="text-krds-body-sm text-krds-fg-subtle">{label}</span>
      <strong className="text-krds-body-md font-bold text-krds-fg-secondary">{resolvedLabel}</strong>
    </div>
  );
}

// ─── OptionList ───────────────────────────────────────────────────────────────

function LanguageSwitcherOptionList({ className }: LanguageSwitcherOptionListProps) {
  const { options } = useLangCtx();

  return (
    <div className={cn("flex flex-col", className)}>
      {options.map((opt) => (
        <LanguageSwitcherOptionItem
          key={opt.value}
          value={opt.value}
          label={opt.label}
          href={opt.href}
          external={opt.external}
        />
      ))}
    </div>
  );
}

// ─── OptionItem ───────────────────────────────────────────────────────────────

function LanguageSwitcherOptionItem({
  value,
  label,
  href,
  external,
  className,
}: LanguageSwitcherOptionItemProps) {
  const ctx = useLangCtx();
  const isSelected = ctx.value === value;
  const option: LanguageOption = { value, label, href, external };

  const baseClasses = cn(
    "flex h-12 w-full min-w-[160px] items-center gap-1 rounded-[6px] px-4",
    "text-krds-body-md no-underline outline-none transition-colors",
    isSelected
      ? "bg-krds-surface-secondary-subtle text-krds-fg-secondary font-bold"
      : "text-krds-fg font-normal hover:bg-krds-surface-secondary-subtle",
    className
  );

  function handleClick(e: React.MouseEvent) {
    if (href && external) {
      // Let external links navigate naturally — do not prevent default
      return;
    }
    if (href) {
      e.preventDefault();
    }
    ctx.setValue(value, option);
    ctx.setOpen(false);
  }

  const inner = (
    <>
      <span className="flex-1">{label}</span>
      {external && <IconExternal className="size-5" aria-hidden />}
    </>
  );

  return (
    <li role="none">
      {href ? (
        <a
          href={href}
          role="option"
          aria-selected={isSelected}
          lang={value}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          onClick={handleClick}
          className={baseClasses}
        >
          {inner}
        </a>
      ) : (
        <button
          type="button"
          role="option"
          aria-selected={isSelected}
          lang={value}
          onClick={handleClick}
          className={baseClasses}
        >
          {inner}
        </button>
      )}
    </li>
  );
}

// ─── Compound Export ──────────────────────────────────────────────────────────

const LanguageSwitcher = Object.assign(LanguageSwitcherRoot, {
  Root: LanguageSwitcherRoot,
  Trigger: LanguageSwitcherTrigger,
  Menu: LanguageSwitcherMenu,
  Current: LanguageSwitcherCurrent,
  OptionList: LanguageSwitcherOptionList,
  OptionItem: LanguageSwitcherOptionItem,
});

export { LanguageSwitcher };
export type {
  LanguageOption,
  LanguageSwitcherProps,
  LanguageSwitcherTriggerProps,
  LanguageSwitcherMenuProps,
  LanguageSwitcherCurrentProps,
  LanguageSwitcherOptionListProps,
  LanguageSwitcherOptionItemProps,
};

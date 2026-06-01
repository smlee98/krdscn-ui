"use client";

import * as React from "react";
import { Check, ChevronDown, ExternalLink, Globe } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/cn";
import { useUISystem } from "@/lib/ui-system";
import { LanguageSwitcher as KrdsLanguageSwitcher } from "@/components/ui/krds/(settings)/language-switcher";
import type {
  LanguageOption,
  LanguageSwitcherProps,
  LanguageSwitcherTriggerProps,
  LanguageSwitcherMenuProps,
  LanguageSwitcherCurrentProps,
  LanguageSwitcherOptionListProps,
  LanguageSwitcherOptionItemProps
} from "@/components/ui/krds/(settings)/language-switcher";

export type {
  LanguageOption,
  LanguageSwitcherProps,
  LanguageSwitcherTriggerProps,
  LanguageSwitcherMenuProps,
  LanguageSwitcherCurrentProps,
  LanguageSwitcherOptionListProps,
  LanguageSwitcherOptionItemProps
} from "@/components/ui/krds/(settings)/language-switcher";

// Dual-render dispatcher. language-switcher had no dispatcher → examples imported
// the KRDS compound directly and rendered KRDS chrome (the custom Popover bubble
// with a caret + krds hex tokens) in BOTH systems. shadcn has no language-switcher
// primitive but does have DropdownMenu — the canonical shadcn pattern for exactly
// this (a trigger that opens a single-select menu). The shadcn branch rebuilds the
// SAME compound surface (Root/Trigger/Menu/Current/OptionList/OptionItem) on top of
// DropdownMenu with shadcn tokens; external-link options become link menu items.
// The KRDS context is private, so the shadcn branch threads its own context.

type ShadcnLangCtx = {
  value: string;
  setValue: (v: string, opt: LanguageOption) => void;
  options: LanguageOption[];
};

const ShadcnLangContext = React.createContext<ShadcnLangCtx | null>(null);

function useShadcnLang(): ShadcnLangCtx {
  const ctx = React.useContext(ShadcnLangContext);
  if (!ctx) throw new Error("LanguageSwitcher compound components must be used inside <LanguageSwitcher>");
  return ctx;
}

// ─── shadcn-mode parts ──────────────────────────────────────────────────────────

function ShadcnRoot({
  value,
  defaultValue = "",
  onChange,
  options = [],
  open,
  defaultOpen,
  onOpenChange,
  closeOnClickOutside: _closeOnClickOutside,
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
    <ShadcnLangContext.Provider value={{ value: currentValue, setValue: handleSetValue, options }}>
      <DropdownMenu open={isOpen} onOpenChange={handleSetOpen}>
        <div
          data-slot="shadcn-language-switcher"
          className={cn("relative inline-flex flex-col items-center", className)}
          {...rest}
        >
          {children}
        </div>
      </DropdownMenu>
    </ShadcnLangContext.Provider>
  );
}

function ShadcnTrigger({ label = "Language", className }: LanguageSwitcherTriggerProps) {
  const { value, options } = useShadcnLang();
  const resolvedLabel = options.find((o) => o.value === value)?.label ?? label;

  return (
    <DropdownMenuTrigger asChild>
      <button
        type="button"
        aria-label={label}
        className={cn(
          "inline-flex h-8 items-center gap-1 rounded-md px-2 text-sm transition-colors outline-none",
          "hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent",
          "focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          className
        )}
      >
        <Globe className="size-4" />
        <span>{resolvedLabel}</span>
        <ChevronDown className="size-4 opacity-50" />
      </button>
    </DropdownMenuTrigger>
  );
}

function ShadcnMenu({ className, children }: LanguageSwitcherMenuProps) {
  return (
    <DropdownMenuContent align="center" sideOffset={8} className={cn("min-w-[200px]", className)}>
      {children}
    </DropdownMenuContent>
  );
}

function ShadcnCurrent({ label, className }: LanguageSwitcherCurrentProps) {
  const { value, options } = useShadcnLang();
  const resolvedLabel = options.find((o) => o.value === value)?.label ?? value;

  return (
    <>
      <DropdownMenuLabel className={cn("flex flex-col gap-0.5", className)}>
        <span className="text-muted-foreground text-xs font-normal">{label}</span>
        <span className="text-foreground text-sm font-bold">{resolvedLabel}</span>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
    </>
  );
}

function ShadcnOptionItem({ value, label, href, external, className }: LanguageSwitcherOptionItemProps) {
  const ctx = useShadcnLang();
  const isSelected = ctx.value === value;
  const option: LanguageOption = { value, label, href, external };

  if (href) {
    return (
      <DropdownMenuItem asChild className={className}>
        <a
          href={href}
          lang={value}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          onClick={() => {
            if (!external) ctx.setValue(value, option);
          }}
        >
          <span className="flex-1">{label}</span>
          {external && <ExternalLink className="size-4 opacity-60" aria-hidden />}
          {isSelected && !external && <Check className="size-4" aria-hidden />}
        </a>
      </DropdownMenuItem>
    );
  }

  return (
    <DropdownMenuItem
      lang={value}
      className={cn(isSelected && "font-medium", className)}
      onSelect={() => ctx.setValue(value, option)}
    >
      <span className="flex-1">{label}</span>
      {isSelected && <Check className="size-4" aria-hidden />}
    </DropdownMenuItem>
  );
}

function ShadcnOptionList({ className: _className }: LanguageSwitcherOptionListProps) {
  const { options } = useShadcnLang();
  return (
    <>
      {options.map((opt) => (
        <ShadcnOptionItem key={opt.value} value={opt.value} label={opt.label} href={opt.href} external={opt.external} />
      ))}
    </>
  );
}

// ─── Dispatched compound parts (public surface preserved) ───────────────────────

function Root(props: LanguageSwitcherProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsLanguageSwitcher {...props} />;
  return <ShadcnRoot {...props} />;
}

function Trigger(props: LanguageSwitcherTriggerProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsLanguageSwitcher.Trigger {...props} />;
  return <ShadcnTrigger {...props} />;
}

function Menu(props: LanguageSwitcherMenuProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsLanguageSwitcher.Menu {...props} />;
  return <ShadcnMenu {...props} />;
}

function Current(props: LanguageSwitcherCurrentProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsLanguageSwitcher.Current {...props} />;
  return <ShadcnCurrent {...props} />;
}

function OptionList(props: LanguageSwitcherOptionListProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsLanguageSwitcher.OptionList {...props} />;
  return <ShadcnOptionList {...props} />;
}

function OptionItem(props: LanguageSwitcherOptionItemProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsLanguageSwitcher.OptionItem {...props} />;
  return <ShadcnOptionItem {...props} />;
}

const LanguageSwitcher = Object.assign(Root, {
  Root,
  Trigger,
  Menu,
  Current,
  OptionList,
  OptionItem
});

export { LanguageSwitcher };

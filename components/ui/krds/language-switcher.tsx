// rsc:client
"use client";

import * as React from "react";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/cn";

// ─── Context ──────────────────────────────────────────────────────────────────

type LanguageSwitcherContextType = {
  value: string;
  onSelect: (value: string) => void;
};

const LanguageSwitcherContext = React.createContext<LanguageSwitcherContextType | null>(null);

function useLanguageSwitcherContext() {
  const ctx = React.useContext(LanguageSwitcherContext);
  if (!ctx) throw new Error("LanguageSwitcherOption must be inside <LanguageSwitcher>");
  return ctx;
}

// ─── Types ────────────────────────────────────────────────────────────────────

type LanguageSwitcherProps = Omit<React.ComponentProps<"button">, "value" | "defaultValue"> & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
};

type LanguageSwitcherOptionProps = {
  value: string;
  children: React.ReactNode;
  className?: string;
};

// ─── LanguageSwitcher ─────────────────────────────────────────────────────────

function LanguageSwitcher({
  value,
  defaultValue = "ko",
  onValueChange,
  open,
  defaultOpen,
  onOpenChange,
  className,
  children,
  ...props
}: LanguageSwitcherProps) {
  const [internalValue, setInternalValue] = React.useState<string>(defaultValue);
  const currentValue = value !== undefined ? value : internalValue;

  // Derive label from matching LanguageSwitcherOption child
  let currentLabel = currentValue;
  React.Children.forEach(children, (child) => {
    if (
      React.isValidElement<LanguageSwitcherOptionProps>(child) &&
      child.props.value === currentValue &&
      typeof child.props.children === "string"
    ) {
      currentLabel = child.props.children;
    }
  });

  function handleSelect(code: string) {
    if (value === undefined) setInternalValue(code);
    onValueChange?.(code);
  }

  return (
    <LanguageSwitcherContext.Provider value={{ value: currentValue, onSelect: handleSelect }}>
      <Popover open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
        <PopoverTrigger asChild>
          <button
            data-slot="krds-language-switcher"
            type="button"
            aria-haspopup="listbox"
            aria-label={`언어 선택: ${currentLabel}`}
            className={cn(
              "inline-flex h-8 items-center gap-1 rounded-md border px-2.5 text-sm font-medium",
              "border-krds-gray-20 bg-krds-gray-0 text-krds-gray-90",
              "hover:bg-krds-gray-5",
              "focus-visible:ring-2 focus-visible:outline-none",
              "focus-visible:ring-krds-primary-50 focus-visible:ring-offset-2",
              className
            )}
            {...props}
          >
            <span>{currentLabel}</span>
            <ChevronDownIcon className="text-krds-gray-50 size-3.5" aria-hidden="true" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          className={cn("w-28 p-1", "bg-krds-gray-0 border-krds-gray-20")}
          align="start"
          sideOffset={4}
        >
          <ul role="listbox" aria-label="언어 선택">
            {children}
          </ul>
        </PopoverContent>
      </Popover>
    </LanguageSwitcherContext.Provider>
  );
}

// ─── LanguageSwitcherOption ───────────────────────────────────────────────────

function LanguageSwitcherOption({ value, children, className }: LanguageSwitcherOptionProps) {
  const { value: selected, onSelect } = useLanguageSwitcherContext();
  const isSelected = selected === value;

  return (
    <li data-slot="krds-language-switcher-option" role="option" aria-selected={isSelected}>
      <button
        type="button"
        onClick={() => onSelect(value)}
        className={cn(
          "flex w-full items-center justify-between rounded-sm px-3 py-1.5 text-sm",
          isSelected
            ? "bg-krds-primary-5 text-krds-primary-50 font-semibold"
            : "text-krds-gray-90 hover:bg-krds-gray-5",
          className
        )}
      >
        {children}
        {isSelected && <CheckIcon className="size-3.5" aria-hidden="true" />}
      </button>
    </li>
  );
}

export { LanguageSwitcher, LanguageSwitcherOption };
export type { LanguageSwitcherProps, LanguageSwitcherOptionProps };

// rsc:client
"use client";

import * as React from "react";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/cn";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface LanguageOption {
  code: string;
  label: string;
}

const DEFAULT_LANGUAGES: LanguageOption[] = [
  { code: "ko", label: "KO" },
  { code: "en", label: "EN" },
  { code: "zh", label: "中" },
  { code: "ja", label: "日" }
];

const FALLBACK_LANGUAGE: LanguageOption = { code: "ko", label: "KO" };

export interface LanguageSwitcherProps {
  languages?: LanguageOption[];
  /** Controlled selected language code. */
  value?: string;
  /** Uncontrolled initial selected language code. */
  defaultValue?: string;
  /** Called when a language is selected. */
  onChange?: (code: string) => void;
  /** Controlled popover open state. */
  open?: boolean;
  /** Uncontrolled popover initial open state. */
  defaultOpen?: boolean;
  /** Called when popover open state changes. */
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

// ─── LanguageSwitcher ─────────────────────────────────────────────────────────

function LanguageSwitcher({
  languages = DEFAULT_LANGUAGES,
  value,
  defaultValue = "ko",
  onChange,
  open,
  defaultOpen,
  onOpenChange,
  className
}: LanguageSwitcherProps) {
  // Uncontrolled internal state; when `value` prop is provided the component is controlled.
  const [internalSelected, setInternalSelected] = React.useState<string>(defaultValue);
  const selected = value !== undefined ? value : internalSelected;
  const current: LanguageOption = languages.find((l) => l.code === selected) ?? languages[0] ?? FALLBACK_LANGUAGE;

  function handleSelect(code: string) {
    if (value === undefined) setInternalSelected(code);
    onChange?.(code);
  }

  return (
    <Popover open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-haspopup="listbox"
          aria-label={`언어 선택: ${current.label}`}
          className={cn(
            "inline-flex h-8 items-center gap-1 rounded-md border px-2.5 text-sm font-medium",
            "border-krds-gray-20 bg-krds-gray-0 text-krds-gray-90",
            "hover:bg-krds-gray-5",
            "focus-visible:ring-2 focus-visible:outline-none",
            "focus-visible:ring-krds-primary-50 focus-visible:ring-offset-2",
            className
          )}
        >
          <span>{current.label}</span>
          <ChevronDownIcon className="text-krds-gray-50 size-3.5" aria-hidden="true" />
        </button>
      </PopoverTrigger>
      <PopoverContent className={cn("w-28 p-1", "bg-krds-gray-0 border-krds-gray-20")} align="start" sideOffset={4}>
        <ul role="listbox" aria-label="언어 선택">
          {languages.map((lang) => {
            const isSelected = lang.code === selected;
            return (
              <li key={lang.code} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  onClick={() => handleSelect(lang.code)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-sm px-3 py-1.5 text-sm",
                    isSelected
                      ? "bg-krds-primary-5 text-krds-primary-50 font-semibold"
                      : "text-krds-gray-90 hover:bg-krds-gray-5"
                  )}
                >
                  {lang.label}
                  {isSelected && <CheckIcon className="size-3.5" aria-hidden="true" />}
                </button>
              </li>
            );
          })}
        </ul>
      </PopoverContent>
    </Popover>
  );
}

export { LanguageSwitcher };

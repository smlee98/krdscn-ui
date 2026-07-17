"use client"

import * as React from "react"

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

export type Language = "en" | "ar" | "he"
export type Direction = "ltr" | "rtl"

export type Translations<T extends Record<string, string> = Record<string, string>> = Record<
  Language,
  {
    dir: Direction
    locale?: string
    values: T
  }
>

const languageOptions = [
  { value: "en", label: "English" },
  { value: "ar", label: "Arabic (العربية)" },
  { value: "he", label: "Hebrew (עברית)" },
] as const

const LanguageContext = React.createContext<{
  language: Language
  setLanguage: (language: Language) => void
} | null>(null)

export function LanguageProvider({
  defaultLanguage = "en",
  children,
}: {
  defaultLanguage?: Language
  children: React.ReactNode
}) {
  const [language, setLanguage] = React.useState<Language>(defaultLanguage)

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>
}

export function useLanguageContext() {
  return React.useContext(LanguageContext)
}

export function useTranslation<T extends Record<string, string>>(
  translations: Translations<T>,
  defaultLanguage: Language = "ar"
) {
  const context = useLanguageContext()
  const [localLanguage, setLocalLanguage] = React.useState<Language>(defaultLanguage)
  const language = context?.language ?? localLanguage
  const setLanguage = context?.setLanguage ?? setLocalLanguage
  const { dir, locale, values: t } = translations[language]

  return { language, setLanguage, dir, locale, t }
}

export function LanguageSelector({
  value,
  onValueChange,
  className,
  languages = ["en", "ar", "he"],
}: {
  value: Language
  onValueChange: (value: Language) => void
  className?: string
  languages?: Language[]
}) {
  return (
    <Select value={value} onValueChange={(value) => onValueChange(value as Language)}>
      <SelectTrigger size="sm" className={cn("w-36", className)} dir="ltr" data-name="language-selector">
        <SelectValue />
      </SelectTrigger>
      <SelectContent dir="ltr" className="data-closed:animate-none data-open:animate-none">
        <SelectGroup>
          {languageOptions
            .filter((option) => languages.includes(option.value))
            .map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

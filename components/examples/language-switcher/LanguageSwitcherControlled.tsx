"use client"

import * as React from "react"
import { LanguageSwitcher } from "@/components/ui/dynamic/language-switcher"

const defaultLanguages = [
  { value: "ko", label: "한국어" },
  { value: "en", label: "English (영어)" },
  { value: "zh", label: "中文 (중국어)" },
  { value: "ja", label: "日本語 (일본어)" },
  {
    value: "fr",
    label: "français (프랑스어)",
    href: "https://www.krds.go.kr/html/site/component/component_10_01.html",
    external: true,
  },
]

export default function LanguageSwitcherControlled() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [selectedLanguage, setSelectedLanguage] = React.useState("ko")
  const currentLabel =
    (
      {
        ko: "현재 언어",
        en: "Current Language",
        zh: "当前语言",
        ja: "現在の言語",
        fr: "Langue actuelle",
      } as Record<string, string>
    )[selectedLanguage] || "현재 언어"

  return (
    <div className="flex w-full max-w-md justify-center py-12">
      <LanguageSwitcher
        value={selectedLanguage}
        options={defaultLanguages}
        open={isOpen}
        onOpenChange={setIsOpen}
        onChange={(val) => setSelectedLanguage(val)}
      >
        <LanguageSwitcher.Trigger label="언어 변경" />
        <LanguageSwitcher.Menu>
          <LanguageSwitcher.Current label={currentLabel} />
          <LanguageSwitcher.OptionList />
        </LanguageSwitcher.Menu>
      </LanguageSwitcher>
    </div>
  )
}

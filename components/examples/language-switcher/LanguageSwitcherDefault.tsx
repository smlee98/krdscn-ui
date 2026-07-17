"use client"

import { LanguageSwitcher } from "@/components/ui/dynamic/language-switcher"

export default function LanguageSwitcherDefault() {
  return (
    <div className="flex w-full max-w-md justify-center py-12">
      <LanguageSwitcher
        defaultValue="ko"
        options={[
          { value: "ko", label: "한국어" },
          { value: "en", label: "English" },
        ]}
        onChange={(val) => console.log(val)}
      >
        <LanguageSwitcher.Trigger label="언어 변경" />
        <LanguageSwitcher.Menu>
          <LanguageSwitcher.Current label="현재 언어" />
          <LanguageSwitcher.OptionList />
        </LanguageSwitcher.Menu>
      </LanguageSwitcher>
    </div>
  )
}

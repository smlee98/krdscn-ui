"use client";

import { LanguageSwitcher } from "@/components/ui/dynamic/language-switcher";

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
];

export default function LanguageSwitcherSimple() {
  return (
    <div className="w-full max-w-md py-12">
      <LanguageSwitcher
        defaultValue="ko"
        options={defaultLanguages}
        onChange={(val) => console.log(val)}
      >
        <LanguageSwitcher.Trigger label="언어 변경" />
        <LanguageSwitcher.Menu>
          <LanguageSwitcher.OptionList />
        </LanguageSwitcher.Menu>
      </LanguageSwitcher>
    </div>
  );
}

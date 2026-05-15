import { LanguageSwitcher, LanguageSwitcherOption } from "@/components/ui/krds/language-switcher";

export default function LanguageSwitcherCompact() {
  return (
    <div className="flex items-center gap-4">
      <LanguageSwitcher defaultValue="ko">
        <LanguageSwitcherOption value="ko">한국어</LanguageSwitcherOption>
        <LanguageSwitcherOption value="en">English</LanguageSwitcherOption>
      </LanguageSwitcher>
      <span className="text-krds-gray-40 text-xs">KO / EN 토글</span>
    </div>
  );
}

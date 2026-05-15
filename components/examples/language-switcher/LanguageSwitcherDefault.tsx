import { LanguageSwitcher, LanguageSwitcherOption } from "@/components/ui/krds/language-switcher";

export default function LanguageSwitcherDefault() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-krds-gray-50 text-xs">언어를 선택하면 드롭다운이 닫히고 선택 상태가 반영됩니다.</p>
      <LanguageSwitcher defaultValue="ko">
        <LanguageSwitcherOption value="ko">한국어</LanguageSwitcherOption>
        <LanguageSwitcherOption value="en">English</LanguageSwitcherOption>
        <LanguageSwitcherOption value="zh">中文</LanguageSwitcherOption>
      </LanguageSwitcher>
    </div>
  );
}

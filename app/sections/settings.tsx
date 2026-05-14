// rsc:client
"use client";

import { useState } from "react";

import { DemoCard, DemoSection, GroupHeading } from "@/components/krds-app/demo-card";
import { LanguageSwitcher, LanguageSwitcherOption } from "@/components/ui/krds/language-switcher";
import { Resize } from "@/components/ui/krds/resize";
import type { ScaleKey } from "@/components/ui/krds/resize";

export function SettingsSection() {
  const [lang, setLang] = useState("ko");
  const [scale, setScale] = useState<ScaleKey>("M");

  return (
    <>
      <GroupHeading>설정</GroupHeading>

      <DemoSection id="language-switcher" title="언어 변경 (Language switcher)">
        <DemoCard title="기본형">
          <div className="flex flex-col gap-3">
            <LanguageSwitcher value={lang} onValueChange={setLang}>
              <LanguageSwitcherOption value="ko">한국어</LanguageSwitcherOption>
              <LanguageSwitcherOption value="en">English</LanguageSwitcherOption>
            </LanguageSwitcher>
            <p className="text-xs text-muted-foreground">
              선택된 언어: {lang === "ko" ? "한국어" : "English"}
            </p>
          </div>
        </DemoCard>
      </DemoSection>

      <DemoSection id="resize" title="화면 크기 조정 (Resize)">
        <DemoCard title="글자 크기 조절">
          <div className="flex flex-col gap-4" data-krds-resize-scope="">
            <Resize
              defaultScale="M"
              onScaleChange={(key) => setScale(key)}
            />
            <p
              className="text-krds-gray-90 leading-relaxed [font-size:calc(1rem*var(--krds-font-scale,1))]"
            >
              정부24는 각종 민원서비스, 보조금·지원금 확인, 공공데이터 제공 등<br />
              다양한 정부 서비스를 한 곳에서 이용할 수 있는 통합 포털입니다.
            </p>
            <p className="text-xs text-muted-foreground">현재 크기: {scale}</p>
          </div>
        </DemoCard>
      </DemoSection>
    </>
  );
}

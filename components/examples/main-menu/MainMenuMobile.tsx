"use client";

import * as React from "react";
import { MainMenu, MainMenuContent, MainMenuItem, MainMenuLink, MainMenuTrigger } from "@/components/ui/krds/main-menu";

export default function MainMenuMobile() {
  const [value, setValue] = React.useState("services");

  return (
    <div className="w-full max-w-sm">
      <p className="text-krds-gray-50 mb-2 text-xs">
        좁은 폭에서 트리거를 눌러 열린 메뉴: <span className="font-medium">{value}</span>
      </p>
      <MainMenu value={value} onValueChange={setValue}>
        <MainMenuItem value="services">
          <MainMenuTrigger>서비스</MainMenuTrigger>
          <MainMenuContent>
            <div className="grid w-64 gap-1 p-3">
              <MainMenuLink href="/services/民원">민원 신청</MainMenuLink>
              <MainMenuLink href="/services/document">증명서 발급</MainMenuLink>
              <MainMenuLink href="/services/welfare">복지 안내</MainMenuLink>
            </div>
          </MainMenuContent>
        </MainMenuItem>
        <MainMenuItem value="news">
          <MainMenuTrigger>소식</MainMenuTrigger>
          <MainMenuContent>
            <div className="grid w-64 gap-1 p-3">
              <MainMenuLink href="/news/notice">공지사항</MainMenuLink>
              <MainMenuLink href="/news/press">보도자료</MainMenuLink>
            </div>
          </MainMenuContent>
        </MainMenuItem>
      </MainMenu>
    </div>
  );
}

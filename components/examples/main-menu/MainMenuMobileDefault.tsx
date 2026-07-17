"use client"

import {
  MainMenuMobile,
  MainMenuMobileBody,
  MainMenuMobileBottom,
  MainMenuMobileBottomLink,
  MainMenuMobileClose,
  MainMenuMobileContent,
  MainMenuMobileDepth3,
  MainMenuMobileDepth3Item,
  MainMenuMobileDepth4Item,
  MainMenuMobileDepth4Panel,
  MainMenuMobileHeader,
  MainMenuMobileLogin,
  MainMenuMobileMenu,
  MainMenuMobileSearch,
  MainMenuMobileServiceMenu,
  MainMenuMobileServiceMenuItem,
  MainMenuMobileSubItem,
  MainMenuMobileSubmenu,
  MainMenuMobileSubmenuList,
  MainMenuMobileTab,
  MainMenuMobileTabList,
  MainMenuMobileTrigger,
  MainMenuMobileUtilItem,
  MainMenuMobileUtilList,
} from "@/registry/krds/ui/main-menu-mobile"
import { Bell, FileText, Grid2x2, HelpCircle, LogIn } from "lucide-react"

export default function MainMenuMobileDefault() {
  return (
    <MainMenuMobile defaultOpen={false}>
      <MainMenuMobileTrigger />
      <MainMenuMobileContent defaultActiveTab="policy" title="전체메뉴">
        <MainMenuMobileClose />
        <MainMenuMobileHeader>
          <MainMenuMobileUtilList>
            <MainMenuMobileUtilItem href="#">사이트맵</MainMenuMobileUtilItem>
            <MainMenuMobileUtilItem href="#">ENGLISH</MainMenuMobileUtilItem>
          </MainMenuMobileUtilList>
          <MainMenuMobileLogin href="#">
            <LogIn className="size-5" aria-hidden="true" />
            로그인을 해주세요
          </MainMenuMobileLogin>
          <MainMenuMobileServiceMenu>
            <MainMenuMobileServiceMenuItem href="#" icon={<Grid2x2 className="size-5" aria-hidden="true" />}>
              전체서비스
            </MainMenuMobileServiceMenuItem>
            <MainMenuMobileServiceMenuItem href="#" icon={<FileText className="size-5" aria-hidden="true" />}>
              민원신청
            </MainMenuMobileServiceMenuItem>
            <MainMenuMobileServiceMenuItem href="#" icon={<Bell className="size-5" aria-hidden="true" />}>
              알림마당
            </MainMenuMobileServiceMenuItem>
            <MainMenuMobileServiceMenuItem href="#" icon={<HelpCircle className="size-5" aria-hidden="true" />}>
              질문
            </MainMenuMobileServiceMenuItem>
          </MainMenuMobileServiceMenu>
          <MainMenuMobileSearch onSearch={() => {}} />
        </MainMenuMobileHeader>

        <MainMenuMobileBody>
          <MainMenuMobileMenu>
            <MainMenuMobileTabList>
              <MainMenuMobileTab value="policy">정책정보</MainMenuMobileTab>
              <MainMenuMobileTab value="service">서비스</MainMenuMobileTab>
              <MainMenuMobileTab value="notice">공지사항</MainMenuMobileTab>
            </MainMenuMobileTabList>

            <MainMenuMobileSubmenuList>
              <MainMenuMobileSubmenu value="policy" title="정책정보">
                <MainMenuMobileSubItem href="#">주요정책</MainMenuMobileSubItem>
                <MainMenuMobileSubItem href="#" selected>
                  분야별정보
                </MainMenuMobileSubItem>
                <MainMenuMobileDepth3 trigger="법령정보">
                  <MainMenuMobileDepth3Item href="#">법령</MainMenuMobileDepth3Item>
                  <MainMenuMobileDepth3Item href="#">행정규칙</MainMenuMobileDepth3Item>
                  <MainMenuMobileDepth3Item depth4="notice-more">전체보기</MainMenuMobileDepth3Item>
                </MainMenuMobileDepth3>
              </MainMenuMobileSubmenu>

              <MainMenuMobileSubmenu value="service" title="서비스">
                <MainMenuMobileSubItem href="#">민원서비스</MainMenuMobileSubItem>
                <MainMenuMobileSubItem href="#">증명서발급</MainMenuMobileSubItem>
              </MainMenuMobileSubmenu>

              <MainMenuMobileSubmenu value="notice" title="공지사항">
                <MainMenuMobileSubItem href="#">공지사항</MainMenuMobileSubItem>
                <MainMenuMobileSubItem href="#">보도자료</MainMenuMobileSubItem>
              </MainMenuMobileSubmenu>
            </MainMenuMobileSubmenuList>
          </MainMenuMobileMenu>

          <MainMenuMobileBottom>
            <MainMenuMobileBottomLink href="#">이용안내</MainMenuMobileBottomLink>
            <MainMenuMobileBottomLink href="#" external>
              열린정부포털
            </MainMenuMobileBottomLink>
          </MainMenuMobileBottom>
        </MainMenuMobileBody>

        <MainMenuMobileDepth4Panel value="notice-more" title="법령정보 전체보기">
          <MainMenuMobileDepth4Item href="#">법령</MainMenuMobileDepth4Item>
          <MainMenuMobileDepth4Item href="#">행정규칙</MainMenuMobileDepth4Item>
          <MainMenuMobileDepth4Item href="#">자치법규</MainMenuMobileDepth4Item>
          <MainMenuMobileDepth4Item href="#">판례</MainMenuMobileDepth4Item>
        </MainMenuMobileDepth4Panel>
      </MainMenuMobileContent>
    </MainMenuMobile>
  )
}

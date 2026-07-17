import { MainMenu, MainMenuBar, MainMenuBarItem } from "@/registry/krds/ui/main-menu"

export default function MainMenuDefault() {
  return (
    <MainMenu className="w-full">
      <MainMenuBar aria-label="주요 메뉴">
        <MainMenuBarItem href="#" hasSubmenu>
          정책정보
        </MainMenuBarItem>
        <MainMenuBarItem href="#" hasSubmenu>
          서비스
        </MainMenuBarItem>
        <MainMenuBarItem href="#">공지사항</MainMenuBarItem>
      </MainMenuBar>
    </MainMenu>
  )
}

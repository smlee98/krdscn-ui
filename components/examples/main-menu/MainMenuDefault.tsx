import { MainMenu, MainMenuBar, MainMenuBarItem } from "@/components/ui/dynamic/main-menu";

export default function MainMenuDefault() {
  return (
    <MainMenu>
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
  );
}

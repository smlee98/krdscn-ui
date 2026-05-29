import {
  MainMenu,
  MainMenuBar,
  MainMenuBarItem,
  MainMenuColumn,
  MainMenuLink,
  MainMenuPanel,
  MainMenuPanelHeader,
  MainMenuPanelShortcut,
  MainMenuPanelSidebar,
  MainMenuSidebarItem
} from "@/components/ui/dynamic/main-menu";

export default function MainMenuWithPanel() {
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
      <MainMenuPanel className="items-stretch">
        <MainMenuPanelSidebar>
          <MainMenuSidebarItem href="#">정책정보</MainMenuSidebarItem>
          <MainMenuSidebarItem href="#" active>
            서비스
          </MainMenuSidebarItem>
        </MainMenuPanelSidebar>
        <div className="bg-krds-gray-0 flex flex-1 flex-col gap-4 px-10 py-4">
          <div className="flex w-full items-center gap-4">
            <MainMenuPanelHeader>서비스</MainMenuPanelHeader>
            <MainMenuPanelShortcut href="#">바로가기</MainMenuPanelShortcut>
          </div>
          <div className="flex w-full items-start gap-6">
            <MainMenuColumn>
              <MainMenuLink href="#">알림</MainMenuLink>
              <MainMenuLink href="#">자료실</MainMenuLink>
              <MainMenuLink href="#">공지사항</MainMenuLink>
            </MainMenuColumn>
          </div>
        </div>
      </MainMenuPanel>
    </MainMenu>
  );
}

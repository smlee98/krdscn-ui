import { MainMenu, MainMenuContent, MainMenuItem, MainMenuLink, MainMenuTrigger } from "@/components/ui/krds/main-menu";

export default function MainMenuWithDropdown() {
  return (
    <MainMenu defaultValue="policy">
      <MainMenuItem value="policy">
        <MainMenuTrigger>정책</MainMenuTrigger>
        <MainMenuContent>
          <div className="grid gap-1 p-3 md:w-80 md:grid-cols-2">
            <MainMenuLink href="/policy/welfare">복지</MainMenuLink>
            <MainMenuLink href="/policy/education">교육</MainMenuLink>
            <MainMenuLink href="/policy/labor">고용·노동</MainMenuLink>
            <MainMenuLink href="/policy/economy">경제</MainMenuLink>
            <MainMenuLink href="/policy/environment">환경</MainMenuLink>
            <MainMenuLink href="/policy/safety">안전</MainMenuLink>
          </div>
        </MainMenuContent>
      </MainMenuItem>
      <MainMenuItem value="data">
        <MainMenuTrigger>데이터</MainMenuTrigger>
        <MainMenuContent>
          <div className="grid gap-1 p-3 md:w-72">
            <MainMenuLink href="/data/open">공공데이터 포털</MainMenuLink>
            <MainMenuLink href="/data/stats">국가통계</MainMenuLink>
            <MainMenuLink href="/data/api">API 가이드</MainMenuLink>
          </div>
        </MainMenuContent>
      </MainMenuItem>
      <MainMenuItem value="support">
        <MainMenuLink href="/support">고객지원</MainMenuLink>
      </MainMenuItem>
    </MainMenu>
  );
}

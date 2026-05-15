import { MainMenu, MainMenuContent, MainMenuItem, MainMenuLink, MainMenuTrigger } from "@/components/ui/krds/main-menu";

export default function MainMenuDefault() {
  return (
    <MainMenu>
      <MainMenuItem value="home">
        <MainMenuLink href="/">홈</MainMenuLink>
      </MainMenuItem>
      <MainMenuItem value="services">
        <MainMenuTrigger>서비스</MainMenuTrigger>
        <MainMenuContent>
          <div className="grid gap-1 p-3 md:w-72">
            <MainMenuLink href="/services/民원">민원 신청</MainMenuLink>
            <MainMenuLink href="/services/document">증명서 발급</MainMenuLink>
            <MainMenuLink href="/services/welfare">복지 안내</MainMenuLink>
          </div>
        </MainMenuContent>
      </MainMenuItem>
      <MainMenuItem value="news">
        <MainMenuLink href="/news">소식</MainMenuLink>
      </MainMenuItem>
      <MainMenuItem value="contact">
        <MainMenuLink href="/contact">문의</MainMenuLink>
      </MainMenuItem>
    </MainMenu>
  );
}

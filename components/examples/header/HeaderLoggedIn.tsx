import { LogOut, Search, User } from "lucide-react";
import {
  Header,
  HeaderActionItem,
  HeaderActions,
  HeaderBrand,
  HeaderNav,
  HeaderNavItem,
  HeaderUtility,
  HeaderUtilityDivider,
  HeaderUtilityItem
} from "@/components/ui/dynamic/header";

export default function HeaderLoggedIn() {
  return (
    <Header className="w-full">
      <HeaderUtility>
        <HeaderUtilityItem href="#">KRDS 소개</HeaderUtilityItem>
        <HeaderUtilityDivider />
        <HeaderUtilityItem asSelect>사용자 지원</HeaderUtilityItem>
      </HeaderUtility>
      <HeaderBrand href="/">KRDS</HeaderBrand>
      <HeaderActions>
        <HeaderActionItem icon={<Search />}>검색</HeaderActionItem>
        <HeaderActionItem icon={<User />} href="#">
          홍길동님
        </HeaderActionItem>
        <HeaderActionItem icon={<LogOut />} href="#">
          로그아웃
        </HeaderActionItem>
      </HeaderActions>
      <HeaderNav aria-label="주요 메뉴">
        <HeaderNavItem href="#" hasSubmenu>
          디자인 시스템
        </HeaderNavItem>
        <HeaderNavItem href="#" hasSubmenu>
          자료실
        </HeaderNavItem>
        <HeaderNavItem href="#">정책</HeaderNavItem>
      </HeaderNav>
    </Header>
  );
}

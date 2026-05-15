import {
  Header,
  HeaderActionButton,
  HeaderActions,
  HeaderBrand,
  HeaderNav,
  HeaderNavItem
} from "@/components/ui/krds/header";

export default function HeaderDefault() {
  return (
    <Header>
      <HeaderBrand href="/">정부24</HeaderBrand>
      <HeaderActions>
        <HeaderActionButton>로그인</HeaderActionButton>
        <HeaderActionButton>회원가입</HeaderActionButton>
      </HeaderActions>
      <HeaderNav>
        <HeaderNavItem href="#">서비스 안내</HeaderNavItem>
        <HeaderNavItem href="#">민원 신청</HeaderNavItem>
        <HeaderNavItem href="#">정보 공개</HeaderNavItem>
        <HeaderNavItem href="#">고객 지원</HeaderNavItem>
      </HeaderNav>
    </Header>
  );
}

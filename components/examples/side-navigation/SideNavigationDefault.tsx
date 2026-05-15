import { SideNavigation, SideNavigationGroupLabel, SideNavigationItem } from "@/components/ui/krds/side-navigation";

export default function SideNavigationDefault() {
  return (
    <SideNavigation>
      <SideNavigationGroupLabel>시작하기</SideNavigationGroupLabel>
      <SideNavigationItem href="#install">설치</SideNavigationItem>
      <SideNavigationItem href="#quickstart" active>
        빠른 시작
      </SideNavigationItem>
      <SideNavigationGroupLabel>가이드</SideNavigationGroupLabel>
      <SideNavigationItem href="#tokens">디자인 토큰</SideNavigationItem>
      <SideNavigationItem href="#components">컴포넌트</SideNavigationItem>
      <SideNavigationItem href="#a11y">접근성</SideNavigationItem>
    </SideNavigation>
  );
}

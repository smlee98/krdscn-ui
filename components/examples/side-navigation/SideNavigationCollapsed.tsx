import {
  SideNavigation,
  SideNavigationGroup,
  SideNavigationGroupLabel,
  SideNavigationItem
} from "@/components/ui/krds/side-navigation";

export default function SideNavigationCollapsed() {
  return (
    <SideNavigation>
      <SideNavigationGroup defaultOpen>
        <SideNavigationGroupLabel>컴포넌트</SideNavigationGroupLabel>
        <SideNavigationItem href="#button" active>
          버튼
        </SideNavigationItem>
        <SideNavigationItem href="#link">링크</SideNavigationItem>
        <SideNavigationItem href="#input">입력</SideNavigationItem>
      </SideNavigationGroup>
      <SideNavigationGroup defaultOpen={false}>
        <SideNavigationGroupLabel>패턴</SideNavigationGroupLabel>
        <SideNavigationItem href="#form">폼</SideNavigationItem>
        <SideNavigationItem href="#search">검색</SideNavigationItem>
      </SideNavigationGroup>
      <SideNavigationGroup defaultOpen={false}>
        <SideNavigationGroupLabel>리소스</SideNavigationGroupLabel>
        <SideNavigationItem href="#changelog">변경 이력</SideNavigationItem>
        <SideNavigationItem href="#license">라이선스</SideNavigationItem>
      </SideNavigationGroup>
    </SideNavigation>
  );
}

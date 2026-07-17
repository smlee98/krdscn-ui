import {
  SideNavigation,
  SideNavigationGroup,
  SideNavigationItem,
  SideNavigationList,
  SideNavigationTitle,
  SideNavigationTrigger,
} from "@/registry/krds/ui/side-navigation"

export default function SideNavigationWithPopupOnly() {
  return (
    <SideNavigation className="w-full">
      <SideNavigationTitle>팝업 메뉴 예시</SideNavigationTitle>
      <SideNavigationGroup defaultOpen>
        <SideNavigationTrigger>상위 메뉴</SideNavigationTrigger>
        <SideNavigationList>
          <SideNavigationItem href="#">일반 링크</SideNavigationItem>
        </SideNavigationList>
      </SideNavigationGroup>
    </SideNavigation>
  )
}

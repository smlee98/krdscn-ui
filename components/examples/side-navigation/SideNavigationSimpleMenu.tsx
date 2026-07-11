import {
  SideNavigation,
  SideNavigationBackTitle,
  SideNavigationItem,
  SideNavigationList,
} from "@/components/ui/dynamic/side-navigation"

export default function SideNavigationSimpleMenu() {
  return (
    <SideNavigation className="w-full">
      <SideNavigationBackTitle href="#">메뉴 제목</SideNavigationBackTitle>
      <SideNavigationList bordered>
        <SideNavigationItem href="#" active>
          하위 메뉴 1
        </SideNavigationItem>
        <SideNavigationItem href="#">하위 메뉴 2</SideNavigationItem>
        <SideNavigationItem href="#">하위 메뉴 3</SideNavigationItem>
      </SideNavigationList>
    </SideNavigation>
  )
}

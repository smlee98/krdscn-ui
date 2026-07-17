import {
  SideNavigation,
  SideNavigationGroup,
  SideNavigationItem,
  SideNavigationList,
  SideNavigationTitle,
  SideNavigationTrigger,
} from "@/registry/krds/ui/side-navigation"

export default function SideNavigationDefault() {
  return (
    <SideNavigation className="w-full">
      <SideNavigationTitle>1Depth-title</SideNavigationTitle>
      <SideNavigationGroup defaultOpen>
        <SideNavigationTrigger>2Depth-menu</SideNavigationTrigger>
        <SideNavigationList>
          <SideNavigationItem href="#" active>
            3Depth-link
          </SideNavigationItem>
          <SideNavigationItem href="#">3Depth-link</SideNavigationItem>
        </SideNavigationList>
      </SideNavigationGroup>
      <SideNavigationGroup>
        <SideNavigationTrigger>2Depth-menu</SideNavigationTrigger>
      </SideNavigationGroup>
      <SideNavigationGroup>
        <SideNavigationTrigger>2Depth-menu</SideNavigationTrigger>
      </SideNavigationGroup>
    </SideNavigation>
  )
}

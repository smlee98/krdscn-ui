"use client"

import * as React from "react"
import {
  SideNavigation,
  SideNavigationBackTitle,
  SideNavigationGroup,
  SideNavigationItem,
  SideNavigationList,
  SideNavigationPopup,
  SideNavigationPopupGroup,
  SideNavigationPopupItem,
  SideNavigationPopupList,
  SideNavigationPopupTrigger,
  SideNavigationTitle,
  SideNavigationTrigger,
} from "@/registry/krds/ui/side-navigation"

export default function SideNavigationFourDepth() {
  const [popupOpen, setPopupOpen] = React.useState(true)

  return (
    <SideNavigation className="w-full">
      <SideNavigationTitle>1Depth-title</SideNavigationTitle>
      <SideNavigationGroup defaultOpen>
        <SideNavigationTrigger>2Depth-menu</SideNavigationTrigger>
        <SideNavigationList>
          <SideNavigationPopupGroup open={popupOpen} onOpenChange={setPopupOpen}>
            <SideNavigationPopupTrigger>3Depth-menu</SideNavigationPopupTrigger>
            <SideNavigationPopup>
              <SideNavigationBackTitle onBack={() => setPopupOpen(false)}>3Depth-title</SideNavigationBackTitle>
              <SideNavigationPopupList>
                <SideNavigationPopupItem href="#" active>
                  4Depth
                </SideNavigationPopupItem>
                <SideNavigationPopupItem href="#">4Depth</SideNavigationPopupItem>
                <SideNavigationPopupItem href="#">4Depth</SideNavigationPopupItem>
              </SideNavigationPopupList>
            </SideNavigationPopup>
          </SideNavigationPopupGroup>
          <SideNavigationItem href="#">3Depth-link</SideNavigationItem>
        </SideNavigationList>
      </SideNavigationGroup>
    </SideNavigation>
  )
}

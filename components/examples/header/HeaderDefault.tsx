import { LogIn, Menu, Search, User, UserPlus } from "lucide-react"
import { KrdsLogo } from "@/components/logo/krds"
import {
  Header,
  HeaderActionDropdown,
  HeaderActionItem,
  HeaderActions,
  HeaderBrand,
  HeaderNav,
  HeaderNavItem,
  HeaderUtility,
  HeaderUtilityDivider,
  HeaderUtilityDropdown,
  HeaderUtilityDropdownItem,
  HeaderUtilityItem,
} from "@/components/ui/dynamic/header"

export default function HeaderDefault() {
  return (
    <Header className="w-full">
      <HeaderUtility>
        <HeaderUtilityItem href="#">KRDS 소개</HeaderUtilityItem>
        <HeaderUtilityDivider />
        <HeaderUtilityDropdown label="사용자 지원">
          <HeaderUtilityDropdownItem href="#">이용안내</HeaderUtilityDropdownItem>
          <HeaderUtilityDropdownItem href="#">자주 묻는 질문</HeaderUtilityDropdownItem>
          <HeaderUtilityDropdownItem href="#">고객센터</HeaderUtilityDropdownItem>
        </HeaderUtilityDropdown>
      </HeaderUtility>
      <HeaderBrand href="/">
        <span className="bg-krds-surface border-krds-border-light flex size-7 items-center justify-center rounded-md border">
          <KrdsLogo aria-hidden="true" />
        </span>
        krdscn/ui
      </HeaderBrand>
      <HeaderActions>
        <HeaderActionItem icon={<Search />}>통합검색</HeaderActionItem>
        <HeaderActionItem href="#" icon={<LogIn />}>
          로그인
        </HeaderActionItem>
        <HeaderActionItem icon={<UserPlus />}>회원가입</HeaderActionItem>
        <HeaderActionDropdown label="나의GOV" icon={<User />}>
          <ul className="flex flex-col gap-1">
            <li>
              <a
                href="#"
                className="text-krds-foreground text-krds-body-md hover:bg-krds-surface-secondary-subtle focus-visible:krds-focus-ring flex items-center rounded-md px-3 py-2"
              >
                나의 GOV 홈
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-krds-foreground text-krds-body-md hover:bg-krds-surface-secondary-subtle focus-visible:krds-focus-ring flex items-center rounded-md px-3 py-2"
              >
                나의 신청내역
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-krds-foreground text-krds-body-md hover:bg-krds-surface-secondary-subtle focus-visible:krds-focus-ring flex items-center rounded-md px-3 py-2"
              >
                나의 정보관리
              </a>
            </li>
          </ul>
        </HeaderActionDropdown>
        <HeaderActionItem icon={<Menu />} aria-controls="krds-all-menu">
          전체메뉴
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
  )
}

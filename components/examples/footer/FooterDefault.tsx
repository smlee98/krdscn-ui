import { siInstagram, siYoutube, siX, siFacebook, siNaver } from "simple-icons"
import {
  Footer,
  FooterAddress,
  FooterBottom,
  FooterContact,
  FooterContactItem,
  FooterCopyright,
  FooterInfo,
  FooterLinkAction,
  FooterLinkActions,
  FooterLinks,
  FooterLogo,
  FooterMenu,
  FooterMenuLink,
  FooterQuick,
  FooterQuickLink,
  FooterSns,
  FooterSnsLink,
} from "@/registry/krds/ui/footer"
import { Identifier } from "@/registry/krds/ui/identifier"

function BrandIcon({ icon }: { icon: { path: string } }) {
  return (
    <svg role="img" viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden="true">
      <path d={icon.path} />
    </svg>
  )
}

export default function FooterDefault() {
  return (
    <Footer className="w-full">
      <FooterQuick>
        <FooterQuickLink>관련 사이트 1</FooterQuickLink>
        <FooterQuickLink>관련 사이트 2</FooterQuickLink>
        <FooterQuickLink>관련 사이트 3</FooterQuickLink>
        <FooterQuickLink>관련 사이트 4</FooterQuickLink>
      </FooterQuick>
      <div className="mx-auto flex max-w-[1200px] flex-col gap-9 px-4 py-10">
        <FooterLogo>
          국민건강보험공단
          <span className="sr-only">KRDS - Korea Design System</span>
        </FooterLogo>
        <div className="flex flex-col gap-7 lg:flex-row lg:justify-between">
          <FooterInfo>
            <FooterAddress>(26464) 강원특별자치도 원주시 건강로 32(반곡동) 국민건강보험공단</FooterAddress>
            <FooterContact>
              <FooterContactItem label="대표전화 1577-1000" note="(유료, 평일 09시~18시)" />
              <FooterContactItem label="해외이용 82-33-811-2001" note="(유료, 평일 09시~18시)" />
            </FooterContact>
          </FooterInfo>
          <FooterLinks>
            <FooterLinkActions>
              <FooterLinkAction href="#">찾아오시는 길</FooterLinkAction>
              <FooterLinkAction href="#">이용안내</FooterLinkAction>
              <FooterLinkAction href="#">직원검색</FooterLinkAction>
            </FooterLinkActions>
            <FooterSns>
              <FooterSnsLink href="#" label="인스타그램">
                <BrandIcon icon={siInstagram} />
              </FooterSnsLink>
              <FooterSnsLink href="#" label="유튜브">
                <BrandIcon icon={siYoutube} />
              </FooterSnsLink>
              <FooterSnsLink href="#" label="X">
                <BrandIcon icon={siX} />
              </FooterSnsLink>
              <FooterSnsLink href="#" label="페이스북">
                <BrandIcon icon={siFacebook} />
              </FooterSnsLink>
              <FooterSnsLink href="#" label="블로그">
                <BrandIcon icon={siNaver} />
              </FooterSnsLink>
            </FooterSns>
          </FooterLinks>
        </div>
        <FooterBottom>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <FooterMenu>
              <FooterMenuLink href="#" point>
                개인정보처리방침
              </FooterMenuLink>
              <FooterMenuLink href="#">저작권 정책</FooterMenuLink>
              <FooterMenuLink href="#">웹 접근성 품질인증 마크 획득</FooterMenuLink>
            </FooterMenu>
            <FooterCopyright>© 2023 National Health Insurance Service. All rights reserved.</FooterCopyright>
          </div>
          <Identifier notice="이 누리집은 보건복지부 누리집입니다." />
        </FooterBottom>
      </div>
    </Footer>
  )
}

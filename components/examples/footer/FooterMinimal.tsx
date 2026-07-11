import {
  Footer,
  FooterAddress,
  FooterBottom,
  FooterCopyright,
  FooterInfo,
  FooterLogo,
  FooterMenu,
  FooterMenuLink,
} from "@/components/ui/dynamic/footer"

export default function FooterMinimal() {
  return (
    <Footer className="w-full">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-9 px-4 py-10">
        <FooterLogo>국민건강보험공단</FooterLogo>
        <FooterInfo>
          <FooterAddress>(26464) 강원특별자치도 원주시 건강로 32(반곡동) 국민건강보험공단</FooterAddress>
        </FooterInfo>
        <FooterBottom>
          <FooterMenu>
            <FooterMenuLink href="#" point>
              개인정보처리방침
            </FooterMenuLink>
            <FooterMenuLink href="#">저작권 정책</FooterMenuLink>
          </FooterMenu>
          <FooterCopyright>© 2023 National Health Insurance Service. All rights reserved.</FooterCopyright>
        </FooterBottom>
      </div>
    </Footer>
  )
}

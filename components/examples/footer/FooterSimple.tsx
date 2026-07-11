import { Footer, FooterCopyright, FooterLogo } from "@/components/ui/dynamic/footer"

export default function FooterSimple() {
  return (
    <Footer className="w-full">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-3 px-4 py-8">
        <FooterLogo>국민건강보험공단</FooterLogo>
        <FooterCopyright>© 2023 National Health Insurance Service. All rights reserved.</FooterCopyright>
      </div>
    </Footer>
  )
}

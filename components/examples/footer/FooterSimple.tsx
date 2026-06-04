import { Footer, FooterCopyright, FooterOrg } from "@/components/ui/dynamic/footer";

export default function FooterSimple() {
  return (
    <Footer className="w-full">
      <FooterOrg>국민건강보험공단</FooterOrg>
      <FooterCopyright>© 2023 National Health Insurance Service. All rights reserved.</FooterCopyright>
    </Footer>
  );
}

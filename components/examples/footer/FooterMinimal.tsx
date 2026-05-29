import {
  Footer,
  FooterCopyright,
  FooterLink,
  FooterColumnLinks,
  FooterOrg
} from "@/components/ui/dynamic/footer";

export default function FooterMinimal() {
  return (
    <Footer>
      <FooterOrg>국민건강보험공단</FooterOrg>
      <FooterColumnLinks>
        <FooterLink href="#">개인정보처리방침</FooterLink>
      </FooterColumnLinks>
      <FooterCopyright>© 2023 National Health Insurance Service. All rights reserved.</FooterCopyright>
    </Footer>
  );
}

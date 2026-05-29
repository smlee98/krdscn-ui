import {
  Footer,
  FooterColumn,
  FooterColumnLinks,
  FooterColumnTitle,
  FooterColumns,
  FooterCopyright,
  FooterLink,
  FooterOrg
} from "@/components/ui/dynamic/footer";

export default function FooterDefault() {
  return (
    <Footer>
      <FooterOrg>국민건강보험공단</FooterOrg>
      <FooterColumns>
        <FooterColumn>
          <FooterColumnTitle>관련 링크</FooterColumnTitle>
          <FooterColumnLinks>
            <FooterLink href="#">찾아오시는 길</FooterLink>
            <FooterLink href="#">이용안내</FooterLink>
            <FooterLink href="#">직원검색</FooterLink>
          </FooterColumnLinks>
        </FooterColumn>
        <FooterColumn>
          <FooterColumnTitle>정책</FooterColumnTitle>
          <FooterColumnLinks>
            <FooterLink href="#">개인정보처리방침</FooterLink>
            <FooterLink href="#">저작권 정책</FooterLink>
            <FooterLink href="#">웹 접근성 품질인증 마크 획득</FooterLink>
          </FooterColumnLinks>
        </FooterColumn>
        <FooterColumn>
          <FooterColumnTitle>관련사이트</FooterColumnTitle>
          <FooterColumnLinks>
            <FooterLink href="#">관련사이트1</FooterLink>
            <FooterLink href="#">관련사이트2</FooterLink>
            <FooterLink href="#">관련사이트3</FooterLink>
          </FooterColumnLinks>
        </FooterColumn>
      </FooterColumns>
      <FooterCopyright>© 2023 National Health Insurance Service. All rights reserved.</FooterCopyright>
    </Footer>
  );
}

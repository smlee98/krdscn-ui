import {
  Footer,
  FooterColumn,
  FooterColumnLinks,
  FooterColumnTitle,
  FooterColumns,
  FooterCopyright,
  FooterLink,
  FooterOrg
} from "@/components/ui/krds/footer";

export default function FooterDefault() {
  return (
    <Footer>
      <FooterOrg>행정안전부</FooterOrg>
      <FooterColumns>
        <FooterColumn>
          <FooterColumnTitle>서비스</FooterColumnTitle>
          <FooterColumnLinks>
            <FooterLink href="#">민원 서비스</FooterLink>
            <FooterLink href="#">전자민원창구</FooterLink>
            <FooterLink href="#">공공데이터</FooterLink>
          </FooterColumnLinks>
        </FooterColumn>
        <FooterColumn>
          <FooterColumnTitle>정책</FooterColumnTitle>
          <FooterColumnLinks>
            <FooterLink href="#">개인정보처리방침</FooterLink>
            <FooterLink href="#">이용약관</FooterLink>
            <FooterLink href="#">접근성 정책</FooterLink>
          </FooterColumnLinks>
        </FooterColumn>
        <FooterColumn>
          <FooterColumnTitle>고객지원</FooterColumnTitle>
          <FooterColumnLinks>
            <FooterLink href="#">FAQ</FooterLink>
            <FooterLink href="#">문의하기</FooterLink>
            <FooterLink href="#">사이트맵</FooterLink>
          </FooterColumnLinks>
        </FooterColumn>
      </FooterColumns>
      <FooterCopyright>Copyright © 행정안전부. All rights reserved.</FooterCopyright>
    </Footer>
  );
}

// rsc:client
"use client";

import { DemoCard, DemoSection, GroupHeading } from "@/components/krds-app/demo-card";
import { Masthead } from "@/components/ui/krds/masthead";
import { Identifier, IdentifierOrg, IdentifierLinks, IdentifierLink } from "@/components/ui/krds/identifier";
import { Header, HeaderBrand, HeaderNav, HeaderNavItem, HeaderActions, HeaderActionButton } from "@/components/ui/krds/header";
import { Footer, FooterOrg, FooterColumns, FooterColumn, FooterColumnTitle, FooterColumnLinks, FooterLink, FooterCopyright } from "@/components/ui/krds/footer";

export { IdentitySection };

function IdentitySection() {
  return (
    <>
      <GroupHeading>아이덴티티</GroupHeading>

      <DemoSection id="masthead" title="공식 배너 (Masthead)">
        <DemoCard description="대한민국 정부 공식 사이트 배너">
          <Masthead className="w-full" />
        </DemoCard>
      </DemoSection>

      <DemoSection id="identifier" title="운영기관 식별자 (Identifier)">
        <DemoCard description="기관명과 로고를 표시하는 식별자">
          <Identifier className="w-full">
            <IdentifierOrg>행정안전부</IdentifierOrg>
            <IdentifierLinks>
              <IdentifierLink href="#">개인정보처리방침</IdentifierLink>
              <IdentifierLink href="#">저작권정책</IdentifierLink>
              <IdentifierLink href="#">이용약관</IdentifierLink>
            </IdentifierLinks>
          </Identifier>
        </DemoCard>
      </DemoSection>

      <DemoSection id="header" title="헤더 (Header)">
        <DemoCard description="사이트 헤더 컴포넌트">
          <div className="w-full overflow-x-auto">
            <Header>
              <HeaderBrand href="/">정부24</HeaderBrand>
              <HeaderActions>
                <HeaderActionButton>로그인</HeaderActionButton>
              </HeaderActions>
              <HeaderNav>
                <HeaderNavItem href="#">서비스 안내</HeaderNavItem>
                <HeaderNavItem href="#">민원 신청</HeaderNavItem>
                <HeaderNavItem href="#">정보 공개</HeaderNavItem>
                <HeaderNavItem href="#">정책 자료</HeaderNavItem>
              </HeaderNav>
            </Header>
          </div>
        </DemoCard>
      </DemoSection>

      <DemoSection id="footer" title="푸터 (Footer)">
        <DemoCard description="사이트 푸터 컴포넌트">
          <div className="w-full overflow-x-auto">
            <Footer>
              <FooterOrg>행정안전부</FooterOrg>
              <FooterColumns>
                <FooterColumn>
                  <FooterColumnTitle>기관소개</FooterColumnTitle>
                  <FooterColumnLinks>
                    <FooterLink href="#">기관 안내</FooterLink>
                    <FooterLink href="#">조직도</FooterLink>
                    <FooterLink href="#">연혁</FooterLink>
                  </FooterColumnLinks>
                </FooterColumn>
                <FooterColumn>
                  <FooterColumnTitle>이용안내</FooterColumnTitle>
                  <FooterColumnLinks>
                    <FooterLink href="#">이용약관</FooterLink>
                    <FooterLink href="#">개인정보처리방침</FooterLink>
                    <FooterLink href="#">저작권정책</FooterLink>
                  </FooterColumnLinks>
                </FooterColumn>
                <FooterColumn>
                  <FooterColumnTitle>바로가기</FooterColumnTitle>
                  <FooterColumnLinks>
                    <FooterLink href="https://www.gov.kr" target="_blank" rel="noopener noreferrer">
                      정부24
                    </FooterLink>
                    <FooterLink href="https://www.epeople.go.kr" target="_blank" rel="noopener noreferrer">
                      국민신문고
                    </FooterLink>
                    <FooterLink href="https://www.data.go.kr" target="_blank" rel="noopener noreferrer">
                      공공데이터포털
                    </FooterLink>
                  </FooterColumnLinks>
                </FooterColumn>
              </FooterColumns>
              <FooterCopyright>© 2025 대한민국 행정안전부. All rights reserved.</FooterCopyright>
            </Footer>
          </div>
        </DemoCard>
      </DemoSection>
    </>
  );
}

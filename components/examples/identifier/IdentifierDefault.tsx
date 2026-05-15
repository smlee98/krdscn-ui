import { Identifier, IdentifierLink, IdentifierLinks, IdentifierOrg } from "@/components/ui/krds/identifier";

export default function IdentifierDefault() {
  return (
    <Identifier>
      <IdentifierOrg>행정안전부</IdentifierOrg>
      <p className="text-xs">정부24 공식 사이트</p>
      <IdentifierLinks>
        <IdentifierLink href="#">개인정보처리방침</IdentifierLink>
        <IdentifierLink href="#">이용약관</IdentifierLink>
        <IdentifierLink href="#">접근성 정책</IdentifierLink>
        <IdentifierLink href="#">문의하기</IdentifierLink>
      </IdentifierLinks>
    </Identifier>
  );
}

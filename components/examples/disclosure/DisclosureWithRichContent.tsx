import { Disclosure, DisclosureTrigger, DisclosureContent } from "@/components/ui/dynamic/disclosure";

export default function DisclosureWithRichContent() {
  return (
    <Disclosure className="w-full" defaultOpen>
      <DisclosureTrigger>상세 정보 보기</DisclosureTrigger>
      <DisclosureContent>
        <div>
          <h3>서비스 이용 절차</h3>
          <ol>
            <li>회원가입 및 로그인</li>
            <li>서비스 선택</li>
            <li>필요 정보 입력</li>
            <li>신청 완료</li>
          </ol>

          <h3>필요 서류</h3>
          <ul>
            <li>신분증 사본</li>
            <li>증명사진 1매</li>
            <li>기타 관련 서류</li>
          </ul>

          <p>
            <strong>주의사항:</strong> 모든 서류는 최근 3개월 이내 발급된 것이어야 합니다.
          </p>
        </div>
      </DisclosureContent>
    </Disclosure>
  );
}

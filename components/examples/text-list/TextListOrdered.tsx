import { TextList, TextListItem } from "@/components/ui/dynamic/text-list";

export default function TextListOrdered() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-krds-gray-70 mb-2 text-sm font-medium">레벨 1 — decimal (1.)</p>
        <TextList type="decimal">
          <TextListItem>정부24 홈페이지에 접속합니다.</TextListItem>
          <TextListItem>원하는 민원 서비스를 검색합니다.</TextListItem>
          <TextListItem>신청서를 작성하고 서류를 첨부합니다.</TextListItem>
          <TextListItem>본인인증 후 최종 제출합니다.</TextListItem>
        </TextList>
      </div>
      <div>
        <p className="text-krds-gray-70 mb-2 text-sm font-medium">레벨 2 — alpha (a.)</p>
        <TextList type="alpha">
          <TextListItem>접수 후 담당자 배정</TextListItem>
          <TextListItem>서류 검토 및 현장 확인</TextListItem>
          <TextListItem>결과 통보 (문자 + 이메일)</TextListItem>
        </TextList>
      </div>
      <div>
        <p className="text-krds-gray-70 mb-2 text-sm font-medium">레벨 3 — circle-num (①)</p>
        <TextList type="circle-num">
          <TextListItem>신분증 사본 준비</TextListItem>
          <TextListItem>주민등록등본 발급</TextListItem>
          <TextListItem>소득확인서류 첨부</TextListItem>
        </TextList>
      </div>
    </div>
  );
}

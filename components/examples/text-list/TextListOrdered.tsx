import { TextList, TextListItem } from "@/components/ui/krds";

export default function TextListOrdered() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-krds-gray-70 mb-2 text-sm font-medium">숫자 목록 (decimal)</p>
        <TextList type="decimal">
          <TextListItem>정부24 홈페이지에 접속합니다.</TextListItem>
          <TextListItem>원하는 민원 서비스를 검색합니다.</TextListItem>
          <TextListItem>신청서를 작성하고 서류를 첨부합니다.</TextListItem>
          <TextListItem>본인인증 후 최종 제출합니다.</TextListItem>
        </TextList>
      </div>
      <div>
        <p className="text-krds-gray-70 mb-2 text-sm font-medium">속 번호 목록 (number prop)</p>
        <TextList type="dash">
          <TextListItem number="1">접수 후 담당자 배정</TextListItem>
          <TextListItem number="2">서류 검토 및 현장 확인</TextListItem>
          <TextListItem number="3">결과 통보 (문자 + 이메일)</TextListItem>
        </TextList>
      </div>
    </div>
  );
}

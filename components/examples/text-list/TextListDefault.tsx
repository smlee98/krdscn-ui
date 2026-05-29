import { TextList, TextListItem } from "@/components/ui/dynamic/text-list";

export default function TextListDefault() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-krds-gray-70 mb-2 text-sm font-medium">레벨 1 — disc</p>
        <TextList type="disc">
          <TextListItem>대한민국 국적을 보유한 만 19세 이상 성인</TextListItem>
          <TextListItem>주민등록 상 해당 지역에 거주하는 분</TextListItem>
          <TextListItem>소득 기준 중위소득 80% 이하 가구</TextListItem>
        </TextList>
      </div>
      <div>
        <p className="text-krds-gray-70 mb-2 text-sm font-medium">레벨 2 — dash</p>
        <TextList type="dash">
          <TextListItem>신청서를 작성합니다</TextListItem>
          <TextListItem>서류를 첨부합니다</TextListItem>
          <TextListItem>본인인증 후 제출합니다</TextListItem>
        </TextList>
      </div>
      <div>
        <p className="text-krds-gray-70 mb-2 text-sm font-medium">레벨 3 — hollow</p>
        <TextList type="hollow">
          <TextListItem>개인정보는 서비스 제공 목적으로만 활용됩니다</TextListItem>
          <TextListItem>수집된 정보는 서비스 종료 시 즉시 파기됩니다</TextListItem>
          <TextListItem>외부 제3자에게 제공되지 않습니다</TextListItem>
        </TextList>
      </div>
    </div>
  );
}

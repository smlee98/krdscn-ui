import { TextList, TextListItem } from "@/components/ui/krds";

export default function TextListDense() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-krds-gray-70 mb-2 text-sm font-medium">dash 타입</p>
        <TextList type="dash" className="gap-0.5">
          <TextListItem>주민등록등본: 즉시 발급, 무료</TextListItem>
          <TextListItem>가족관계증명서: 즉시 발급, 무료</TextListItem>
          <TextListItem>건강보험납부확인서: 즉시 발급, 무료</TextListItem>
          <TextListItem>소득확인증명서: 즉시 발급, 무료</TextListItem>
        </TextList>
      </div>
      <div>
        <p className="text-krds-gray-70 mb-2 text-sm font-medium">hollow 타입</p>
        <TextList type="hollow" className="gap-0.5">
          <TextListItem>개인정보는 서비스 제공 목적으로만 활용됩니다.</TextListItem>
          <TextListItem>수집된 정보는 서비스 종료 시 즉시 파기됩니다.</TextListItem>
          <TextListItem>외부 제3자에게 제공되지 않습니다.</TextListItem>
        </TextList>
      </div>
    </div>
  );
}

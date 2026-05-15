import { TextList, TextListItem } from "@/components/ui/krds";

export default function TextListNested() {
  return (
    <TextList type="decimal">
      <TextListItem>
        신청 자격
        <TextList type="dash" className="mt-1 ml-1">
          <TextListItem>만 19세 이상 대한민국 국민</TextListItem>
          <TextListItem>중위소득 80% 이하 가구</TextListItem>
        </TextList>
      </TextListItem>
      <TextListItem>
        필요 서류
        <TextList type="dash" className="mt-1 ml-1">
          <TextListItem>신분증 사본</TextListItem>
          <TextListItem>주민등록등본 (최근 3개월 이내)</TextListItem>
          <TextListItem>소득확인서류</TextListItem>
        </TextList>
      </TextListItem>
      <TextListItem>
        신청 방법
        <TextList type="dash" className="mt-1 ml-1">
          <TextListItem>온라인: 정부24 → 신청하기</TextListItem>
          <TextListItem>방문: 관할 주민센터 방문 신청</TextListItem>
        </TextList>
      </TextListItem>
    </TextList>
  );
}

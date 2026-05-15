import { TextList, TextListItem } from "@/components/ui/krds";

export default function TextListDefault() {
  return (
    <TextList type="dash">
      <TextListItem>대한민국 국적을 보유한 만 19세 이상 성인</TextListItem>
      <TextListItem>주민등록 상 해당 지역에 거주하는 분</TextListItem>
      <TextListItem>소득 기준 중위소득 80% 이하 가구</TextListItem>
      <TextListItem>신청일 기준 최근 6개월 이내 해당 서비스를 이용하지 않은 분</TextListItem>
    </TextList>
  );
}

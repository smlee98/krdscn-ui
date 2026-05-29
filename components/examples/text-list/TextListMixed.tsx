import { TextList, TextListItem } from "@/components/ui/dynamic/text-list";

export default function TextListMixed() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-krds-gray-70 mb-2 text-sm font-medium">혼합 계층: disc → dash → hollow</p>
        <TextList type="disc">
          <TextListItem>
            신청 자격
            <TextList type="dash" className="mt-2 pl-8">
              <TextListItem>
                개인 자격
                <TextList type="hollow" className="mt-2 pl-8">
                  <TextListItem>만 19세 이상 대한민국 국민</TextListItem>
                  <TextListItem>주민등록 상 해당 지역 거주자</TextListItem>
                </TextList>
              </TextListItem>
              <TextListItem>가구 자격</TextListItem>
            </TextList>
          </TextListItem>
          <TextListItem>제외 대상</TextListItem>
        </TextList>
      </div>
    </div>
  );
}

import { TextList, TextListItem } from "@/components/ui/dynamic/text-list"

export default function TextListMixedOrdered() {
  return (
    <div className="flex w-full flex-col gap-6">
      <div>
        <p className="text-krds-gray-70 mb-2 text-sm font-medium">순서 있는 혼합 계층: decimal → alpha → circle-num</p>
        <TextList type="decimal">
          <TextListItem>
            온라인 신청
            <TextList type="alpha" className="mt-2 pl-8">
              <TextListItem>
                정부24 접속
                <TextList type="circle-num" className="mt-2 pl-8">
                  <TextListItem>회원가입 또는 로그인</TextListItem>
                  <TextListItem>본인인증 완료</TextListItem>
                  <TextListItem>서비스 검색</TextListItem>
                </TextList>
              </TextListItem>
              <TextListItem>신청서 작성</TextListItem>
            </TextList>
          </TextListItem>
          <TextListItem>방문 신청</TextListItem>
        </TextList>
      </div>
    </div>
  )
}

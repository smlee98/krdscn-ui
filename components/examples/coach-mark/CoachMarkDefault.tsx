"use client"

import { CoachMark } from "@/registry/krds/ui/coach-mark"

export default function CoachMarkDefault() {
  return (
    // 말풍선이 하이라이트 영역 위쪽에 뜨므로 데모에서는 상단 공간을 확보한다.
    <div className="w-full pt-75">
      <CoachMark title="1단계 : 코치 마크" description="1단계 코치 마크 내용입니다." currentStep={1} totalSteps={4}>
        <h3 className="text-krds-body-md text-krds-foreground font-bold">코치 마크 내용</h3>
      </CoachMark>
    </div>
  )
}

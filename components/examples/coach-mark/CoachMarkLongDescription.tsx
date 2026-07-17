"use client"

import { CoachMark } from "@/registry/krds/ui/coach-mark"

export default function CoachMarkLongDescription() {
  return (
    // 말풍선이 하이라이트 영역 위쪽에 뜨므로 데모에서는 상단 공간을 확보한다(긴 설명만큼 여유 있게).
    <div className="w-full pt-90">
      <CoachMark
        title="긴 설명이 있는 코치 마크"
        description="이것은 매우 긴 설명을 가진 코치 마크입니다. 사용자에게 상세한 가이드를 제공하기 위해 충분한 정보를 포함하고 있습니다. 이 설명은 여러 줄에 걸쳐 표시될 수 있으며, 코치 마크의 크기에 맞게 자동으로 조정됩니다."
        currentStep={1}
        totalSteps={5}
      >
        <h3 className="text-krds-body-md text-krds-foreground font-bold">코치 마크 내용</h3>
      </CoachMark>
    </div>
  )
}

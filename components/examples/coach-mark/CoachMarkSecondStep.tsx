"use client";

import { CoachMark } from "@/components/ui/dynamic/coach-mark";

export default function CoachMarkSecondStep() {
  return (
    // 말풍선이 하이라이트 영역 위쪽에 뜨므로 데모에서는 상단 공간을 확보한다.
    <div className="pt-75">
      <CoachMark
        title="2단계 : 다음 단계"
        description="2단계 코치 마크 내용입니다. 이제 다음 단계로 진행해보세요."
        currentStep={2}
        totalSteps={4}
      >
        <h3>코치 마크 내용</h3>
      </CoachMark>
    </div>
  );
}

"use client";

import { CoachMark } from "@/components/ui/krds/(help)/coach-mark";

export default function CoachMarkSecondStep() {
  return (
    <CoachMark
      title="2단계 : 다음 단계"
      description="2단계 코치 마크 내용입니다. 이제 다음 단계로 진행해보세요."
      currentStep={2}
      totalSteps={4}
    >
      <h3>코치 마크 내용</h3>
    </CoachMark>
  );
}

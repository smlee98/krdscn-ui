"use client";

import { CoachMark } from "@/components/ui/krds/(help)/coach-mark";

export default function CoachMarkDefault() {
  return (
    <CoachMark
      title="1단계 : 코치 마크"
      description="1단계 코치 마크 내용입니다."
      currentStep={1}
      totalSteps={4}
    >
      <h3>코치 마크 내용</h3>
    </CoachMark>
  );
}

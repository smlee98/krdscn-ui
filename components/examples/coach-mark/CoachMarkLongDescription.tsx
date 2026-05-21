"use client";

import { CoachMark } from "@/components/ui/krds/(help)/coach-mark";

export default function CoachMarkLongDescription() {
  return (
    <CoachMark
      title="긴 설명이 있는 코치 마크"
      description="이것은 매우 긴 설명을 가진 코치 마크입니다. 사용자에게 상세한 가이드를 제공하기 위해 충분한 정보를 포함하고 있습니다. 이 설명은 여러 줄에 걸쳐 표시될 수 있으며, 코치 마크의 크기에 맞게 자동으로 조정됩니다."
      currentStep={1}
      totalSteps={5}
    >
      <h3>코치 마크 내용</h3>
    </CoachMark>
  );
}

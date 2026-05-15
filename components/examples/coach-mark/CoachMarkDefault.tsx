"use client";

import * as React from "react";
import { CoachMark, CoachMarkStep } from "@/components/ui/krds/coach-mark";
import { Button } from "@/components/ui/krds/button";

export default function CoachMarkDefault() {
  const [step, setStep] = React.useState(-1);

  return (
    <div className="flex flex-col gap-4">
      <Button id="coachmark-default-target" variant="primary" onClick={() => setStep(0)}>
        가이드 시작하기
      </Button>
      <CoachMark step={step} onClose={() => setStep(-1)} onNext={() => setStep(-1)}>
        <CoachMarkStep step={0} target="#coachmark-default-target" placement="bottom">
          이 버튼을 누르면 신청서 작성을 시작할 수 있습니다.
        </CoachMarkStep>
      </CoachMark>
    </div>
  );
}

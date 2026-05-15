"use client";

import * as React from "react";
import { CoachMark, CoachMarkStep } from "@/components/ui/krds/coach-mark";
import { Button } from "@/components/ui/krds/button";

export default function CoachMarkControlled() {
  const [step, setStep] = React.useState(-1);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <Button id="cm-ctl-show" variant="primary" onClick={() => setStep(0)}>
          코치마크 보이기
        </Button>
        <Button variant="tertiary" onClick={() => setStep(-1)}>
          숨기기
        </Button>
        <span className="text-krds-gray-50 self-center text-xs">현재 step: {step}</span>
      </div>
      <CoachMark step={step} onClose={() => setStep(-1)} onNext={() => setStep(-1)}>
        <CoachMarkStep step={0} target="#cm-ctl-show" placement="bottom">
          외부 상태(step)로 코치마크 표시 여부를 직접 제어할 수 있습니다.
        </CoachMarkStep>
      </CoachMark>
    </div>
  );
}

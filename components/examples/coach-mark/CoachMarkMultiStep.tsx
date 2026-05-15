"use client";

import * as React from "react";
import { CoachMark, CoachMarkStep } from "@/components/ui/krds/coach-mark";
import { Button } from "@/components/ui/krds/button";

export default function CoachMarkMultiStep() {
  const [step, setStep] = React.useState(-1);
  const totalSteps = 3;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <Button id="cm-multi-1" variant="primary" onClick={() => setStep(0)}>
          1단계: 시작
        </Button>
        <Button id="cm-multi-2" variant="secondary">
          2단계: 입력
        </Button>
        <Button id="cm-multi-3" variant="tertiary">
          3단계: 제출
        </Button>
      </div>
      <CoachMark
        step={step}
        onClose={() => setStep(-1)}
        onNext={() => setStep((s) => (s + 1 >= totalSteps ? -1 : s + 1))}
        onPrev={() => setStep((s) => Math.max(0, s - 1))}
      >
        <CoachMarkStep step={0} target="#cm-multi-1" placement="bottom">
          먼저 “시작” 버튼을 눌러 신청을 개시합니다.
        </CoachMarkStep>
        <CoachMarkStep step={1} target="#cm-multi-2" placement="bottom">
          필요한 정보를 단계별로 입력하세요.
        </CoachMarkStep>
        <CoachMarkStep step={2} target="#cm-multi-3" placement="bottom">
          마지막으로 “제출”을 눌러 신청을 완료합니다.
        </CoachMarkStep>
      </CoachMark>
    </div>
  );
}

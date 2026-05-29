"use client";

import * as React from "react";
import { Button } from "@/components/ui/dynamic/button";
import { CoachMark } from "@/components/ui/dynamic/coach-mark";

const steps = [
  {
    title: "1단계 : 코치 마크 시작",
    description: "첫 번째 단계입니다. 다음으로 버튼을 클릭하여 진행하세요.",
    content: "첫 번째 단계"
  },
  {
    title: "2단계 : 이전/다음 버튼",
    description: "두 번째 단계입니다. 이제 이전으로와 다음으로 버튼이 모두 표시됩니다.",
    content: "두 번째 단계"
  },
  {
    title: "3단계 : 거의 완료",
    description: "세 번째 단계입니다. 마지막 단계가 얼마 남지 않았습니다.",
    content: "세 번째 단계"
  },
  {
    title: "4단계 : 완료",
    description: "마지막 단계입니다. 모든 과정을 완료했습니다!",
    content: "네 번째 단계"
  }
];

export default function CoachMarkInteractive() {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [isVisible, setIsVisible] = React.useState(true);

  const step = steps[currentStep - 1]!;

  if (!isVisible) {
    return (
      <Button
        variant="default"
        onClick={() => {
          setIsVisible(true);
          setCurrentStep(1);
        }}
      >
        다시 시작
      </Button>
    );
  }

  return (
    <CoachMark
      title={step.title}
      description={step.description}
      currentStep={currentStep}
      totalSteps={4}
      isVisible={isVisible}
      onSkip={() => setIsVisible(false)}
      onPrevious={currentStep > 1 ? () => setCurrentStep((s) => s - 1) : undefined}
      onNext={() => {
        if (currentStep < 4) {
          setCurrentStep((s) => s + 1);
        } else {
          setIsVisible(false);
        }
      }}
    >
      <h3>{step.content}</h3>
    </CoachMark>
  );
}

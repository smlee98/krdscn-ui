// rsc:client
"use client";

import { useState } from "react";

import { DemoCard, DemoSection, GroupHeading } from "@/components/krds-app/demo-card";
import { Button } from "@/components/ui/krds/button";
import { Spinner } from "@/components/ui/krds/spinner";
import { StepIndicator, StepIndicatorItem } from "@/components/ui/krds/step-indicator";

export function FeedbackSection() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const totalSteps = 4;

  function handleLoadingToggle() {
    setLoading((v) => !v);
  }

  return (
    <>
      <GroupHeading>피드백</GroupHeading>

      <DemoSection id="step-indicator" title="단계 표시기 (Step indicator)">
        <DemoCard title="기본형">
          <div className="w-full space-y-4">
            <StepIndicator currentStep={currentStep} pageTitle="단계 표시">
              <StepIndicatorItem step={1}>신청</StepIndicatorItem>
              <StepIndicatorItem step={2}>확인</StepIndicatorItem>
              <StepIndicatorItem step={3}>결제</StepIndicatorItem>
              <StepIndicatorItem step={4}>완료</StepIndicatorItem>
            </StepIndicator>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="small"
                disabled={currentStep === 1}
                onClick={() => setCurrentStep((s) => s - 1)}
              >
                이전
              </Button>
              <Button
                variant="primary"
                size="small"
                disabled={currentStep === totalSteps}
                onClick={() => setCurrentStep((s) => s + 1)}
              >
                다음
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              현재 단계: {currentStep} / {totalSteps}
            </p>
          </div>
        </DemoCard>
      </DemoSection>

      <DemoSection id="spinner" title="스피너 (Spinner)">
        <DemoCard title="크기 변형">
          <div className="flex items-center gap-6">
            <Spinner label="로딩 중 (소)" className="size-4" />
            <Spinner label="로딩 중 (중)" />
            <Spinner label="로딩 중 (대)" className="size-10" />
          </div>
        </DemoCard>

        <DemoCard title="로딩 상태 토글">
          <div className="flex flex-col gap-3">
            <Button variant="secondary" size="small" onClick={handleLoadingToggle}>
              {loading ? "로딩 중지" : "로딩 시작"}
            </Button>
            {loading && (
              <div className="flex items-center gap-2">
                <Spinner label="데이터를 불러오는 중..." />
                <span className="text-sm text-muted-foreground">데이터를 불러오는 중...</span>
              </div>
            )}
          </div>
        </DemoCard>
      </DemoSection>
    </>
  );
}

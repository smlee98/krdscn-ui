import { StepIndicator, StepIndicatorItem } from "@/components/ui/krds/step-indicator";

export default function StepIndicatorVertical() {
  return (
    <div className="flex max-w-lg flex-col gap-8">
      <StepIndicator currentStep={2} pageTitle="4단계 신청 절차">
        <StepIndicatorItem step={1}>신청서 작성</StepIndicatorItem>
        <StepIndicatorItem step={2}>서류 제출</StepIndicatorItem>
        <StepIndicatorItem step={3}>심사</StepIndicatorItem>
        <StepIndicatorItem step={4}>결과 통보</StepIndicatorItem>
      </StepIndicator>
      <StepIndicator currentStep={3} pageTitle="5단계 민원 처리">
        <StepIndicatorItem step={1}>접수</StepIndicatorItem>
        <StepIndicatorItem step={2}>검토</StepIndicatorItem>
        <StepIndicatorItem step={3}>담당자 배정</StepIndicatorItem>
        <StepIndicatorItem step={4}>처리</StepIndicatorItem>
        <StepIndicatorItem step={5}>완료</StepIndicatorItem>
      </StepIndicator>
    </div>
  );
}

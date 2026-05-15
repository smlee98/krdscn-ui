import { StepIndicator, StepIndicatorItem } from "@/components/ui/krds/step-indicator";

export default function StepIndicatorWithStatus() {
  return (
    <div className="flex max-w-lg flex-col gap-8">
      <div>
        <p className="text-krds-gray-50 mb-2 text-xs">시작 단계 (step 1 활성)</p>
        <StepIndicator currentStep={1} pageTitle="신청 진행">
          <StepIndicatorItem step={1}>접수</StepIndicatorItem>
          <StepIndicatorItem step={2}>검토</StepIndicatorItem>
          <StepIndicatorItem step={3}>승인</StepIndicatorItem>
          <StepIndicatorItem step={4}>완료</StepIndicatorItem>
        </StepIndicator>
      </div>
      <div>
        <p className="text-krds-gray-50 mb-2 text-xs">중간 진행 (step 3 활성)</p>
        <StepIndicator currentStep={3} pageTitle="신청 진행">
          <StepIndicatorItem step={1}>접수</StepIndicatorItem>
          <StepIndicatorItem step={2}>검토</StepIndicatorItem>
          <StepIndicatorItem step={3}>승인</StepIndicatorItem>
          <StepIndicatorItem step={4}>완료</StepIndicatorItem>
        </StepIndicator>
      </div>
      <div>
        <p className="text-krds-gray-50 mb-2 text-xs">모든 단계 완료</p>
        <StepIndicator currentStep={5} pageTitle="신청 완료">
          <StepIndicatorItem step={1}>접수</StepIndicatorItem>
          <StepIndicatorItem step={2}>검토</StepIndicatorItem>
          <StepIndicatorItem step={3}>승인</StepIndicatorItem>
          <StepIndicatorItem step={4}>완료</StepIndicatorItem>
        </StepIndicator>
      </div>
    </div>
  );
}

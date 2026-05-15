import { StepIndicator, StepIndicatorItem } from "@/components/ui/krds/step-indicator";

export default function StepIndicatorDefault() {
  return (
    <StepIndicator currentStep={1} pageTitle="회원가입" className="max-w-sm">
      <StepIndicatorItem step={1}>약관 동의</StepIndicatorItem>
      <StepIndicatorItem step={2}>정보 입력</StepIndicatorItem>
      <StepIndicatorItem step={3}>완료</StepIndicatorItem>
    </StepIndicator>
  );
}

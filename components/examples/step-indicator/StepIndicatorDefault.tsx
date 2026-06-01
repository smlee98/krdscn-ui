import { StepIndicator, StepIndicatorItem } from "@/components/ui/dynamic/step-indicator";

export default function StepIndicatorDefault() {
  return (
    <StepIndicator currentStep={2}>
      <StepIndicatorItem step={1}>약관 동의</StepIndicatorItem>
      <StepIndicatorItem step={2}>본인 인증</StepIndicatorItem>
      <StepIndicatorItem step={3}>정보 입력</StepIndicatorItem>
      <StepIndicatorItem step={4}>가입 완료</StepIndicatorItem>
    </StepIndicator>
  );
}

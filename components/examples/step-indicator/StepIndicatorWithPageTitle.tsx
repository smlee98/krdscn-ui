import { StepIndicator, StepIndicatorItem } from "@/components/ui/krds/(feedback)/step-indicator";

export default function StepIndicatorWithPageTitle() {
  return (
    <StepIndicator currentStep={2} pageTitle="회원가입">
      <StepIndicatorItem step={1}>약관 동의</StepIndicatorItem>
      <StepIndicatorItem step={2}>본인 인증</StepIndicatorItem>
      <StepIndicatorItem step={3}>정보 입력</StepIndicatorItem>
      <StepIndicatorItem step={4}>가입 완료</StepIndicatorItem>
    </StepIndicator>
  );
}

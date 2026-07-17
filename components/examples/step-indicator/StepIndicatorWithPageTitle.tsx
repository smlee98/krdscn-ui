import { StepIndicator, StepIndicatorItem } from "@/registry/krds/ui/step-indicator"

export default function StepIndicatorWithPageTitle() {
  return (
    <div className="w-full">
      <p className="text-krds-gray-90 mb-3 text-sm font-medium">회원가입</p>
      <StepIndicator currentStep={2} aria-label="회원가입">
        <StepIndicatorItem step={1}>약관 동의</StepIndicatorItem>
        <StepIndicatorItem step={2}>본인 인증</StepIndicatorItem>
        <StepIndicatorItem step={3}>정보 입력</StepIndicatorItem>
        <StepIndicatorItem step={4}>가입 완료</StepIndicatorItem>
      </StepIndicator>
    </div>
  )
}

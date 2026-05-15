import {
  TutorialPanel,
  TutorialPanelControls,
  TutorialPanelNext,
  TutorialPanelPrev,
  TutorialPanelStep,
  TutorialPanelStepBody,
  TutorialPanelStepTitle,
  TutorialPanelTitle
} from "@/components/ui/krds/tutorial-panel";
import { Button } from "@/components/ui/krds/button";

export default function TutorialPanelMultiStep() {
  return (
    <TutorialPanel totalSteps={4} trigger={<Button variant="primary">전체 가이드 4단계</Button>}>
      <TutorialPanelTitle>민원 신청 안내</TutorialPanelTitle>
      <TutorialPanelStep step={0}>
        <TutorialPanelStepTitle>1. 본인 인증</TutorialPanelStepTitle>
        <TutorialPanelStepBody>전자인증서로 신원을 확인합니다.</TutorialPanelStepBody>
      </TutorialPanelStep>
      <TutorialPanelStep step={1}>
        <TutorialPanelStepTitle>2. 민원 선택</TutorialPanelStepTitle>
        <TutorialPanelStepBody>필요한 민원 종류를 선택하세요.</TutorialPanelStepBody>
      </TutorialPanelStep>
      <TutorialPanelStep step={2}>
        <TutorialPanelStepTitle>3. 서류 첨부</TutorialPanelStepTitle>
        <TutorialPanelStepBody>
          요구되는 증빙 서류를 업로드합니다. 파일당 10MB까지 첨부 가능합니다.
        </TutorialPanelStepBody>
      </TutorialPanelStep>
      <TutorialPanelStep step={3}>
        <TutorialPanelStepTitle>4. 제출 및 접수번호 확인</TutorialPanelStepTitle>
        <TutorialPanelStepBody>제출 완료 후 SMS와 이메일로 접수번호를 안내해 드립니다.</TutorialPanelStepBody>
      </TutorialPanelStep>
      <TutorialPanelControls>
        <TutorialPanelPrev />
        <TutorialPanelNext />
      </TutorialPanelControls>
    </TutorialPanel>
  );
}

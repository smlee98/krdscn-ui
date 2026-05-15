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

export default function TutorialPanelDefault() {
  return (
    <TutorialPanel totalSteps={2} trigger={<Button variant="secondary">튜토리얼 보기</Button>}>
      <TutorialPanelTitle>처음 사용하시나요?</TutorialPanelTitle>
      <TutorialPanelStep step={0}>
        <TutorialPanelStepTitle>1. 본인 인증</TutorialPanelStepTitle>
        <TutorialPanelStepBody>공동·금융인증서 또는 카카오 인증으로 본인 확인을 진행합니다.</TutorialPanelStepBody>
      </TutorialPanelStep>
      <TutorialPanelStep step={1}>
        <TutorialPanelStepTitle>2. 신청서 작성</TutorialPanelStepTitle>
        <TutorialPanelStepBody>
          단계별 안내를 따라 필요한 정보를 입력하고 첨부 파일을 업로드하세요.
        </TutorialPanelStepBody>
      </TutorialPanelStep>
      <TutorialPanelControls>
        <TutorialPanelPrev />
        <TutorialPanelNext />
      </TutorialPanelControls>
    </TutorialPanel>
  );
}

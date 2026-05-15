"use client";

import * as React from "react";
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

export default function TutorialPanelControlled() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="primary" onClick={() => setOpen(true)}>
          외부에서 열기
        </Button>
        <Button variant="tertiary" onClick={() => setOpen(false)}>
          닫기
        </Button>
        <span className="text-krds-gray-50 text-xs">({open ? "열림" : "닫힘"})</span>
      </div>
      <TutorialPanel totalSteps={2} open={open} onOpenChange={setOpen} trigger={<span className="hidden" />}>
        <TutorialPanelTitle>외부 제어 튜토리얼</TutorialPanelTitle>
        <TutorialPanelStep step={0}>
          <TutorialPanelStepTitle>1. 시작</TutorialPanelStepTitle>
          <TutorialPanelStepBody>상위 컴포넌트에서 open 상태를 직접 제어할 수 있습니다.</TutorialPanelStepBody>
        </TutorialPanelStep>
        <TutorialPanelStep step={1}>
          <TutorialPanelStepTitle>2. 마무리</TutorialPanelStepTitle>
          <TutorialPanelStepBody>
            완료 시점에 추가 처리가 필요한 경우 onOpenChange에서 처리하세요.
          </TutorialPanelStepBody>
        </TutorialPanelStep>
        <TutorialPanelControls>
          <TutorialPanelPrev />
          <TutorialPanelNext />
        </TutorialPanelControls>
      </TutorialPanel>
    </div>
  );
}

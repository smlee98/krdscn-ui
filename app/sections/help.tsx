// rsc:client
"use client";

import { useState } from "react";

import { DemoCard, DemoSection, GroupHeading } from "@/components/krds-app/demo-card";
import { Button } from "@/components/ui/krds/button";
import { CoachMark, CoachMarkStep } from "@/components/ui/krds/coach-mark";
import { ContextualHelp } from "@/components/ui/krds/contextual-help";
import { HelpPanel, HelpPanelDescription, HelpPanelLink, HelpPanelLinks, HelpPanelTitle } from "@/components/ui/krds/help-panel";
import { Tooltip } from "@/components/ui/krds/tooltip";
import {
  TutorialPanel,
  TutorialPanelControls,
  TutorialPanelNext,
  TutorialPanelPrev,
  TutorialPanelStep,
  TutorialPanelStepBody,
  TutorialPanelStepTitle,
  TutorialPanelTitle,
} from "@/components/ui/krds/tutorial-panel";

export function HelpSection() {
  const [helpOpen, setHelpOpen] = useState(false);
  const [coachStep, setCoachStep] = useState(-1);

  return (
    <>
      <GroupHeading>도움</GroupHeading>

      <DemoSection id="help-panel" title="도움 패널 (Help panel)">
        <DemoCard title="기본형">
          <HelpPanel
            open={helpOpen}
            onOpenChange={setHelpOpen}
            trigger={
              <Button variant="secondary" size="small">
                도움말 열기
              </Button>
            }
          >
            <HelpPanelTitle>서비스 이용 안내</HelpPanelTitle>
            <HelpPanelDescription>
              <p>이 서비스는 국민이 더 편리하게 정부 서비스를 이용할 수 있도록 제공됩니다.</p>
              <ul className="mt-3 list-inside list-disc space-y-1 text-sm">
                <li>회원가입 없이도 일부 서비스 이용 가능</li>
                <li>공인인증서 또는 간편인증으로 로그인</li>
                <li>모바일에서도 동일하게 이용 가능</li>
              </ul>
            </HelpPanelDescription>
            <HelpPanelLinks>
              <HelpPanelLink href="#faq">자주 묻는 질문</HelpPanelLink>
              <HelpPanelLink href="#support">고객센터 바로가기</HelpPanelLink>
            </HelpPanelLinks>
          </HelpPanel>
        </DemoCard>
      </DemoSection>

      <DemoSection id="tutorial-panel" title="따라하기 패널 (Tutorial panel)">
        <DemoCard title="3단계 튜토리얼">
          <TutorialPanel
            totalSteps={3}
            trigger={
              <Button variant="secondary" size="small">
                튜토리얼 시작
              </Button>
            }
          >
            <TutorialPanelTitle>서비스 가이드</TutorialPanelTitle>

            <TutorialPanelStep step={0}>
              <TutorialPanelStepTitle>서비스 소개</TutorialPanelStepTitle>
              <TutorialPanelStepBody>
                정부24는 각종 민원서비스, 보조금·지원금 확인, 공공데이터 제공 등 다양한 정부 서비스를 한 곳에서
                이용할 수 있는 통합 포털입니다.
              </TutorialPanelStepBody>
            </TutorialPanelStep>

            <TutorialPanelStep step={1}>
              <TutorialPanelStepTitle>민원 신청 방법</TutorialPanelStepTitle>
              <TutorialPanelStepBody>
                상단 메뉴에서 <strong>민원서비스</strong>를 선택한 후, 원하는 서비스를 검색하거나 카테고리에서
                찾아볼 수 있습니다.
              </TutorialPanelStepBody>
            </TutorialPanelStep>

            <TutorialPanelStep step={2}>
              <TutorialPanelStepTitle>완료</TutorialPanelStepTitle>
              <TutorialPanelStepBody>
                서비스 이용에 궁금한 점이 있으면 언제든지 도움말을 클릭하거나 고객센터로 문의해 주세요.
              </TutorialPanelStepBody>
            </TutorialPanelStep>

            <TutorialPanelControls>
              <TutorialPanelPrev />
              <TutorialPanelNext />
            </TutorialPanelControls>
          </TutorialPanel>
        </DemoCard>
      </DemoSection>

      <DemoSection id="contextual-help" title="맥락적 도움말 (Contextual help)">
        <DemoCard title="인라인 도움말">
          <div className="flex items-center gap-2">
            <span className="text-krds-gray-90 text-sm">주민등록번호</span>
            <ContextualHelp
              title="주민등록번호란?"
              content="주민등록번호는 대한민국 국민에게 부여되는 13자리 고유 번호입니다. 앞 6자리는 생년월일, 뒤 7자리는 성별·지역 코드 등을 나타냅니다."
            />
          </div>
        </DemoCard>
        <DemoCard title="커스텀 레이블">
          <div className="flex items-center gap-2">
            <span className="text-krds-gray-90 text-sm">파일 용량 제한</span>
            <ContextualHelp
              triggerLabel="파일 용량 안내"
              content="업로드 가능한 파일은 최대 10MB이며, PDF·JPG·PNG 형식만 허용됩니다."
            />
          </div>
        </DemoCard>
      </DemoSection>

      <DemoSection id="coach-mark" title="코치마크 (Coach mark)">
        <DemoCard title="단계별 안내">
          <div className="inline-flex flex-col gap-3">
            <div
              id="coach-mark-target"
              className="rounded-md border border-krds-primary-50 bg-krds-primary-5 px-4 py-2 text-sm text-krds-primary-50"
            >
              이 영역에 코치마크가 표시됩니다
            </div>
            <Button variant="secondary" size="small" onClick={() => setCoachStep(0)}>
              코치마크 보기
            </Button>
          </div>

          <CoachMark
            step={coachStep}
            onClose={() => setCoachStep(-1)}
            onNext={() => setCoachStep((s) => s + 1)}
            onPrev={() => setCoachStep((s) => s - 1)}
          >
            <CoachMarkStep step={0} target="#coach-mark-target" placement="bottom">
              <p className="text-krds-gray-90 mb-1 text-sm font-semibold">검색창 사용법</p>
              <p className="text-krds-gray-70 text-sm leading-relaxed">
                찾고 싶은 민원서비스 이름을 입력하면 빠르게 찾을 수 있습니다.
              </p>
            </CoachMarkStep>
            <CoachMarkStep step={1} target="#coach-mark-target">
              <p className="text-krds-gray-90 mb-1 text-sm font-semibold">즐겨찾기 등록</p>
              <p className="text-krds-gray-70 text-sm leading-relaxed">
                자주 사용하는 서비스는 즐겨찾기에 등록해 더 빠르게 접근하세요.
              </p>
            </CoachMarkStep>
          </CoachMark>
        </DemoCard>
      </DemoSection>

      <DemoSection id="tooltip" title="툴팁 (Tooltip)">
        <DemoCard title="방향 변형">
          <div className="flex flex-wrap gap-4">
            <Tooltip text="오른쪽에 표시되는 툴팁 (horizontal)" variant="horizontal">
              <Button variant="secondary" size="small">
                Horizontal
              </Button>
            </Tooltip>
            <Tooltip text="위쪽에 표시되는 툴팁 (vertical)" variant="vertical">
              <Button variant="secondary" size="small">
                Vertical
              </Button>
            </Tooltip>
            <Tooltip text="박스형 툴팁입니다. 더 넓은 공간에 상세 설명을 표시할 수 있습니다." variant="box">
              <Button variant="secondary" size="small">
                Box
              </Button>
            </Tooltip>
          </div>
        </DemoCard>
      </DemoSection>
    </>
  );
}

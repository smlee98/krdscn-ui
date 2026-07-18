"use client"

import * as React from "react"

import { Button } from "@/registry/krds/ui/button"
import {
  TutorialPanel,
  TutorialPanelAction,
  TutorialPanelClose,
  TutorialPanelContent,
  TutorialPanelHelpContent,
  TutorialPanelLinkList,
  TutorialPanelRelatedService,
  TutorialPanelSection,
  TutorialPanelServiceGroup,
  TutorialPanelTabPanel,
  TutorialPanelTabs,
  TutorialPanelTask,
  TutorialPanelTaskList,
  TutorialPanelTitle,
  TutorialPanelTrigger,
  TutorialPanelTutorialContent,
} from "@/registry/krds/ui/tutorial-panel"
import type { TutorialPanelTab } from "@/registry/krds/ui/tutorial-panel"

export default function TutorialPanelControlled() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState<TutorialPanelTab>("tutorial")

  return (
    <TutorialPanel open={isOpen} onOpenChange={setIsOpen}>
      <TutorialPanelTrigger>도움말</TutorialPanelTrigger>
      <TutorialPanelContent>
        <TutorialPanelClose />
        <TutorialPanelTabs value={activeTab} onValueChange={setActiveTab}>
          <TutorialPanelTabPanel value="help">
            <TutorialPanelHelpContent>
              <TutorialPanelSection
                title="전자문서지갑"
                description={
                  <p>
                    전자문서지갑에서는 전자증명서 출력기능을 제공하지 않으며, 스마트폰 화면을 캡쳐하여 사용할 수
                    없습니다. 다만, 발급받은 전자증명서를 열람용으로 다운로드할 수는 있습니다.
                  </p>
                }
              >
                <TutorialPanelLinkList
                  links={[
                    { label: "안드로이드 애플리케이션 다운로드", href: "#", external: true },
                    { label: "iOS애플리케이션 다운로드", href: "#", external: true },
                  ]}
                />
              </TutorialPanelSection>
              <TutorialPanelRelatedService>
                <TutorialPanelServiceGroup title="관련서비스/민원">
                  <TutorialPanelLinkList
                    links={[
                      { label: "영문 주민등록표등본", href: "#" },
                      { label: "영문 주민등록표초본", href: "#" },
                      { label: "주민등록표등본", href: "#" },
                    ]}
                  />
                </TutorialPanelServiceGroup>
                <TutorialPanelServiceGroup title="기타 문의/도움말">
                  <TutorialPanelLinkList
                    links={[
                      { label: "민원신청 관련 문의 전화 번호 찾기", href: "#", icon: "phone", iconPosition: "left" },
                      { label: "자주 묻는 질문 확인하기", href: "#", icon: "faq", iconPosition: "left" },
                    ]}
                  />
                </TutorialPanelServiceGroup>
              </TutorialPanelRelatedService>
            </TutorialPanelHelpContent>
          </TutorialPanelTabPanel>
          <TutorialPanelTabPanel value="tutorial">
            <TutorialPanelTutorialContent>
              <TutorialPanelTitle title="이사 전 살던 곳 정보 입력하기" href="#" />
              <TutorialPanelTaskList>
                <TutorialPanelTask
                  title="Task 1: 이사 전에 살던 곳 주소 확인"
                  isCurrent
                  steps={["단계1 : 주소조회", "단계2 : 조회 결과 확인"]}
                  content={<p>이사 전 살던 곳의 주소를 확인하는 단계입니다.</p>}
                />
                <TutorialPanelTask
                  title="Task 2: 이사 갈 가족 구성원 선택하기"
                  steps={["단계1 : 주소조회"]}
                  content={<p>이사 갈 가족 구성원을 선택하는 단계입니다.</p>}
                />
              </TutorialPanelTaskList>
              <TutorialPanelAction>
                <Button
                  type="button"
                  variant="secondary"
                  size="default"
                  className="coach-btn-stop w-full"
                  onClick={() => {
                    console.log("튜토리얼 종료")
                    setIsOpen(false)
                  }}
                >
                  그만 따라하기
                </Button>
              </TutorialPanelAction>
            </TutorialPanelTutorialContent>
          </TutorialPanelTabPanel>
        </TutorialPanelTabs>
      </TutorialPanelContent>
    </TutorialPanel>
  )
}

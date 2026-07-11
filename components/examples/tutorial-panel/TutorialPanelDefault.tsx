"use client"

import { TutorialPanel } from "@/components/ui/dynamic/tutorial-panel"

const helpContent = {
  title: "전자문서지갑",
  description: (
    <p>
      전자문서지갑에서는 전자증명서 출력기능을 제공하지 않으며, 스마트폰 화면을 캡쳐하여 사용할 수 없습니다. 다만,
      발급받은 전자증명서를 열람용으로 다운로드할 수는 있습니다.
    </p>
  ),
  links: [
    { label: "안드로이드 애플리케이션 다운로드", href: "#", external: true },
    { label: "iOS애플리케이션 다운로드", href: "#", external: true },
  ],
}

const relatedServices = [
  {
    title: "관련서비스/민원",
    links: [
      { label: "영문 주민등록표등본", href: "#" },
      { label: "영문 주민등록표초본", href: "#" },
      { label: "주민등록표등본", href: "#" },
    ],
  },
  {
    title: "기타 문의/도움말",
    links: [
      { label: "민원신청 관련 문의 전화 번호 찾기", href: "#", icon: "phone" as const, iconPosition: "left" as const },
      { label: "자주 묻는 질문 확인하기", href: "#", icon: "faq" as const, iconPosition: "left" as const },
    ],
  },
]

const tutorialSteps = [
  {
    title: "Task 1: 이사 전에 살던 곳 주소 확인",
    current: true,
    steps: ["단계1 : 주소조회", "단계2 : 조회 결과 확인"],
    content: <p>이사 전 살던 곳의 주소를 확인하는 단계입니다.</p>,
  },
  {
    title: "Task 2: 이사 갈 가족 구성원 선택하기",
    steps: ["단계1 : 주소조회"],
    content: <p>이사 갈 가족 구성원을 선택하는 단계입니다.</p>,
  },
]

export default function TutorialPanelDefault() {
  return (
    <TutorialPanel.Root defaultActiveTab="tutorial">
      <TutorialPanel.Trigger>도움말</TutorialPanel.Trigger>
      <TutorialPanel.Container>
        <TutorialPanel.Tabs>
          <TutorialPanel.TabPanel value="help">
            <TutorialPanel.HelpContent helpContent={helpContent} relatedServices={relatedServices} />
          </TutorialPanel.TabPanel>
          <TutorialPanel.TabPanel value="tutorial">
            <TutorialPanel.TutorialContent
              title="이사 전 살던 곳 정보 입력하기"
              steps={tutorialSteps}
              onTutorialStop={() => console.log("튜토리얼 종료")}
              stopButtonText="그만 따라하기"
            />
          </TutorialPanel.TabPanel>
        </TutorialPanel.Tabs>
        <TutorialPanel.Close />
      </TutorialPanel.Container>
    </TutorialPanel.Root>
  )
}

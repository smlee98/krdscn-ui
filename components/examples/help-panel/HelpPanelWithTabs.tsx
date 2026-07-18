"use client"

import { MessageCircleQuestion, Phone } from "lucide-react"

import { Button } from "@/registry/krds/ui/button"
import {
  HelpCoachProcess,
  HelpCoachTask,
  HelpContentArea,
  HelpLinkList,
  HelpPanel,
  HelpPanelAction,
  HelpPanelBody,
  HelpPanelClose,
  HelpPanelContent,
  HelpPanelTrigger,
  HelpRelatedService,
  HelpSection,
  HelpServiceGroup,
  HelpTutorialTitle,
} from "@/registry/krds/ui/help-panel"
import { Tab, TabContent, TabList, TabPanel, TabTrigger } from "@/registry/krds/ui/tab"

export default function HelpPanelWithTabs() {
  return (
    <HelpPanel>
      <HelpPanelTrigger>도움말</HelpPanelTrigger>

      <HelpPanelContent>
        <HelpPanelClose />

        <HelpPanelBody srOnlyTitle="도움">
          <Tab defaultValue="help" variant="line" type="secondary">
            <TabList>
              <TabTrigger value="help">도움</TabTrigger>
              <TabTrigger value="tutorial">따라하기</TabTrigger>
            </TabList>

            <TabContent>
              <TabPanel value="help">
                <div className="flex flex-col gap-8">
                  <HelpSection
                    title="전자문서지갑"
                    description="전자문서지갑에서는 전자증명서 출력기능을 제공하지 않으며, 스마트폰 화면을 캡쳐하여 사용할 수 없습니다. 다만, 발급받은 전자증명서를 열람용으로 다운로드할 수는 있습니다."
                  >
                    <HelpLinkList
                      links={[
                        { text: "전자문서지갑 안드로이드 앱 다운로드", href: "#android", target: "_blank" },
                        { text: "전자문서지갑 iOS 앱 다운로드", href: "#ios", target: "_blank" },
                      ]}
                    />
                  </HelpSection>

                  <HelpRelatedService>
                    <HelpServiceGroup title="관련서비스/민원">
                      <HelpLinkList
                        links={[
                          { text: "전자증명서 발급 안내", href: "#doc1" },
                          { text: "본인인증 수단 안내", href: "#doc2" },
                          { text: "이용약관 및 개인정보 처리방침", href: "#doc3" },
                        ]}
                      />
                    </HelpServiceGroup>

                    <HelpServiceGroup title="기타 문의/도움말">
                      <HelpLinkList
                        iconPosition="left"
                        links={[
                          {
                            text: "고객센터 1588-0000",
                            href: "tel:1588-0000",
                            icon: <Phone className="size-4" aria-hidden="true" />,
                          },
                          {
                            text: "자주 묻는 질문 (FAQ)",
                            href: "#faq",
                            icon: <MessageCircleQuestion className="size-4" aria-hidden="true" />,
                          },
                        ]}
                      />
                    </HelpServiceGroup>
                  </HelpRelatedService>
                </div>
              </TabPanel>

              <TabPanel value="tutorial">
                <HelpContentArea>
                  <HelpTutorialTitle title="주소 변경 따라하기" href="#tutorial" />
                  <HelpCoachProcess>
                    <HelpCoachTask
                      title="1. 주소 조회"
                      isCurrent
                      expandText="전체 2단계"
                      steps={["단계1 : 주소조회", "단계2 : 조회 결과 확인"]}
                    />
                    <HelpCoachTask
                      title="2. 조회 결과 확인"
                      expandText="전체 2단계"
                      steps={["단계1 : 결과 목록 보기", "단계2 : 상세 정보 확인"]}
                    />
                  </HelpCoachProcess>
                </HelpContentArea>
              </TabPanel>
            </TabContent>
          </Tab>
        </HelpPanelBody>

        <HelpPanelAction>
          <Button variant="secondary" size="default">
            그만 따라하기
          </Button>
        </HelpPanelAction>
      </HelpPanelContent>
    </HelpPanel>
  )
}

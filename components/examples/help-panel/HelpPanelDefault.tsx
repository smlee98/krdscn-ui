"use client"

import { MessageCircleQuestion, Phone } from "lucide-react"

import { Button } from "@/registry/krds/ui/button"
import {
  HelpCoachProcess,
  HelpCoachStep,
  HelpCoachTask,
  HelpContentArea,
  HelpLinkList,
  HelpLinkListItem,
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

export default function HelpPanelDefault() {
  return (
    <HelpPanel>
      <HelpPanelTrigger>도움말</HelpPanelTrigger>

      <HelpPanelContent>
        <HelpPanelClose />

        <HelpPanelBody srOnlyTitle="도움">
          <HelpSection
            title="전자문서지갑"
            description="전자문서지갑에서는 전자증명서 출력기능을 제공하지 않으며, 스마트폰 화면을 캡쳐하여 사용할 수 없습니다. 다만, 발급받은 전자증명서를 열람용으로 다운로드할 수는 있습니다."
          >
            <HelpLinkList>
              <HelpLinkListItem href="#android" target="_blank">
                전자문서지갑 안드로이드 앱 다운로드
              </HelpLinkListItem>
              <HelpLinkListItem href="#ios" target="_blank">
                전자문서지갑 iOS 앱 다운로드
              </HelpLinkListItem>
            </HelpLinkList>
          </HelpSection>

          <HelpRelatedService>
            <HelpServiceGroup title="관련서비스/민원">
              <HelpLinkList>
                <HelpLinkListItem href="#doc1">전자증명서 발급 안내</HelpLinkListItem>
                <HelpLinkListItem href="#doc2">본인인증 수단 안내</HelpLinkListItem>
                <HelpLinkListItem href="#doc3">이용약관 및 개인정보 처리방침</HelpLinkListItem>
              </HelpLinkList>
            </HelpServiceGroup>

            <HelpServiceGroup title="기타 문의/도움말">
              <HelpLinkList>
                <HelpLinkListItem
                  href="tel:1588-0000"
                  icon={<Phone className="size-4" aria-hidden="true" />}
                  iconPosition="left"
                >
                  고객센터 1588-0000
                </HelpLinkListItem>
                <HelpLinkListItem
                  href="#faq"
                  icon={<MessageCircleQuestion className="size-4" aria-hidden="true" />}
                  iconPosition="left"
                >
                  자주 묻는 질문 (FAQ)
                </HelpLinkListItem>
              </HelpLinkList>
            </HelpServiceGroup>
          </HelpRelatedService>

          <HelpContentArea>
            <HelpTutorialTitle title="주소 변경 따라하기" href="#tutorial" />
            <HelpCoachProcess>
              <HelpCoachTask title="현재 단계: 주소 조회" isCurrent expandText="전체 2단계">
                <HelpCoachStep>단계1 : 주소조회</HelpCoachStep>
                <HelpCoachStep>단계2 : 조회 결과 확인</HelpCoachStep>
              </HelpCoachTask>
            </HelpCoachProcess>
          </HelpContentArea>
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

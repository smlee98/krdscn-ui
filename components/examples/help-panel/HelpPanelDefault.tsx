"use client";

import { Button } from "@/components/ui/krds/(action)/button";
import {
  HelpContentArea,
  HelpCoachProcess,
  HelpCoachTask,
  HelpFaqIcon,
  HelpLinkList,
  HelpPanel,
  HelpPanelAction,
  HelpPanelClose,
  HelpPanelContent,
  HelpPanelTrigger,
  HelpPhoneIcon,
  HelpRelatedService,
  HelpSection,
  HelpServiceGroup,
  HelpTutorialTitle
} from "@/components/ui/dynamic/help-panel";

export default function HelpPanelDefault() {
  return (
    <HelpPanel>
      <HelpPanelTrigger>도움말</HelpPanelTrigger>

      <HelpPanelClose />

      <HelpPanelContent srOnlyTitle="도움">
        <HelpSection
          title="전자문서지갑"
          description="전자문서지갑에서는 전자증명서 출력기능을 제공하지 않으며, 스마트폰 화면을 캡쳐하여 사용할 수 없습니다. 다만, 발급받은 전자증명서를 열람용으로 다운로드할 수는 있습니다."
        >
          <HelpLinkList
            links={[
              { text: "전자문서지갑 안드로이드 앱 다운로드", href: "#android", target: "_blank" },
              { text: "전자문서지갑 iOS 앱 다운로드", href: "#ios", target: "_blank" }
            ]}
          />
        </HelpSection>

        <HelpRelatedService>
          <HelpServiceGroup title="관련서비스/민원">
            <HelpLinkList
              links={[
                { text: "전자증명서 발급 안내", href: "#doc1" },
                { text: "본인인증 수단 안내", href: "#doc2" },
                { text: "이용약관 및 개인정보 처리방침", href: "#doc3" }
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
                  icon: <HelpPhoneIcon className="size-4" aria-hidden="true" />
                },
                {
                  text: "자주 묻는 질문 (FAQ)",
                  href: "#faq",
                  icon: <HelpFaqIcon className="size-4" aria-hidden="true" />
                }
              ]}
            />
          </HelpServiceGroup>
        </HelpRelatedService>

        <HelpContentArea>
          <HelpTutorialTitle title="주소 변경 따라하기" href="#tutorial" />
          <HelpCoachProcess>
            <HelpCoachTask
              title="현재 단계: 주소 조회"
              isCurrent
              expandText="전체 2단계"
              steps={["단계1 : 주소조회", "단계2 : 조회 결과 확인"]}
            />
          </HelpCoachProcess>
        </HelpContentArea>
      </HelpPanelContent>

      <HelpPanelAction>
        <Button variant="secondary" size="default">
          그만 따라하기
        </Button>
      </HelpPanelAction>
    </HelpPanel>
  );
}

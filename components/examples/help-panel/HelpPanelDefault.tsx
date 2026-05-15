import {
  HelpPanel,
  HelpPanelDescription,
  HelpPanelLink,
  HelpPanelLinks,
  HelpPanelTitle
} from "@/components/ui/krds/help-panel";
import { Button } from "@/components/ui/krds/button";

export default function HelpPanelDefault() {
  return (
    <HelpPanel trigger={<Button variant="secondary">도움말 패널 열기</Button>}>
      <HelpPanelTitle>도움말</HelpPanelTitle>
      <HelpPanelDescription>
        이 화면의 사용 방법과 자주 묻는 질문을 안내합니다. 추가 도움이 필요하면 아래 링크를 참고하세요.
      </HelpPanelDescription>
      <HelpPanelLinks>
        <HelpPanelLink href="#guide">상세 가이드</HelpPanelLink>
        <HelpPanelLink href="#faq">자주 묻는 질문</HelpPanelLink>
        <HelpPanelLink href="#contact">고객센터 문의</HelpPanelLink>
      </HelpPanelLinks>
    </HelpPanel>
  );
}

import { Accordion, AccordionItem, AccordionHeader, AccordionPanel } from "@/components/ui/krds";

export default function AccordionMultiple() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-krds-gray-70 mb-3 text-sm font-medium">여러 항목 동시 열기 (allowMultiple=true)</p>
        <Accordion allowMultiple defaultValue={["a", "b"]}>
          <AccordionItem value="a">
            <AccordionHeader>개인정보 수집 및 이용 동의</AccordionHeader>
            <AccordionPanel>
              성명, 생년월일, 연락처를 서비스 제공 목적으로 수집하며 서비스 종료 시 파기합니다.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem value="b">
            <AccordionHeader>서비스 이용약관 동의</AccordionHeader>
            <AccordionPanel>본 서비스를 이용함으로써 이용약관에 동의한 것으로 간주합니다.</AccordionPanel>
          </AccordionItem>
          <AccordionItem value="c">
            <AccordionHeader>마케팅 정보 수신 동의 (선택)</AccordionHeader>
            <AccordionPanel>이벤트 및 혜택 정보를 이메일, 문자로 받아보실 수 있습니다.</AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
      <div>
        <p className="text-krds-gray-70 mb-3 text-sm font-medium">단일 항목만 열기 (allowMultiple=false)</p>
        <Accordion allowMultiple={false} defaultValue={["x"]}>
          <AccordionItem value="x">
            <AccordionHeader>1단계: 신청서 작성</AccordionHeader>
            <AccordionPanel>필요 정보를 입력하고 서류를 첨부합니다.</AccordionPanel>
          </AccordionItem>
          <AccordionItem value="y">
            <AccordionHeader>2단계: 본인인증</AccordionHeader>
            <AccordionPanel>간편인증 또는 공동인증서로 본인을 확인합니다.</AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

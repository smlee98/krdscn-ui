import {
  ModalRoot,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalClose,
  Button,
  StructuredList,
  StructuredListItem
} from "@/components/ui/krds";

export default function ModalLarge() {
  return (
    <ModalRoot size="lg">
      <ModalTrigger asChild>
        <Button variant="primary">상세 정보 보기</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalClose />
        <ModalHeader title="민원 신청 상세 정보" />
        <ModalBody>
          <StructuredList>
            <StructuredListItem label="민원명" value="주민등록등본 발급" />
            <StructuredListItem label="신청일" value="2024.03.15" />
            <StructuredListItem label="처리기관" value="주민센터" />
            <StructuredListItem label="처리기간" value="즉시 발급" />
            <StructuredListItem label="수수료" value="무료 (정부24 온라인)" />
            <StructuredListItem label="신청인" value="홍길동" />
          </StructuredList>
        </ModalBody>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="secondary">닫기</Button>
          </ModalClose>
          <Button variant="primary">신청하기</Button>
        </ModalFooter>
      </ModalContent>
    </ModalRoot>
  );
}

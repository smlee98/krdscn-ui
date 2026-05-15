import {
  ModalRoot,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalClose,
  Button
} from "@/components/ui/krds";

export default function ModalSmall() {
  return (
    <ModalRoot size="sm">
      <ModalTrigger asChild>
        <Button variant="tertiary" size="small">
          소형 모달
        </Button>
      </ModalTrigger>
      <ModalContent>
        <ModalClose />
        <ModalHeader title="삭제 확인" />
        <ModalBody>이 항목을 삭제하시겠습니까?</ModalBody>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="secondary" size="small">
              취소
            </Button>
          </ModalClose>
          <Button variant="primary" size="small">
            삭제
          </Button>
        </ModalFooter>
      </ModalContent>
    </ModalRoot>
  );
}

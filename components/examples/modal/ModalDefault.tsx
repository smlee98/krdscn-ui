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

export default function ModalDefault() {
  return (
    <ModalRoot>
      <ModalTrigger asChild>
        <Button variant="primary">모달 열기</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalClose />
        <ModalHeader title="민원 신청 확인" />
        <ModalBody descriptionId="modal-default-desc">
          선택하신 민원을 신청하시겠습니까? 신청 후에는 취소가 어려울 수 있습니다.
        </ModalBody>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="secondary">취소</Button>
          </ModalClose>
          <Button variant="primary">확인</Button>
        </ModalFooter>
      </ModalContent>
    </ModalRoot>
  );
}

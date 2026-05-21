import { Button } from "@/components/ui/krds/(action)/button";
import {
  ModalRoot,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalClose
} from "@/components/ui/krds/(layout)/modal";

export default function ModalSizeMd() {
  return (
    <ModalRoot>
      <ModalTrigger asChild>
        <Button variant="primary">모달 열기</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalClose />
        <ModalHeader title="모달 제목" />
        <ModalBody>대화 상자는 사용자에게 작업에 대해 알리고 중요한 정보를 포함합니다.</ModalBody>
        <ModalFooter>
          <Button variant="tertiary" size="medium">
            아니요
          </Button>
          <Button variant="primary" size="medium">
            예
          </Button>
        </ModalFooter>
      </ModalContent>
    </ModalRoot>
  );
}

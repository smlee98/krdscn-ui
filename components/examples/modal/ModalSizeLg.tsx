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

export default function ModalSizeLg() {
  return (
    <ModalRoot size="lg">
      <ModalTrigger asChild>
        <Button variant="default">모달 열기</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalClose />
        <ModalHeader title="모달 제목" />
        <ModalBody>대화 상자는 사용자에게 작업에 대해 알리고 중요한 정보를 포함합니다.</ModalBody>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="tertiary" size="default">
              아니요
            </Button>
          </ModalClose>
          <ModalClose asChild>
            <Button variant="default" size="default">
              예
            </Button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </ModalRoot>
  );
}

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

export default function ModalBottomSheet() {
  return (
    <ModalRoot variant="bottom-sheet">
      <ModalTrigger asChild>
        <Button variant="primary">Bottom Sheet</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalClose />
        <ModalHeader title="하단 시트" />
        <ModalBody>화면 하단에 고정되는 시트 형태의 모달입니다.</ModalBody>
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

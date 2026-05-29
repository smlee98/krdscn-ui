import { Button } from "@/components/ui/dynamic/button";
import {
  ModalRoot,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalClose
} from "@/components/ui/dynamic/modal";

export default function ModalAsChildTrigger() {
  return (
    <ModalRoot>
      <ModalTrigger asChild>
        <Button variant="secondary">모달 열기</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalClose />
        <ModalHeader title="asChild 트리거" />
        <ModalBody>
          <p className="text-krds-gray-70 text-sm">
            <code className="bg-krds-gray-5 rounded px-1 py-0.5 text-xs">asChild</code> prop을 사용하면 외부 컴포넌트를
            모달 트리거로 사용할 수 있습니다.
          </p>
        </ModalBody>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="secondary">닫기</Button>
          </ModalClose>
          <Button variant="default">확인</Button>
        </ModalFooter>
      </ModalContent>
    </ModalRoot>
  );
}

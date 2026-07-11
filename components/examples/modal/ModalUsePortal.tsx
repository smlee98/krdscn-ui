import { Button } from "@/components/ui/dynamic/button"
import {
  ModalRoot,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalClose,
} from "@/components/ui/dynamic/modal"

export default function ModalUsePortal() {
  return (
    <ModalRoot>
      <ModalTrigger asChild>
        <Button variant="default">Portal 모달</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalClose />
        <ModalHeader title="Portal 렌더링" />
        <ModalBody>
          <p className="text-krds-gray-70 text-sm">
            모달 콘텐츠가 document.body에 portal로 렌더링됩니다. z-index 스택 이슈를 방지할 수 있습니다.
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
  )
}

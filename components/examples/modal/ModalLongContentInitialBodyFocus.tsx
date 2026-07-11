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

export default function ModalLongContentInitialBodyFocus() {
  return (
    <ModalRoot>
      <ModalTrigger asChild>
        <Button variant="default">긴 내용 모달</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalClose />
        <ModalHeader title="이용약관 전문" />
        <ModalBody>
          <div className="text-krds-gray-70 flex flex-col gap-3 text-sm">
            {Array.from({ length: 8 }).map((_, i) => (
              <p key={i}>
                제{i + 1}조 (목적) 이 약관은 정부24 서비스 이용에 관한 조건 및 절차, 기타 필요한 사항을 규정함을
                목적으로 합니다. 서비스 이용 전 반드시 확인하시기 바랍니다.
              </p>
            ))}
          </div>
        </ModalBody>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="secondary">취소</Button>
          </ModalClose>
          <Button variant="default">동의</Button>
        </ModalFooter>
      </ModalContent>
    </ModalRoot>
  )
}

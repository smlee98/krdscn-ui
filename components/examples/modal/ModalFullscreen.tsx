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

export default function ModalFullscreen() {
  return (
    <ModalRoot variant="bottom-sheet">
      <ModalTrigger asChild>
        <Button variant="primary">하단 시트 열기</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalClose />
        <ModalHeader title="정렬 및 필터" />
        <ModalBody>
          <div className="flex flex-col gap-3 py-2">
            {["최신순", "가나다순", "조회수순"].map((label) => (
              <label key={label} className="flex cursor-pointer items-center gap-3">
                <input type="radio" name="sort" value={label} className="accent-krds-primary-50" />
                <span className="text-krds-gray-90 text-sm">{label}</span>
              </label>
            ))}
          </div>
        </ModalBody>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="secondary" size="large" className="flex-1">
              초기화
            </Button>
          </ModalClose>
          <Button variant="primary" size="large" className="flex-1">
            적용
          </Button>
        </ModalFooter>
      </ModalContent>
    </ModalRoot>
  );
}

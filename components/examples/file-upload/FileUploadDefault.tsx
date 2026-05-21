import { FileUpload } from "@/components/ui/krds/(input)/file-upload";

export default function FileUploadDefault() {
  return (
    <div className="w-full max-w-[760px] rounded-[12px] border border-[#b1b8be] bg-white p-10">
      <FileUpload
        title="타이틀영역"
        description="컨텐츠 영역"
        uploadText="첨부할 파일을 여기에 끌어다 놓거나, 파일 선택 버튼을 눌러 파일을 직접 선택해주세요."
        maxFiles={10}
        maxFileSize={20 * 1024 * 1024}
        acceptedFileTypes={["pdf", "doc", "docx", "hwp", "jpg", "png"]}
      />
    </div>
  );
}

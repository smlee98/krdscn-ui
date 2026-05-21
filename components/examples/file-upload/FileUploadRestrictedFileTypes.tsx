import { FileUpload } from "@/components/ui/krds/(input)/file-upload";

export default function FileUploadRestrictedFileTypes() {
  return (
    <div className="w-full max-w-[760px] rounded-[12px] border border-[#b1b8be] bg-white p-10">
      <FileUpload
        title="이미지 파일 업로드"
        description="JPG, PNG 파일만 업로드 가능합니다."
        uploadText="이미지 파일을 선택하거나 드래그하여 업로드하세요."
        acceptedFileTypes={["jpg", "png"]}
        maxFiles={5}
      />
    </div>
  );
}

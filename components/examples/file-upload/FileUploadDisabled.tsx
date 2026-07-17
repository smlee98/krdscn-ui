import { FileUpload } from "@/registry/krds/ui/file-upload"

export default function FileUploadDisabled() {
  return (
    <div className="w-full max-w-[760px]">
      <FileUpload variant="line" title="파일 업로드" description="비활성화된 파일 업로드" disabled />
    </div>
  )
}

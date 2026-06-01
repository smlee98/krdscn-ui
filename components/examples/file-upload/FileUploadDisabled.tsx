import { FileUpload } from "@/components/ui/dynamic/file-upload";

export default function FileUploadDisabled() {
  return (
    <div className="w-full max-w-[760px] rounded-[12px] border border-krds-border bg-krds-surface p-10">
      <FileUpload title="파일 업로드" description="비활성화된 파일 업로드" disabled />
    </div>
  );
}

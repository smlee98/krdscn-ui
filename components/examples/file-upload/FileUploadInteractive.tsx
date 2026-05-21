"use client";

import * as React from "react";
import { FileUpload, type FileItem } from "@/components/ui/krds/(input)/file-upload";

export default function FileUploadInteractive() {
  const [files, setFiles] = React.useState<FileItem[]>([]);

  async function handleFileUpload(_file: File): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 2000));
  }

  function handleFileDelete(fileId: string) {
    setFiles((prev) => prev.filter((f) => f.id !== fileId));
  }

  function handleAllFilesDelete() {
    setFiles([]);
  }

  return (
    <div className="w-full max-w-[760px] rounded-[12px] border border-[#b1b8be] bg-white p-10">
      <FileUpload
        title="인터랙티브 파일 업로드"
        description="실제로 파일을 업로드하고 삭제할 수 있습니다."
        uploadText="파일을 선택하거나 드래그하여 업로드하세요."
        maxFiles={5}
        maxFileSize={10 * 1024 * 1024}
        acceptedFileTypes={["pdf", "doc", "docx", "hwp", "jpg", "png"]}
        files={files}
        onFilesChange={setFiles}
        onFileUpload={handleFileUpload}
        onFileDelete={handleFileDelete}
        onAllFilesDelete={handleAllFilesDelete}
      />
    </div>
  );
}

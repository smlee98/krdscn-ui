"use client";

import * as React from "react";
import { FileUpload, type FileItem } from "@/components/ui/krds/file-upload";

export default function FileUploadMultiple() {
  const [files, setFiles] = React.useState<FileItem[]>([
    {
      id: "f1",
      name: "신청서.pdf",
      size: 184_320,
      type: "application/pdf",
      status: "completed"
    },
    {
      id: "f2",
      name: "주민등록등본.hwp",
      size: 64_512,
      type: "application/x-hwp",
      status: "completed"
    }
  ]);

  return (
    <div className="w-full max-w-xl">
      <FileUpload
        title="증빙 서류 (최대 5개)"
        description="파일당 10MB 이하"
        maxFiles={5}
        maxFileSize={10 * 1024 * 1024}
        acceptedFileTypes={[".pdf", ".hwp", ".docx", ".jpg", ".png"]}
        files={files}
        onFilesChange={setFiles}
        allowDelete
      />
    </div>
  );
}

"use client";

import * as React from "react";
import { FileUpload, type FileItem } from "@/components/ui/krds/file-upload";

export default function FileUploadDefault() {
  const [files, setFiles] = React.useState<FileItem[]>([]);

  return (
    <div className="w-full max-w-xl">
      <FileUpload
        title="첨부 파일"
        description="PDF, HWP, DOCX 파일을 업로드할 수 있습니다."
        maxFiles={1}
        maxFileSize={10 * 1024 * 1024}
        acceptedFileTypes={[".pdf", ".hwp", ".docx"]}
        files={files}
        onFilesChange={setFiles}
      />
    </div>
  );
}

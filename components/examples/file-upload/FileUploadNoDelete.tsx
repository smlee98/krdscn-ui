"use client";

import * as React from "react";
import { FileUpload, type FileItem } from "@/components/ui/dynamic/file-upload";

const INITIAL_FILES: FileItem[] = [
  {
    id: "file-1",
    name: "중요한 문서.pdf",
    size: 1024 * 1024,
    type: "pdf",
    status: "completed",
  },
  {
    id: "file-2",
    name: "필수 파일.docx",
    size: 1024 * 1024 * 2,
    type: "docx",
    status: "completed",
  },
];

export default function FileUploadNoDelete() {
  const [files, setFiles] = React.useState<FileItem[]>(INITIAL_FILES);

  return (
    <div className="w-full max-w-[760px] rounded-[12px] border border-[#b1b8be] bg-white p-10">
      <FileUpload
        title="삭제 불가능한 파일 업로드"
        description="파일 삭제가 허용되지 않습니다."
        files={files}
        onFilesChange={setFiles}
        allowDelete={false}
      />
    </div>
  );
}

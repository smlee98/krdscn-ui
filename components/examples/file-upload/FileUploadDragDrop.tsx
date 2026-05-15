"use client";

import * as React from "react";
import { FileUpload, type FileItem } from "@/components/ui/krds/file-upload";

export default function FileUploadDragDrop() {
  const [files, setFiles] = React.useState<FileItem[]>([
    {
      id: "img1",
      name: "프로필.png",
      size: 234_891,
      type: "image/png",
      status: "uploading"
    },
    {
      id: "img2",
      name: "스크린샷.jpg",
      size: 1_204_882,
      type: "image/jpeg",
      status: "error",
      errorMessage: "5MB를 초과한 파일은 업로드할 수 없습니다."
    }
  ]);

  return (
    <div className="w-full max-w-xl">
      <FileUpload
        title="이미지 업로드"
        description="영역을 끌어다 놓거나 클릭하여 파일을 선택하세요."
        uploadText="파일 끌어다 놓기 또는 클릭"
        maxFiles={10}
        maxFileSize={5 * 1024 * 1024}
        acceptedFileTypes={[".png", ".jpg", ".jpeg", ".gif"]}
        files={files}
        onFilesChange={setFiles}
        allowDelete
      />
    </div>
  );
}

"use client"

import * as React from "react"
import { FileUpload, type FileItem } from "@/components/ui/dynamic/file-upload"

const INITIAL_FILES: FileItem[] = [
  {
    id: "file-1",
    name: "업로드중_파일.pdf",
    size: 1024 * 512,
    type: "pdf",
    status: "uploading",
  },
  {
    id: "file-2",
    name: "완료된_파일.docx",
    size: 1024 * 1024 * 2,
    type: "docx",
    status: "completed",
  },
  {
    id: "file-3",
    name: "준비된_파일.hwp",
    size: 1024 * 768,
    type: "hwp",
    status: "ready",
  },
  {
    id: "file-4",
    name: "오류_파일.exe",
    size: 1024 * 1024 * 25,
    type: "exe",
    status: "error",
    errorMessage: "등록 가능한 파일 용량을 초과하였습니다.\n20MB 미만의 파일만 등록할 수 있습니다.",
  },
  {
    id: "file-5",
    name: "다운로드_미리보기_파일.jpg",
    size: 1024 * 1024,
    type: "jpg",
    status: "ready",
    onDownload: () => alert("다운로드"),
    onPreview: () => alert("바로보기"),
  },
  {
    id: "file-6",
    name: "완료된_PDF.pdf",
    size: 1024 * 1024 * 3,
    type: "pdf",
    status: "completed",
  },
]

export default function FileUploadWithFiles() {
  const [files, setFiles] = React.useState<FileItem[]>(INITIAL_FILES)

  return (
    <div className="border-krds-border bg-krds-surface w-full max-w-[760px] rounded-[12px] border p-10">
      <FileUpload
        title="파일 목록 예시"
        description="다양한 상태의 파일 목록을 보여줍니다."
        files={files}
        onFilesChange={setFiles}
        maxFiles={10}
        maxFileSize={20 * 1024 * 1024}
      />
    </div>
  )
}

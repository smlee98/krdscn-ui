"use client"

import * as React from "react"
import { CheckCircle2, CircleAlert, Upload } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/krds/ui/button"

// ── Types ──────────────────────────────────────────────────────────────────

type FileStatus = "ready" | "uploading" | "completed" | "error"

type FileItem = {
  id: string
  name: string
  size: number
  type: string
  status: FileStatus
  errorMessage?: string
  onDownload?: () => void
  onPreview?: () => void
  deletable?: boolean
}

// KRDS's own reference sample (file_upload.html) is actually the `.line` card variant —
// a bordered wrapper with 12px radius and 40px padding (_file_upload.scss:48-56).
// `variant="line"` renders that chrome; `variant="default"` keeps this wrapper's original
// chrome-less look for backward compatibility with existing call sites.
type FileUploadVariant = "default" | "line"

type FileUploadProps = Omit<React.ComponentPropsWithRef<"div">, "onChange" | "children"> & {
  variant?: FileUploadVariant
  title?: string
  description?: string
  uploadText?: string
  maxFiles?: number
  maxFileSize?: number
  acceptedFileTypes?: string[]
  files?: FileItem[]
  onFilesChange?: (files: FileItem[]) => void
  onFileUpload?: (file: File) => Promise<void>
  onFileDelete?: (fileId: string) => void
  onAllFilesDelete?: () => void
  disabled?: boolean
  allowDelete?: boolean
  className?: string
  children?: React.ReactNode
}

// ── Inline SVG Icons ───────────────────────────────────────────────────────

function IconAngleRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconDownload({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path
        d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconDeleteFill({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="20" height="20" rx="10" fill="#CDD1D5" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.06491 4.93451C5.75249 4.62209 5.24595 4.62209 4.93353 4.93451C4.62112 5.24693 4.62112 5.75346 4.93353 6.06588L8.86863 10.001L4.9351 13.9345C4.62268 14.2469 4.62268 14.7535 4.9351 15.0659C5.24752 15.3783 5.75405 15.3783 6.06647 15.0659L10 11.1323L13.9335 15.0659C14.246 15.3783 14.7525 15.3783 15.0649 15.0659C15.3773 14.7535 15.3773 14.2469 15.0649 13.9345L11.1314 10.001L15.0665 6.06588C15.3789 5.75346 15.3789 5.24693 15.0665 4.93451C14.754 4.62209 14.2475 4.62209 13.9351 4.93451L10 8.86961L6.06491 4.93451Z"
        fill="#33363D"
      />
    </svg>
  )
}

// ── Helpers ────────────────────────────────────────────────────────────────

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0B"
  const units = ["B", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(1))}${units[i]}`
}

function getExtension(filename: string): string {
  return filename.split(".").pop()?.toLowerCase() ?? ""
}

// ── Component ──────────────────────────────────────────────────────────────

function FileUpload({
  variant = "default",
  title,
  description,
  uploadText = "첨부할 파일을 여기에 끌어다 놓거나, 파일 선택 버튼을 눌러 파일을 직접 선택해주세요.",
  maxFiles = 10,
  maxFileSize = 20 * 1024 * 1024,
  acceptedFileTypes,
  files: filesProp,
  onFilesChange,
  onFileUpload,
  onFileDelete,
  onAllFilesDelete,
  disabled = false,
  allowDelete = true,
  className,
  children,
  ref,
  ...rest
}: FileUploadProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [internalFiles, setInternalFiles] = React.useState<FileItem[]>([])
  const [isDragActive, setIsDragActive] = React.useState(false)

  const isControlled = filesProp !== undefined
  const files = isControlled ? filesProp : internalFiles

  function setFiles(next: FileItem[]) {
    if (!isControlled) setInternalFiles(next)
    onFilesChange?.(next)
  }

  function validateFile(file: File): { valid: boolean; errorMessage?: string } {
    if (file.size > maxFileSize) {
      return {
        valid: false,
        errorMessage: `등록 가능한 파일 용량을 초과하였습니다.\n${formatBytes(maxFileSize)} 미만의 파일만 등록할 수 있습니다.`,
      }
    }
    if (acceptedFileTypes && acceptedFileTypes.length > 0) {
      const ext = getExtension(file.name)
      if (!acceptedFileTypes.includes(ext)) {
        return {
          valid: false,
          errorMessage: `지원하지 않는 파일 형식입니다.\n${acceptedFileTypes.join(", ")} 형식만 업로드 가능합니다.`,
        }
      }
    }
    return { valid: true }
  }

  async function processFiles(selected: File[]) {
    if (selected.length === 0) return

    const slots = maxFiles - files.length
    if (slots <= 0) return
    const toProcess = selected.slice(0, slots)

    const newItems: FileItem[] = toProcess.map((f) => {
      const { valid, errorMessage } = validateFile(f)
      const ext = getExtension(f.name)
      const baseName = ext ? f.name.replace(new RegExp(`\\.${ext}$`, "i"), "") : f.name
      return {
        id: `${f.name}-${f.lastModified}-${Math.random()}`,
        name: baseName,
        size: f.size,
        type: ext,
        status: valid ? ("ready" as FileStatus) : ("error" as FileStatus),
        errorMessage: valid ? undefined : errorMessage,
      }
    })

    const next = [...files, ...newItems]
    if (!isControlled) setInternalFiles(next)
    onFilesChange?.(next)

    if (onFileUpload) {
      const pairs: Array<[FileItem, File]> = newItems
        .map((item, i): [FileItem, File] | null => {
          const file = toProcess[i]
          return file !== undefined ? [item, file] : null
        })
        .filter((pair): pair is [FileItem, File] => pair !== null)

      for (const [item, file] of pairs) {
        if (item.status === "error") continue

        const withUploading = (current: FileItem[]) =>
          current.map((f) => (f.id === item.id ? { ...f, status: "uploading" as FileStatus } : f))

        if (!isControlled) setInternalFiles((prev) => withUploading(prev))
        onFilesChange?.(withUploading(files.concat(newItems)))

        try {
          await onFileUpload(file)
          const withCompleted = (current: FileItem[]) =>
            current.map((f) => (f.id === item.id ? { ...f, status: "completed" as FileStatus } : f))
          if (!isControlled) setInternalFiles((prev) => withCompleted(prev))
          onFilesChange?.(withCompleted(files.concat(newItems)))
        } catch {
          const withError = (current: FileItem[]) =>
            current.map((f) =>
              f.id === item.id
                ? { ...f, status: "error" as FileStatus, errorMessage: "파일 업로드에 실패했습니다." }
                : f
            )
          if (!isControlled) setInternalFiles((prev) => withError(prev))
          onFilesChange?.(withError(files.concat(newItems)))
        }
      }
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files ?? [])
    e.target.value = ""
    void processFiles(selected)
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    if (!disabled) setIsDragActive(true)
  }

  function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setIsDragActive(false)
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setIsDragActive(false)
    if (disabled) return
    const selected = Array.from(e.dataTransfer.files)
    void processFiles(selected)
  }

  function handleDelete(id: string) {
    if (onFileDelete) {
      onFileDelete(id)
    } else {
      setFiles(files.filter((f) => f.id !== id))
    }
  }

  function handleAllDelete() {
    if (onAllFilesDelete) {
      onAllFilesDelete()
    } else {
      setFiles([])
    }
  }

  const hasHeader = !!(title || description || children)

  return (
    <div
      data-slot="krds-file-upload"
      data-variant={variant}
      ref={ref}
      {...rest}
      className={cn(
        "flex w-full flex-col gap-6",
        variant === "line" && "border-krds-border rounded-[12px] border p-10",
        className
      )}
    >
      {/* Header block */}
      {hasHeader && (
        <div className="flex w-full flex-col gap-4">
          {title && <h3 className="text-krds-heading-md text-krds-foreground-bolder font-bold">{title}</h3>}
          {description && <p className="text-krds-body-md text-krds-foreground-subtle">{description}</p>}
          {children}
        </div>
      )}

      {/* Drop area */}
      <div
        className={cn(
          // KRDS 패딩 6.4rem/4rem = 64px/40px, gap 40px (_file_upload.scss:71-74); 드래그 시
          // 파랑 solid outline이 아니라 dashed border가 gray-30(=border-krds-border)로 바뀜 (:76,88-90).
          "bg-krds-surface-subtle flex w-full flex-col items-center justify-center gap-10 rounded-[12px] border border-dashed border-transparent px-10 py-16 transition-colors",
          isDragActive && !disabled && "border-krds-border",
          disabled && "opacity-60"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <p className="text-krds-body-lg text-krds-foreground text-center">{uploadText}</p>
        <input
          type="file"
          multiple
          accept={acceptedFileTypes?.map((t) => `.${t}`).join(",")}
          disabled={disabled}
          className="sr-only"
          ref={inputRef}
          onChange={handleInputChange}
        />
        <Button
          variant="default"
          size="default"
          disabled={disabled}
          type="button"
          onClick={() => inputRef.current?.click()}
        >
          <Upload className="size-5" /> 파일선택
        </Button>
      </div>

      {/* Count + bulk-delete row */}
      {files.length > 0 && (
        <div className="flex w-full items-center justify-between">
          <div className="text-krds-body-md flex items-baseline gap-1 font-bold">
            <span className="text-krds-foreground-primary">{files.length}개</span>
            <span className="text-krds-foreground">/ {maxFiles}개</span>
          </div>
          {files.length > 1 && allowDelete && (
            <Button variant="tertiary" size="xs" type="button" onClick={handleAllDelete} disabled={disabled}>
              전체 파일 삭제 <IconAngleRight className="size-4" />
            </Button>
          )}
        </div>
      )}

      {/* File list */}
      {files.length > 0 && (
        <ul className="m-0 flex w-full list-none flex-col gap-4 p-0">
          {files.map((file) => (
            <li
              key={file.id}
              className={cn(
                file.status === "error"
                  ? "border-krds-danger-50 bg-krds-surface-danger-subtle flex flex-col items-start justify-center gap-3 rounded-[8px] border-2 p-4"
                  : "border-krds-border-light bg-krds-surface flex items-center gap-4 rounded-[8px] border p-4"
              )}
            >
              {/* Top row */}
              <div className="flex w-full items-center gap-4">
                <div className="text-krds-body-md text-krds-foreground-bolder min-w-0 flex-1">
                  {/* KRDS 파일명은 줄바꿈 없이 1줄 말줄임(ellipsis) 처리 (_file_upload.scss:135) */}
                  <span className="block truncate">
                    {file.name} [{file.type}, {formatBytes(file.size)}]
                  </span>
                </div>
                <div className="flex shrink-0 items-center gap-4">
                  {file.status === "uploading" && (
                    <span
                      role="status"
                      aria-label="업로드 중"
                      className="border-krds-border-light border-t-krds-border-primary inline-block size-5 animate-spin rounded-full border-2"
                    />
                  )}
                  {file.status === "completed" && <CheckCircle2 className="text-krds-foreground-success size-5" />}
                  {file.status === "ready" && (
                    <>
                      {(file.onDownload || file.onPreview) && (
                        <>
                          {file.onDownload && (
                            <Button
                              variant="text"
                              size="default"
                              type="button"
                              onClick={file.onDownload}
                              disabled={disabled}
                            >
                              다운로드 <IconDownload className="size-5" />
                            </Button>
                          )}
                          {file.onPreview && (
                            <Button
                              variant="text"
                              size="default"
                              type="button"
                              onClick={file.onPreview}
                              disabled={disabled}
                            >
                              바로보기 <IconAngleRight className="size-5" />
                            </Button>
                          )}
                        </>
                      )}
                      {allowDelete && file.deletable !== false && (
                        <Button
                          variant="text"
                          size="default"
                          type="button"
                          onClick={() => handleDelete(file.id)}
                          disabled={disabled}
                        >
                          삭제 <IconDeleteFill className="size-5" />
                        </Button>
                      )}
                    </>
                  )}
                  {file.status === "error" && allowDelete && file.deletable !== false && (
                    <Button
                      variant="text"
                      size="default"
                      type="button"
                      onClick={() => handleDelete(file.id)}
                      disabled={disabled}
                    >
                      삭제 <IconDeleteFill className="size-5" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Error row */}
              {file.status === "error" && (
                <>
                  {/* KRDS 구분선은 danger 색이 아니라 divider-gray (border-krds-border로 근사) (_file_upload.scss:175) */}
                  <div className="bg-krds-border h-px w-full" />
                  <div className="flex w-full items-start gap-1">
                    <div className="flex shrink-0 items-start pt-[2px]">
                      <CircleAlert className="text-krds-foreground-danger size-5" />
                    </div>
                    <div className="text-krds-body-md text-krds-foreground-danger flex min-w-0 flex-1 flex-col">
                      {(file.errorMessage ?? "").split("\n").map((line, i) => (
                        <span key={i}>{line}</span>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export { FileUpload }
export type { FileItem, FileStatus, FileUploadProps }

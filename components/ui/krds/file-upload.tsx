"use client";

import * as React from "react";

import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/krds/button";

export type FileUploadSize = "small" | "medium" | "large";

type FileItem = {
  id: string;
  name: string;
  size: number;
  type: string;
  status: "ready" | "uploading" | "completed" | "error";
  errorMessage?: string;
  onDownload?: () => void;
  onPreview?: () => void;
  deletable?: boolean;
};

type FileUploadProps = Omit<React.ComponentPropsWithRef<"div">, "onChange"> & {
  title?: string;
  description?: string;
  uploadText?: string;
  maxFiles?: number;
  maxFileSize?: number;
  acceptedFileTypes?: string[];
  files?: FileItem[];
  onFilesChange?: (files: FileItem[]) => void;
  onFileUpload?: (file: File) => Promise<void>;
  onFileDelete?: (fileId: string) => void;
  onAllFilesDelete?: () => void;
  disabled?: boolean;
  allowDelete?: boolean;
  className?: string;
  children?: React.ReactNode;
};

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function FileUpload({
  title,
  description,
  uploadText = "파일 선택",
  maxFiles,
  maxFileSize,
  acceptedFileTypes,
  files = [],
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
  const inputRef = React.useRef<HTMLInputElement>(null);

  function handleTriggerClick() {
    inputRef.current?.click();
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files ?? []);
    if (selected.length === 0) return;

    const newItems: FileItem[] = selected.map((f) => ({
      id: `${f.name}-${f.lastModified}-${Math.random()}`,
      name: f.name,
      size: f.size,
      type: f.type,
      status: "ready" as const
    }));

    const updated = [...files, ...newItems].slice(0, maxFiles ?? Infinity);
    onFilesChange?.(updated);

    for (const [idx] of newItems.entries()) {
      if (maxFiles && files.length + idx >= maxFiles) break;
      const file = selected[idx];
      if (!file) continue;
      if (onFileUpload) {
        await onFileUpload(file);
      }
    }

    // Reset input so the same file can be re-selected
    e.target.value = "";
  }

  function handleDelete(id: string) {
    onFileDelete?.(id);
    const updated = files.filter((f) => f.id !== id);
    onFilesChange?.(updated);
  }

  const atMax = maxFiles !== undefined && files.length >= maxFiles;

  return (
    <div data-slot="krds-file-upload" ref={ref} className={cn("flex flex-col gap-3", className)} {...rest}>
      {/* Upload trigger area */}
      <div
        className={cn(
          "border-krds-gray-20 bg-krds-gray-5 flex flex-col items-center gap-3 rounded-md border border-dashed p-6",
          disabled && "pointer-events-none opacity-50"
        )}
      >
        {(title || description) && (
          <div className="flex flex-col items-center gap-1 text-center">
            {title && <p className="text-krds-gray-90 text-base font-semibold">{title}</p>}
            {description && <p className="text-krds-gray-50 text-sm">{description}</p>}
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          className="sr-only"
          accept={acceptedFileTypes?.join(",")}
          multiple={maxFiles !== 1}
          disabled={disabled || atMax}
          onChange={handleFileChange}
          aria-hidden="true"
          tabIndex={-1}
        />
        <Button variant="primary" size="medium" disabled={disabled || atMax} onClick={handleTriggerClick} type="button">
          <span className="inline-flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M8 11V2M5 5l3-3 3 3"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-1"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            {uploadText}
          </span>
        </Button>
        {maxFileSize && <span className="text-krds-gray-50 text-xs">최대 {formatBytes(maxFileSize)}</span>}
      </div>

      {/* File list */}
      {files.length > 0 && (
        <ul className="border-krds-gray-20 bg-krds-gray-0 flex flex-col gap-2 rounded-md border p-3">
          {files.map((file) => (
            <li
              key={file.id}
              className={cn(
                "bg-krds-gray-5 flex items-center justify-between rounded px-3 py-2",
                file.status === "error" && "border-krds-danger-50 border"
              )}
            >
              <div className="flex min-w-0 flex-col gap-0.5">
                <span
                  className={cn(
                    "truncate text-xs",
                    file.status === "error" ? "text-krds-danger-50" : "text-krds-gray-90"
                  )}
                >
                  {file.name}
                </span>
                <span className="text-krds-gray-50 text-xs">
                  {formatBytes(file.size)}
                  {file.status === "uploading" && " · 업로드 중..."}
                  {file.status === "completed" && " · 완료"}
                  {file.status === "error" && file.errorMessage ? ` · ${file.errorMessage}` : ""}
                </span>
              </div>

              <div className="ml-2 flex shrink-0 items-center gap-2">
                {file.onPreview && (
                  <button
                    type="button"
                    onClick={file.onPreview}
                    className="text-krds-gray-50 hover:text-krds-gray-90"
                    aria-label={`${file.name} 미리보기`}
                  >
                    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M8 3C4.5 3 1.5 8 1.5 8s3 5 6.5 5 6.5-5 6.5-5-3-5-6.5-5z"
                        stroke="currentColor"
                        strokeWidth="1.2"
                      />
                      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                  </button>
                )}
                {file.onDownload && (
                  <button
                    type="button"
                    onClick={file.onDownload}
                    className="text-krds-gray-50 hover:text-krds-gray-90"
                    aria-label={`${file.name} 다운로드`}
                  >
                    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 2v8M5 7l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                      <path d="M3 12h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  </button>
                )}
                {allowDelete && file.deletable !== false && (
                  <button
                    type="button"
                    onClick={() => handleDelete(file.id)}
                    className="text-krds-gray-50 hover:text-krds-gray-90"
                    aria-label={`${file.name} 삭제`}
                  >
                    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* All delete + custom children */}
      {files.length > 0 && allowDelete && onAllFilesDelete && (
        <div className="flex justify-end">
          <Button variant="text" size="small" onClick={onAllFilesDelete} type="button">
            전체 삭제
          </Button>
        </div>
      )}

      {children}
    </div>
  );
}

export { FileUpload };
export type { FileItem, FileUploadProps };

"use client";

import * as React from "react";
import { CheckCircle2, ChevronRight, CircleAlert, Download, X } from "lucide-react";

import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { useUISystem } from "@/lib/ui-system";
import {
  FileUpload as KrdsFileUpload,
  type FileItem,
  type FileStatus,
  type FileUploadProps
} from "@/components/ui/krds/(input)/file-upload";

export type { FileItem, FileStatus, FileUploadProps } from "@/components/ui/krds/(input)/file-upload";

// Dual-render dispatcher. file-upload had no dispatcher, so examples imported the
// KRDS wrapper directly and rendered KRDS in BOTH systems — leaving KRDS chrome
// (krds primary #0b50d0 count, hardcoded #de3412 error red, the gray-circle X
// delete glyph) visible in shadcn mode. shadcn has no FileUpload primitive, so the
// shadcn branch reconstructs the same behavior/markup with shadcn tokens (primary /
// destructive / muted / border / card) and the vanilla shadcn Button + lucide icons.
// The upload logic (validation, drag/drop, controlled/uncontrolled, async upload
// states) mirrors the KRDS wrapper; only the visuals are retokenized.

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(1))}${units[i]}`;
}

function getExtension(filename: string): string {
  return filename.split(".").pop()?.toLowerCase() ?? "";
}

function ShadcnFileUpload({
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
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [internalFiles, setInternalFiles] = React.useState<FileItem[]>([]);
  const [isDragActive, setIsDragActive] = React.useState(false);

  const isControlled = filesProp !== undefined;
  const files = isControlled ? filesProp : internalFiles;

  function setFiles(next: FileItem[]) {
    if (!isControlled) setInternalFiles(next);
    onFilesChange?.(next);
  }

  function validateFile(file: File): { valid: boolean; errorMessage?: string } {
    if (file.size > maxFileSize) {
      return {
        valid: false,
        errorMessage: `등록 가능한 파일 용량을 초과하였습니다.\n${formatBytes(maxFileSize)} 미만의 파일만 등록할 수 있습니다.`
      };
    }
    if (acceptedFileTypes && acceptedFileTypes.length > 0) {
      const ext = getExtension(file.name);
      if (!acceptedFileTypes.includes(ext)) {
        return {
          valid: false,
          errorMessage: `지원하지 않는 파일 형식입니다.\n${acceptedFileTypes.join(", ")} 형식만 업로드 가능합니다.`
        };
      }
    }
    return { valid: true };
  }

  async function processFiles(selected: File[]) {
    if (selected.length === 0) return;

    const slots = maxFiles - files.length;
    if (slots <= 0) return;
    const toProcess = selected.slice(0, slots);

    const newItems: FileItem[] = toProcess.map((f) => {
      const { valid, errorMessage } = validateFile(f);
      const ext = getExtension(f.name);
      const baseName = ext ? f.name.replace(new RegExp(`\\.${ext}$`, "i"), "") : f.name;
      return {
        id: `${f.name}-${f.lastModified}-${Math.random()}`,
        name: baseName,
        size: f.size,
        type: ext,
        status: valid ? ("ready" as FileStatus) : ("error" as FileStatus),
        errorMessage: valid ? undefined : errorMessage
      };
    });

    const next = [...files, ...newItems];
    if (!isControlled) setInternalFiles(next);
    onFilesChange?.(next);

    if (onFileUpload) {
      const pairs: Array<[FileItem, File]> = newItems
        .map((item, i): [FileItem, File] | null => {
          const file = toProcess[i];
          return file !== undefined ? [item, file] : null;
        })
        .filter((pair): pair is [FileItem, File] => pair !== null);

      for (const [item, file] of pairs) {
        if (item.status === "error") continue;

        const withUploading = (current: FileItem[]) =>
          current.map((f) => (f.id === item.id ? { ...f, status: "uploading" as FileStatus } : f));

        if (!isControlled) setInternalFiles((prev) => withUploading(prev));
        onFilesChange?.(withUploading(files.concat(newItems)));

        try {
          await onFileUpload(file);
          const withCompleted = (current: FileItem[]) =>
            current.map((f) => (f.id === item.id ? { ...f, status: "completed" as FileStatus } : f));
          if (!isControlled) setInternalFiles((prev) => withCompleted(prev));
          onFilesChange?.(withCompleted(files.concat(newItems)));
        } catch {
          const withError = (current: FileItem[]) =>
            current.map((f) =>
              f.id === item.id
                ? { ...f, status: "error" as FileStatus, errorMessage: "파일 업로드에 실패했습니다." }
                : f
            );
          if (!isControlled) setInternalFiles((prev) => withError(prev));
          onFilesChange?.(withError(files.concat(newItems)));
        }
      }
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files ?? []);
    e.target.value = "";
    void processFiles(selected);
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    if (!disabled) setIsDragActive(true);
  }

  function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragActive(false);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragActive(false);
    if (disabled) return;
    const selected = Array.from(e.dataTransfer.files);
    void processFiles(selected);
  }

  function handleDelete(id: string) {
    if (onFileDelete) {
      onFileDelete(id);
    } else {
      setFiles(files.filter((f) => f.id !== id));
    }
  }

  function handleAllDelete() {
    if (onAllFilesDelete) {
      onAllFilesDelete();
    } else {
      setFiles([]);
    }
  }

  const hasHeader = !!(title || description || children);

  return (
    <div data-slot="shadcn-file-upload" ref={ref} {...rest} className={cn("flex w-full flex-col gap-6", className)}>
      {/* Header block */}
      {hasHeader && (
        <div className="flex w-full flex-col gap-4">
          {title && <h3 className="text-foreground text-2xl leading-[1.5] font-bold">{title}</h3>}
          {description && <p className="text-muted-foreground text-base leading-[1.5]">{description}</p>}
          {children}
        </div>
      )}

      {/* Drop area */}
      <div
        className={cn(
          "bg-muted flex w-full flex-col items-center justify-center gap-6 rounded-xl p-10 transition-colors",
          isDragActive && !disabled && "outline-primary outline-2",
          disabled && "opacity-60"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <p className="text-foreground text-center text-base leading-[1.5]">{uploadText}</p>
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
          파일선택
        </Button>
      </div>

      {/* Count + bulk-delete row */}
      {files.length > 0 && (
        <div className="flex w-full items-center justify-between">
          <div className="flex items-baseline gap-1 text-base leading-[1.5] font-bold">
            <span className="text-primary">{files.length}개</span>
            <span className="text-foreground">/ {maxFiles}개</span>
          </div>
          {files.length > 1 && allowDelete && (
            <Button variant="ghost" size="sm" type="button" onClick={handleAllDelete} disabled={disabled}>
              전체 파일 삭제 <ChevronRight className="size-4" />
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
                  ? "border-destructive bg-destructive/10 flex flex-col items-start justify-center gap-3 rounded-lg border-2 p-4"
                  : "bg-card flex items-center gap-4 rounded-lg border p-4"
              )}
            >
              {/* Top row */}
              <div className="flex w-full items-center gap-4">
                <div className="text-foreground min-w-0 flex-1 text-base leading-[1.5]">
                  <span className="break-words">
                    {file.name} [{file.type}, {formatBytes(file.size)}]
                  </span>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {file.status === "uploading" && (
                    <span
                      role="status"
                      aria-label="업로드 중"
                      className="border-muted-foreground/30 border-t-foreground inline-block size-5 animate-spin rounded-full border-2"
                    />
                  )}
                  {file.status === "completed" && <CheckCircle2 className="text-primary size-5" />}
                  {file.status === "ready" && (
                    <>
                      {file.onDownload && (
                        <Button variant="ghost" size="sm" type="button" onClick={file.onDownload} disabled={disabled}>
                          다운로드 <Download className="size-4" />
                        </Button>
                      )}
                      {file.onPreview && (
                        <Button variant="ghost" size="sm" type="button" onClick={file.onPreview} disabled={disabled}>
                          바로보기 <ChevronRight className="size-4" />
                        </Button>
                      )}
                      {allowDelete && file.deletable !== false && (
                        <Button
                          variant="ghost"
                          size="sm"
                          type="button"
                          onClick={() => handleDelete(file.id)}
                          disabled={disabled}
                        >
                          삭제 <X className="size-4" />
                        </Button>
                      )}
                    </>
                  )}
                  {file.status === "error" && allowDelete && file.deletable !== false && (
                    <Button
                      variant="ghost"
                      size="sm"
                      type="button"
                      onClick={() => handleDelete(file.id)}
                      disabled={disabled}
                    >
                      삭제 <X className="size-4" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Error row */}
              {file.status === "error" && (
                <>
                  <div className="bg-destructive/30 h-px w-full" />
                  <div className="flex w-full items-start gap-1">
                    <div className="flex shrink-0 items-start pt-[2px]">
                      <CircleAlert className="text-destructive size-5" />
                    </div>
                    <div className="text-destructive flex min-w-0 flex-1 flex-col text-base leading-[1.5]">
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
  );
}

export function FileUpload(props: FileUploadProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsFileUpload {...props} />;
  return <ShadcnFileUpload {...props} />;
}

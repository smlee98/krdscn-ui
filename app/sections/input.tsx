// rsc:client
"use client";

import { useState } from "react";

import { DemoCard, DemoSection, GroupHeading } from "@/components/krds-app/demo-card";
import { DateInput } from "@/components/ui/krds/date-input";
import { type FileItem, FileUpload } from "@/components/ui/krds/file-upload";
import { TextInput } from "@/components/ui/krds/text-input";
import { Textarea } from "@/components/ui/krds/textarea";

export function InputSection() {
  // DateInput state
  const [date, setDate] = useState("");

  // Textarea state
  const [bio, setBio] = useState("");
  const [bioError, setBioError] = useState("");

  // TextInput states
  const [name, setName] = useState("");
  const [nameWithHelper, setNameWithHelper] = useState("");
  const [nameError, setNameError] = useState("");
  const [nameDisabled] = useState("비활성화된 입력값");

  // FileUpload state
  const [files, setFiles] = useState<FileItem[]>([]);

  function handleNameErrorChange(value: string) {
    setNameError(value);
    // Demo validation
  }

  return (
    <>
      <GroupHeading>입력</GroupHeading>

      <DemoSection id="date-input" title="날짜 입력 필드 (Date input)">
        <DemoCard title="기본형 (중간 크기)">
          <div className="flex flex-col gap-3 w-64">
            <DateInput
              label="날짜 선택"
              size="medium"
              value={date}
              onChange={setDate}
              placeholder="YYYY.MM.DD"
            />
            {date && (
              <p className="text-xs text-muted-foreground">선택된 날짜: {date}</p>
            )}
          </div>
        </DemoCard>
        <DemoCard title="크기 변형">
          <div className="flex flex-col gap-4 w-64">
            <DateInput label="소형 (small)" size="small" placeholder="YYYY.MM.DD" />
            <DateInput label="중형 (medium)" size="medium" placeholder="YYYY.MM.DD" />
            <DateInput label="대형 (large)" size="large" placeholder="YYYY.MM.DD" />
          </div>
        </DemoCard>
      </DemoSection>

      <DemoSection id="textarea" title="텍스트 영역 (Textarea)">
        <DemoCard title="기본형 + 글자 수">
          <div className="w-full max-w-sm">
            <Textarea
              label="자기소개"
              value={bio}
              onChange={setBio}
              showCount
              countTotal={200}
              placeholder="자기소개를 입력하세요 (최대 200자)"
            />
          </div>
        </DemoCard>
        <DemoCard title="오류 상태">
          <div className="w-full max-w-sm">
            <Textarea
              label="내용"
              value={bioError}
              onChange={setBioError}
              placeholder="내용을 입력하세요"
              className="border-krds-danger-50"
            />
            <span className="text-krds-danger-50 text-xs mt-1 block">
              내용을 입력해 주세요.
            </span>
          </div>
        </DemoCard>
        <DemoCard title="비활성화">
          <div className="w-full max-w-sm">
            <Textarea
              label="비활성화"
              value="수정할 수 없는 내용입니다."
              disabled
            />
          </div>
        </DemoCard>
      </DemoSection>

      <DemoSection id="text-input" title="텍스트 입력 필드 (Text input)">
        <DemoCard title="기본형">
          <div className="w-full max-w-sm">
            <TextInput
              label="이름"
              value={name}
              onChange={setName}
              placeholder="홍길동"
              hint="실명을 입력해 주세요."
            />
          </div>
        </DemoCard>
        <DemoCard title="보조 텍스트 포함">
          <div className="w-full max-w-sm space-y-3">
            <TextInput
              label="이메일"
              type="email"
              value={nameWithHelper}
              onChange={setNameWithHelper}
              placeholder="user@example.com"
              information="인증 코드를 받을 이메일 주소를 입력하세요."
            />
          </div>
        </DemoCard>
        <DemoCard title="오류 상태">
          <div className="w-full max-w-sm">
            <TextInput
              label="전화번호"
              value={nameError}
              onChange={handleNameErrorChange}
              placeholder="010-0000-0000"
              error="올바른 전화번호 형식이 아닙니다."
            />
          </div>
        </DemoCard>
        <DemoCard title="비활성화">
          <div className="w-full max-w-sm">
            <TextInput
              label="고정 값"
              value={nameDisabled}
              disabled
            />
          </div>
        </DemoCard>
      </DemoSection>

      <DemoSection id="file-upload" title="파일 업로드 (File upload)">
        <DemoCard title="기본형">
          <div className="w-full max-w-md">
            <FileUpload
              title="파일을 드래그하거나 선택해 주세요"
              description="최대 5개, 각 파일 최대 10MB"
              maxFiles={5}
              maxFileSize={10 * 1024 * 1024}
              files={files}
              onFilesChange={setFiles}
              onAllFilesDelete={() => setFiles([])}
            />
            {files.length > 0 && (
              <p className="text-xs text-muted-foreground mt-2">
                {files.length}개 파일 선택됨
              </p>
            )}
          </div>
        </DemoCard>
      </DemoSection>
    </>
  );
}

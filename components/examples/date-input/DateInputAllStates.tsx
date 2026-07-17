"use client"

import { DateInput } from "@/registry/krds/ui/date-input"
import { FieldHint, FieldError, FieldSuccess, FieldInformation } from "@/registry/krds/ui/field-message"

export default function DateInputAllStates() {
  return (
    <div className="flex w-[360px] flex-col gap-8">
      <DateInput label="기본" />
      <div className="flex flex-col gap-2">
        <DateInput label="도움말" />
        <FieldHint>날짜를 선택해주세요.</FieldHint>
      </div>
      <div className="flex flex-col gap-2">
        <DateInput label="에러" aria-invalid />
        <FieldError>올바른 날짜를 입력해주세요.</FieldError>
      </div>
      <div className="flex flex-col gap-2">
        <DateInput label="성공" defaultValue="2024.12.25" />
        <FieldSuccess>올바른 날짜입니다.</FieldSuccess>
      </div>
      <div className="flex flex-col gap-2">
        <DateInput label="정보" />
        <FieldInformation>YYYY.MM.DD 형식으로 입력해주세요.</FieldInformation>
      </div>
      <DateInput label="비활성화" disabled defaultValue="2024.12.25" />
      <DateInput label="읽기 전용" readOnly defaultValue="2024.12.25" />
    </div>
  )
}

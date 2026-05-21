"use client";

import { DateInput } from "@/components/ui/krds/(input)/date-input";

export default function DateInputAllStates() {
  return (
    <div className="flex w-[360px] flex-col gap-8">
      <DateInput label="기본" />
      <DateInput label="도움말" hint="날짜를 선택해주세요." />
      <DateInput label="에러" error="올바른 날짜를 입력해주세요." />
      <DateInput label="성공" success="올바른 날짜입니다." defaultValue="2024.12.25" />
      <DateInput label="정보" information="YYYY.MM.DD 형식으로 입력해주세요." />
      <DateInput label="비활성화" disabled defaultValue="2024.12.25" />
      <DateInput label="읽기 전용" readOnly defaultValue="2024.12.25" />
    </div>
  );
}

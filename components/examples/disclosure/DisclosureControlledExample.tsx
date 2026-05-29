"use client";

import * as React from "react";
import { Button } from "@/components/ui/dynamic/button";
import { Disclosure, DisclosureTrigger, DisclosureContent } from "@/components/ui/dynamic/disclosure";

export default function DisclosureControlledExample() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Button variant="secondary" size="sm" onClick={() => setOpen((v) => !v)}>
          {open ? "접기" : "펼치기"}
        </Button>
        <span className="text-krds-gray-50 text-sm">
          현재 상태: <strong>{open ? "열림" : "닫힘"}</strong>
        </span>
      </div>
      <Disclosure open={open} onOpenChange={setOpen}>
        <DisclosureTrigger>공지사항 상세 내용</DisclosureTrigger>
        <DisclosureContent>
          <p className="text-krds-gray-70 text-sm">
            2024년 상반기 전자정부 서비스 개편 안내입니다. 3월 25일부터 새로운 UI가 적용됩니다. 서비스 이용에 불편을
            드려 죄송하며, 개선된 서비스로 더욱 편리하게 이용하실 수 있습니다.
          </p>
        </DisclosureContent>
      </Disclosure>
    </div>
  );
}

"use client";

import * as React from "react";
import { Button } from "@/components/ui/dynamic/button";
import {
  InPageNavigation,
  InPageNavigationDescription,
  InPageNavigationEyebrow,
  InPageNavigationFooter,
  InPageNavigationHeader,
  InPageNavigationItem,
  InPageNavigationList,
  InPageNavigationTitle
} from "@/components/ui/dynamic/in-page-navigation";

const sections = [
  { id: "section_01", label: "서비스 개요" },
  { id: "section_02", label: "서비스 상세" },
  { id: "section_03", label: "신청 방법 및 절차" },
  { id: "section_04", label: "제출 서류" },
  { id: "section_05", label: "함께 신청할 수 있는 서비스" },
  { id: "section_06", label: "부가정보" },
  { id: "section_07", label: "정보 변경 내역" }
];

export default function InPageNavigationWithScrollFunctionality() {
  const [active, setActive] = React.useState("intro");

  return (
    <InPageNavigation>
      <InPageNavigationHeader>
        <InPageNavigationEyebrow>이 페이지의 구성</InPageNavigationEyebrow>
        <InPageNavigationTitle>스크롤 기능 테스트</InPageNavigationTitle>
      </InPageNavigationHeader>
      <InPageNavigationList>
        {sections.map((s) => (
          <InPageNavigationItem
            key={s.id}
            href={`#${s.id}`}
            active={active === s.id}
            onClick={(e) => {
              e.preventDefault();
              setActive(s.id);
            }}
          >
            {s.label}
          </InPageNavigationItem>
        ))}
      </InPageNavigationList>
      <InPageNavigationFooter>
        <Button variant="default" size="default" className="w-full">
          상단으로 이동
        </Button>
        <InPageNavigationDescription>현재 보고 있는 섹션이 강조됩니다</InPageNavigationDescription>
      </InPageNavigationFooter>
    </InPageNavigation>
  );
}

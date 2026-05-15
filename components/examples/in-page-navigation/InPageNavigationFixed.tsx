"use client";

import * as React from "react";
import { InPageNavigation, InPageNavigationItem } from "@/components/ui/krds/in-page-navigation";

const sections = [
  { id: "intro", label: "소개" },
  { id: "principles", label: "원칙" },
  { id: "tokens", label: "디자인 토큰" },
  { id: "components", label: "컴포넌트" },
  { id: "patterns", label: "패턴" }
];

export default function InPageNavigationFixed() {
  const [active, setActive] = React.useState("intro");

  return (
    <div className="border-krds-gray-20 rounded-md border bg-white p-3">
      <p className="text-krds-gray-50 mb-2 text-xs">고정 위치 (sticky) 목차</p>
      <InPageNavigation className="border-krds-gray-20 sticky top-2 border-l pl-2">
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
      </InPageNavigation>
    </div>
  );
}

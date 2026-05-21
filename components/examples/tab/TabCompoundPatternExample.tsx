"use client";

import * as React from "react";
import { Tab, TabList, TabTrigger, TabContent, TabPanel } from "@/components/ui/krds/(layout)/tab";

const STEPS = [
  { value: "step1", label: "1단계: 신청서" },
  { value: "step2", label: "2단계: 서류" },
  { value: "step3", label: "3단계: 확인" }
];

export default function TabCompoundPatternExample() {
  const [active, setActive] = React.useState("step1");

  const currentIdx = STEPS.findIndex((s) => s.value === active);
  const isFirst = currentIdx === 0;
  const isLast = currentIdx === STEPS.length - 1;

  return (
    <div className="flex flex-col gap-4">
      <Tab value={active} onValueChange={setActive} variant="fill" type="secondary">
        <TabList>
          {STEPS.map(({ value, label }) => (
            <TabTrigger key={value} value={value}>
              {label}
            </TabTrigger>
          ))}
        </TabList>
        <TabContent>
          <TabPanel value="step1">
            <p className="text-krds-gray-70 text-sm">신청서 정보를 입력합니다.</p>
          </TabPanel>
          <TabPanel value="step2">
            <p className="text-krds-gray-70 text-sm">필요 서류를 첨부합니다.</p>
          </TabPanel>
          <TabPanel value="step3">
            <p className="text-krds-gray-70 text-sm">입력 내용을 최종 확인하고 제출합니다.</p>
          </TabPanel>
        </TabContent>
      </Tab>
      <div className="flex justify-between">
        <button
          disabled={isFirst}
          onClick={() => setActive(STEPS[currentIdx - 1]!.value)}
          className="border-krds-gray-20 rounded-md border px-4 py-2 text-sm disabled:opacity-40"
        >
          이전
        </button>
        <button
          disabled={isLast}
          onClick={() => setActive(STEPS[currentIdx + 1]!.value)}
          className="bg-krds-primary-50 rounded-md px-4 py-2 text-sm text-white disabled:opacity-40"
        >
          다음
        </button>
      </div>
    </div>
  );
}

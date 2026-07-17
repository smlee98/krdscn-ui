"use client"

import { useState } from "react"

import { Tab, TabContent, TabList, TabPanel, TabTrigger } from "@/registry/krds/ui/tab"

const TABS = [
  { value: "overview", label: "개요" },
  { value: "details", label: "상세" },
  { value: "history", label: "이력" },
]

export default function TabControlled() {
  const [value, setValue] = useState("overview")

  return (
    <div className="flex flex-col gap-4">
      <p className="text-krds-gray-70 text-sm">
        현재 선택된 탭: <strong>{value}</strong>
      </p>
      <Tab value={value} onValueChange={setValue}>
        <TabList>
          {TABS.map(({ value: v, label }) => (
            <TabTrigger key={v} value={v}>
              {label}
            </TabTrigger>
          ))}
        </TabList>
        <TabContent>
          {TABS.map(({ value: v, label }) => (
            <TabPanel key={v} value={v}>
              <p className="text-krds-gray-70 py-2 text-sm">
                <strong>{label}</strong> 탭의 콘텐츠입니다. 상위에서 value/onValueChange 로 제어됩니다.
              </p>
            </TabPanel>
          ))}
        </TabContent>
      </Tab>
    </div>
  )
}

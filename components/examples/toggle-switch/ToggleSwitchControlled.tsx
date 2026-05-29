"use client";

import * as React from "react";

import { ToggleSwitch } from "@/components/ui/dynamic/toggle-switch";

export default function ToggleSwitchControlled() {
  const [on, setOn] = React.useState(false);
  return (
    <div className="flex flex-col gap-2">
      <ToggleSwitch label="알림 받기" checked={on} onCheckedChange={setOn} />
      <p className="text-krds-gray-70 text-sm">현재 상태: {on ? "켜짐" : "꺼짐"}</p>
    </div>
  );
}

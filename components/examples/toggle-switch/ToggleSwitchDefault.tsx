"use client";

import * as React from "react";
import { ToggleSwitch } from "@/components/ui/krds/toggle-switch";

export default function ToggleSwitchDefault() {
  const [on, setOn] = React.useState(true);

  return (
    <div className="flex flex-col gap-3">
      <ToggleSwitch checked={on} onCheckedChange={setOn} />
      <ToggleSwitch defaultChecked size="large" />
      <ToggleSwitch />
      <p className="text-krds-gray-70 text-sm">상단 스위치 상태: {on ? "ON" : "OFF"}</p>
    </div>
  );
}

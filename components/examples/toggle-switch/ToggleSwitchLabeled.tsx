"use client";

import * as React from "react";
import { ToggleSwitch } from "@/components/ui/krds/toggle-switch";

export default function ToggleSwitchLabeled() {
  const [push, setPush] = React.useState(true);
  const [email, setEmail] = React.useState(false);
  const [sms, setSms] = React.useState(true);

  return (
    <div className="flex flex-col gap-3">
      <ToggleSwitch label="푸시 알림" size="large" checked={push} onCheckedChange={setPush} />
      <ToggleSwitch label="이메일 알림" checked={email} onCheckedChange={setEmail} />
      <ToggleSwitch label="SMS 알림" checked={sms} onCheckedChange={setSms} />
    </div>
  );
}

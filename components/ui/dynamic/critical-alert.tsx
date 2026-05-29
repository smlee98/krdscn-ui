"use client";

import type * as React from "react";
import {
  CriticalAlert as KrdsCriticalAlert,
  CriticalAlertAction as KrdsCriticalAlertAction,
  CriticalAlertMessage as KrdsCriticalAlertMessage
} from "@/components/ui/krds/(layout)/critical-alert";

export type {
  CriticalAlertProps,
  CriticalAlertMessageProps,
  CriticalAlertActionProps,
  CriticalAlertType
} from "@/components/ui/krds/(layout)/critical-alert";

// shadcn has no CriticalAlert primitive — render KRDS regardless of active UI system.
export function CriticalAlert(props: React.ComponentProps<typeof KrdsCriticalAlert>) {
  return <KrdsCriticalAlert {...props} />;
}

export function CriticalAlertMessage(props: React.ComponentProps<typeof KrdsCriticalAlertMessage>) {
  return <KrdsCriticalAlertMessage {...props} />;
}

export function CriticalAlertAction(props: React.ComponentProps<typeof KrdsCriticalAlertAction>) {
  return <KrdsCriticalAlertAction {...props} />;
}

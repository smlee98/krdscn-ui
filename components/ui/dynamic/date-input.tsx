"use client";

import type * as React from "react";
import {
  DateInput as KrdsDateInput,
  DateInputUnit as KrdsDateInputUnit,
  DateInputPeriodUnit as KrdsDateInputPeriodUnit
} from "@/components/ui/krds/(input)/date-input";

export type {
  DateInputProps,
  DateInputUnitProps,
  DateInputPeriodUnitProps,
  DateInputSize
} from "@/components/ui/krds/(input)/date-input";

// shadcn has no DateInput primitive — always render the KRDS DateInput regardless of active UI system.
export function DateInput(props: React.ComponentProps<typeof KrdsDateInput>) {
  return <KrdsDateInput {...props} />;
}

export function DateInputUnit(props: React.ComponentProps<typeof KrdsDateInputUnit>) {
  return <KrdsDateInputUnit {...props} />;
}

export function DateInputPeriodUnit(props: React.ComponentProps<typeof KrdsDateInputPeriodUnit>) {
  return <KrdsDateInputPeriodUnit {...props} />;
}

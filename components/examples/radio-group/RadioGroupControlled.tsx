"use client";

import * as React from "react";
import { Radio, RadioGroup } from "@/components/ui/krds/radio-group";

export default function RadioGroupControlled() {
  const [value, setValue] = React.useState("standard");

  return (
    <div className="flex flex-col gap-4">
      <RadioGroup name="shipping" value={value} onChange={setValue}>
        <Radio value="standard" description="3~5 영업일 소요, 무료">
          일반 배송
        </Radio>
        <Radio value="express" description="1~2 영업일 소요, 3,000원">
          빠른 배송
        </Radio>
        <Radio value="pickup" description="물품 보관함에서 직접 수령">
          방문 수령
        </Radio>
      </RadioGroup>
      <p className="text-krds-gray-70 text-sm">
        선택된 배송 방법: <span className="text-krds-gray-90 font-medium">{value}</span>
      </p>
    </div>
  );
}

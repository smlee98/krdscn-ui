// rsc:client
"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { DemoCard, DemoSection, GroupHeading } from "@/components/krds-app/demo-card";
import { Button } from "@/components/ui/krds/button";
import { Checkbox } from "@/components/ui/krds/checkbox";
import { DateInput } from "@/components/ui/krds/date-input";
import { Radio, RadioGroup } from "@/components/ui/krds/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/krds/select";
import { TextInput } from "@/components/ui/krds/text-input";
import { Textarea } from "@/components/ui/krds/textarea";
import { ToggleSwitch } from "@/components/ui/krds/toggle-switch";
import { demoFormSchema, type DemoFormValues } from "@/lib/form-schemas";

export function IntegratedDemoSection() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.input<typeof demoFormSchema>, unknown, DemoFormValues>({
    resolver: zodResolver(demoFormSchema),
    defaultValues: { subscribe: false },
  });

  function onSubmit(data: DemoFormValues) {
    alert("제출됨:\n" + JSON.stringify(data, null, 2));
  }

  return (
    <>
      <GroupHeading>인터랙티브 데모</GroupHeading>

      <DemoSection id="integrated-form" title="통합 폼 데모 (Integrated form)">
        <DemoCard description="KRDS 컴포넌트들을 활용한 실제 폼 예시">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg space-y-4">
            {/* name */}
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <TextInput
                  label="이름"
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  error={errors.name?.message}
                  placeholder="홍길동"
                />
              )}
            />

            {/* email */}
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <TextInput
                  label="이메일"
                  type="email"
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  error={errors.email?.message}
                  placeholder="user@example.com"
                />
              )}
            />

            {/* bio */}
            <Controller
              control={control}
              name="bio"
              render={({ field }) => (
                <Textarea
                  label="자기소개"
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  showCount
                  countTotal={500}
                  placeholder="자기소개를 입력하세요 (선택)"
                />
              )}
            />

            {/* department — new Select composition API */}
            <Controller
              control={control}
              name="department"
              render={({ field }) => (
                <div className="flex flex-col gap-1">
                  <label className="text-krds-gray-90 mb-1 text-sm font-medium leading-none">부서</label>
                  <Select value={field.value ?? ""} onValueChange={field.onChange}>
                    <SelectTrigger
                      className="border-krds-gray-30 bg-krds-gray-0 text-krds-gray-90 h-10 w-full rounded border px-3 text-sm"
                      aria-invalid={Boolean(errors.department) || undefined}
                    >
                      <SelectValue placeholder="부서를 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dev">개발</SelectItem>
                      <SelectItem value="design">디자인</SelectItem>
                      <SelectItem value="pm">PM</SelectItem>
                      <SelectItem value="etc">기타</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.department?.message && (
                    <span className="text-krds-danger-50 mt-1 text-sm" role="alert">
                      {errors.department.message}
                    </span>
                  )}
                </div>
              )}
            />

            {/* notify */}
            <div className="flex flex-col gap-1">
              <span className="text-krds-gray-90 text-sm font-medium">알림 방법</span>
              <Controller
                control={control}
                name="notify"
                render={({ field }) => (
                  <RadioGroup value={field.value ?? ""} onChange={field.onChange} name="notify">
                    <Radio value="email">이메일</Radio>
                    <Radio value="sms">SMS</Radio>
                    <Radio value="none">없음</Radio>
                  </RadioGroup>
                )}
              />
              {errors.notify && (
                <span className="text-krds-danger-50 text-sm" role="alert">
                  {errors.notify.message}
                </span>
              )}
            </div>

            {/* joinDate */}
            <Controller
              control={control}
              name="joinDate"
              render={({ field }) => (
                <DateInput
                  label="입사일"
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  error={errors.joinDate?.message}
                />
              )}
            />

            {/* agreement */}
            <Controller
              control={control}
              name="agreement"
              render={({ field }) => (
                <div className="flex flex-col gap-1">
                  <Checkbox label="이용약관에 동의합니다" checked={field.value} onChange={field.onChange} />
                  {errors.agreement && (
                    <span className="text-krds-danger-50 text-sm" role="alert">
                      {errors.agreement.message}
                    </span>
                  )}
                </div>
              )}
            />

            {/* subscribe */}
            <Controller
              control={control}
              name="subscribe"
              render={({ field }) => (
                <ToggleSwitch label="뉴스레터 구독" checked={field.value} onCheckedChange={field.onChange} />
              )}
            />

            <div className="flex gap-2 pt-2">
              <Button type="submit">제출</Button>
              <Button type="button" variant="secondary" onClick={() => reset()}>
                초기화
              </Button>
            </div>
          </form>
        </DemoCard>
      </DemoSection>
    </>
  );
}

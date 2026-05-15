"use client";

import * as React from "react";
import { Button } from "@/components/ui/krds/button";
import { TextInput } from "@/components/ui/krds/text-input";
import { Textarea } from "@/components/ui/krds/textarea";
import { Checkbox } from "@/components/ui/krds/checkbox";
import { Radio, RadioGroup } from "@/components/ui/krds/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/krds/select";

export default function IntegratedFormDemo() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [category, setCategory] = React.useState<string>("");
  const [contact, setContact] = React.useState("email");
  const [message, setMessage] = React.useState("");
  const [agree, setAgree] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const showNameError = submitted && !name.trim();
  const showEmailError = submitted && !email.trim();
  const showCategoryError = submitted && !category;
  const showAgreeError = submitted && !agree;
  const showMessageError = submitted && message.trim().length < 10;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    if (!name.trim() || !email.trim() || !category || !agree || message.trim().length < 10) {
      return;
    }
    console.log("[IntegratedFormDemo] submit", {
      name,
      email,
      category,
      contact,
      message,
      agree
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border-krds-gray-20 flex w-full max-w-xl flex-col gap-5 rounded-md border bg-white p-6"
    >
      <h3 className="text-krds-gray-90 text-lg font-semibold">민원 접수 폼</h3>

      <TextInput
        label="성명"
        required
        value={name}
        onChange={setName}
        placeholder="홍길동"
        error={showNameError ? "성명을 입력해 주세요." : undefined}
      />

      <TextInput
        label="이메일"
        type="email"
        required
        value={email}
        onChange={setEmail}
        placeholder="example@krds.go.kr"
        error={showEmailError ? "이메일을 입력해 주세요." : undefined}
      />

      <div className="flex flex-col gap-1">
        <label className="text-krds-gray-90 text-sm font-medium">
          민원 분류 <span className="text-krds-danger-50">*</span>
        </label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger hasError={showCategoryError}>
            <SelectValue placeholder="분류를 선택하세요" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="welfare">복지</SelectItem>
            <SelectItem value="tax">세무</SelectItem>
            <SelectItem value="document">증명서</SelectItem>
            <SelectItem value="other">기타</SelectItem>
          </SelectContent>
        </Select>
        {showCategoryError && <span className="text-krds-danger-50 text-xs">민원 분류를 선택해 주세요.</span>}
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-krds-gray-90 text-sm font-medium">회신 방법</span>
        <RadioGroup name="contact" value={contact} onChange={setContact} column={false}>
          <Radio value="email">이메일</Radio>
          <Radio value="sms">SMS</Radio>
          <Radio value="post">우편</Radio>
        </RadioGroup>
      </div>

      <Textarea
        label="문의 내용 (10자 이상)"
        value={message}
        onChange={setMessage}
        rows={5}
        showCount
        countTotal={500}
        maxLength={500}
        placeholder="문의하실 내용을 자세히 작성해 주세요."
      />
      {showMessageError && <span className="text-krds-danger-50 -mt-3 text-xs">최소 10자 이상 입력해 주세요.</span>}

      <Checkbox label="개인정보 수집·이용에 동의합니다." checked={agree} onChange={setAgree} />
      {showAgreeError && (
        <span className="text-krds-danger-50 -mt-3 text-xs">개인정보 수집·이용에 동의해야 제출할 수 있습니다.</span>
      )}

      <div className="flex items-center gap-2">
        <Button type="submit" variant="primary" size="medium">
          제출
        </Button>
        <Button type="reset" variant="tertiary" size="medium" onClick={() => setSubmitted(false)}>
          초기화
        </Button>
      </div>
    </form>
  );
}

import { Radio, RadioGroup } from "@/components/ui/krds/radio-group";

export default function RadioGroupDefault() {
  return (
    <RadioGroup name="contact-method" defaultValue="email">
      <Radio value="email">이메일</Radio>
      <Radio value="sms">SMS</Radio>
      <Radio value="kakao">카카오 알림톡</Radio>
      <Radio value="post">우편</Radio>
    </RadioGroup>
  );
}

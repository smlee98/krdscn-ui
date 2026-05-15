import { CriticalAlert, CriticalAlertTitle, CriticalAlertDescription } from "@/components/ui/krds";

export default function CriticalAlertDefault() {
  return (
    <CriticalAlert>
      <CriticalAlertTitle>시스템 점검 안내</CriticalAlertTitle>
      <CriticalAlertDescription>2024년 3월 20일(수) 00:00 ~ 06:00 서비스 점검이 진행됩니다.</CriticalAlertDescription>
    </CriticalAlert>
  );
}

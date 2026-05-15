import { CriticalAlert, CriticalAlertTitle, CriticalAlertDescription } from "@/components/ui/krds";

export default function CriticalAlertSuccess() {
  return (
    <CriticalAlert className="bg-krds-success-50">
      <CriticalAlertTitle>신청이 완료되었습니다</CriticalAlertTitle>
      <CriticalAlertDescription>
        민원 신청이 정상적으로 접수되었습니다. 처리 결과는 이메일로 안내드립니다.
      </CriticalAlertDescription>
    </CriticalAlert>
  );
}

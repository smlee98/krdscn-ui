import { CriticalAlert, CriticalAlertTitle, CriticalAlertDescription } from "@/components/ui/krds";

export default function CriticalAlertDanger() {
  return (
    <CriticalAlert>
      <CriticalAlertTitle>접근 제한 안내</CriticalAlertTitle>
      <CriticalAlertDescription>
        비밀번호 5회 오류로 계정이 잠겼습니다. 본인인증 후 잠금을 해제해 주세요.
      </CriticalAlertDescription>
    </CriticalAlert>
  );
}

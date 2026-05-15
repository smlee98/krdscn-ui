import { CriticalAlert, CriticalAlertTitle, CriticalAlertDescription } from "@/components/ui/krds";

export default function CriticalAlertWarning() {
  return (
    <CriticalAlert className="text-krds-gray-90 bg-[#ffb114]">
      <CriticalAlertTitle>보안 주의 안내</CriticalAlertTitle>
      <CriticalAlertDescription>
        비밀번호 변경 후 90일이 경과하였습니다. 보안을 위해 비밀번호를 변경해 주세요.
      </CriticalAlertDescription>
    </CriticalAlert>
  );
}

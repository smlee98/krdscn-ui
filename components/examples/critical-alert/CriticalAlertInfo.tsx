import { CriticalAlert, CriticalAlertTitle, CriticalAlertDescription } from "@/components/ui/krds";

export default function CriticalAlertInfo() {
  return (
    <CriticalAlert className="bg-krds-info-50">
      <CriticalAlertTitle>서비스 업데이트 안내</CriticalAlertTitle>
      <CriticalAlertDescription>
        새로운 기능이 추가되었습니다. 자세한 내용은 공지사항을 확인해 주세요.
      </CriticalAlertDescription>
    </CriticalAlert>
  );
}

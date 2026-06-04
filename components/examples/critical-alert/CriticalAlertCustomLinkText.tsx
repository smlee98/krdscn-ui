import { CriticalAlert, CriticalAlertAction, CriticalAlertMessage } from "@/components/ui/dynamic/critical-alert";

export default function CriticalAlertCustomLinkText() {
  return (
    <CriticalAlert className="w-full" type="info">
      <CriticalAlertMessage>긴급 공지 내용 표시</CriticalAlertMessage>
      <CriticalAlertAction href="#">더 보기</CriticalAlertAction>
    </CriticalAlert>
  );
}

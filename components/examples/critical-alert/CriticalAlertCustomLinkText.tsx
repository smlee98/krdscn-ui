import { CriticalAlert, CriticalAlertAction, CriticalAlertMessage } from "@/components/ui/krds/(layout)/critical-alert";

export default function CriticalAlertCustomLinkText() {
  return (
    <CriticalAlert type="info">
      <CriticalAlertMessage>긴급 공지 내용 표시</CriticalAlertMessage>
      <CriticalAlertAction href="#">더 보기</CriticalAlertAction>
    </CriticalAlert>
  );
}

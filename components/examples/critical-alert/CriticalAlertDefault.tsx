import { CriticalAlert, CriticalAlertAction, CriticalAlertMessage } from "@/components/ui/krds/(layout)/critical-alert";

export default function CriticalAlertDefault() {
  return (
    <CriticalAlert type="emergency">
      <CriticalAlertMessage>긴급 공지 내용 표시</CriticalAlertMessage>
      <CriticalAlertAction href="#">자세히보기</CriticalAlertAction>
    </CriticalAlert>
  );
}

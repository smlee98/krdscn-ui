import { CriticalAlert, CriticalAlertAction, CriticalAlertMessage } from "@/registry/krds/ui/critical-alert"

export default function CriticalAlertDefault() {
  return (
    <CriticalAlert className="w-full" type="emergency">
      <CriticalAlertMessage>긴급 공지 내용 표시</CriticalAlertMessage>
      <CriticalAlertAction href="#">자세히보기</CriticalAlertAction>
    </CriticalAlert>
  )
}

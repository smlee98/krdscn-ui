import { CriticalAlert, CriticalAlertMessage } from "@/registry/krds/ui/critical-alert"

export default function CriticalAlertWithoutLink() {
  return (
    <CriticalAlert className="w-full" type="safety">
      <CriticalAlertMessage>긴급 공지 내용 표시</CriticalAlertMessage>
    </CriticalAlert>
  )
}

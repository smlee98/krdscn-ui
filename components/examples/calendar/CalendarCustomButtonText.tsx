import { Calendar } from "@/components/ui/dynamic/calendar"

export default function CalendarCustomButtonText() {
  return (
    <Calendar
      mode="single"
      defaultValue="2024.12.07"
      todayButtonText="Today"
      cancelButtonText="Cancel"
      confirmButtonText="OK"
    />
  )
}

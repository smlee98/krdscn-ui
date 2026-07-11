import { Calendar } from "@/components/ui/dynamic/calendar"

export default function CalendarWithEventDates() {
  return <Calendar mode="single" defaultValue="2024.12.07" eventDates={["2024.12.08", "2024.12.15", "2024.12.22"]} />
}

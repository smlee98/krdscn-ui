import { Calendar } from "@/components/ui/dynamic/calendar";

export default function CalendarWithDefaultRange() {
  return <Calendar mode="range" defaultStartDate="2024.12.07" defaultEndDate="2024.12.16" />;
}

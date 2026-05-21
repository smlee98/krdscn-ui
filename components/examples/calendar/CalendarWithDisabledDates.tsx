import { Calendar } from "@/components/ui/krds/(layout)/calendar";

export default function CalendarWithDisabledDates() {
  return (
    <Calendar mode="single" defaultValue="2024.12.07" disabledDates={["2024.12.13", "2024.12.25", "2024.12.31"]} />
  );
}

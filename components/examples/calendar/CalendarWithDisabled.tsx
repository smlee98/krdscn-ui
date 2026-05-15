import { Calendar } from "@/components/ui/krds";

export default function CalendarWithDisabled() {
  return (
    <Calendar
      mode="single"
      defaultValue="2024.03.15"
      disabledDates={["2024.03.10", "2024.03.11", "2024.03.17", "2024.03.18"]}
      eventDates={["2024.03.20", "2024.03.25"]}
    />
  );
}

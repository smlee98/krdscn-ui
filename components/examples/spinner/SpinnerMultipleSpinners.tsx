import { Spinner } from "@/components/ui/dynamic/spinner";

export default function SpinnerMultipleSpinners() {
  return (
    <div className="flex flex-col gap-5">
      <Spinner size="large" label="Loading data.." />
      <Spinner size="medium" label="Processing..." />
      <Spinner size="small" />
    </div>
  );
}

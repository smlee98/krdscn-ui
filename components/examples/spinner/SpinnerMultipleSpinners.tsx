import { Spinner } from "@/components/ui/dynamic/spinner"

export default function SpinnerMultipleSpinners() {
  return (
    <div className="flex flex-col gap-5">
      <Spinner size="large" showLabel label="Loading data.." />
      <Spinner size="medium" showLabel label="Processing..." />
      <Spinner size="small" aria-label="로딩 중" />
    </div>
  )
}

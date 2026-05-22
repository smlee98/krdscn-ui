import { Spinner } from "@/components/ui/dynamic/spinner";

export default function SpinnerMultipleSpinners() {
  return (
    <div className="flex flex-col gap-5">
      <div role="status" className="inline-flex items-center gap-3">
        <Spinner size="large" />
        <span className="sr-only">로딩 중</span>
        <span className="text-krds-gray-90 text-[0.9375rem]">Loading data..</span>
      </div>
      <div role="status" className="inline-flex items-center gap-3">
        <Spinner size="medium" />
        <span className="sr-only">로딩 중</span>
        <span className="text-krds-gray-90 text-[0.9375rem]">Processing...</span>
      </div>
      <Spinner size="small" aria-label="로딩 중" />
    </div>
  );
}

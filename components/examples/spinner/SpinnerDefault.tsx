import { Spinner } from "@/components/ui/dynamic/spinner";

export default function SpinnerDefault() {
  return (
    <div role="status" className="inline-flex items-center gap-3">
      <Spinner size="small" />
      <span className="sr-only">로딩 중</span>
      <span className="text-krds-gray-90 text-[0.9375rem]">Loading data..</span>
    </div>
  );
}

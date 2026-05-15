import { Spinner } from "@/components/ui/krds/spinner";

export default function SpinnerSizes() {
  return (
    <div className="flex flex-wrap items-center gap-10">
      <div className="flex flex-col items-center gap-2">
        <Spinner label="소형 스피너" className="[&>span:first-child]:size-4 [&>span:first-child]:border" />
        <span className="text-krds-gray-50 text-xs">Small</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner label="중형 스피너 (기본)" />
        <span className="text-krds-gray-50 text-xs">Medium (기본)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner label="대형 스피너" className="[&>span:first-child]:size-10 [&>span:first-child]:border-[3px]" />
        <span className="text-krds-gray-50 text-xs">Large</span>
      </div>
    </div>
  );
}

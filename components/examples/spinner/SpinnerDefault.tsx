import { Spinner } from "@/components/ui/krds/spinner";

export default function SpinnerDefault() {
  return (
    <div className="flex flex-wrap items-center gap-8">
      <Spinner />
      <Spinner label="데이터 불러오는 중">
        <span className="text-krds-gray-50 text-xs">로딩 중...</span>
      </Spinner>
    </div>
  );
}

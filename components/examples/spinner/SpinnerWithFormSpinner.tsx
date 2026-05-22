import { Spinner } from "@/components/ui/dynamic/spinner";

export default function SpinnerWithFormSpinner() {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="consult_name" className="text-krds-gray-90 text-[0.9375rem] font-medium">
        Label
      </label>
      <div className="relative inline-flex w-fit items-center">
        <input
          id="consult_name"
          type="text"
          placeholder="placeholder"
          disabled
          className="border-krds-gray-30 text-krds-gray-90 placeholder:text-krds-gray-50 disabled:bg-krds-gray-5 disabled:text-krds-gray-50 h-10 w-64 rounded-md border px-3 text-[0.9375rem] disabled:cursor-not-allowed"
        />
        <Spinner
          size="small"
          aria-label="로딩 중"
          className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2"
        />
      </div>
    </div>
  );
}

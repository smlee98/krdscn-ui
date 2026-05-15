import { Resize } from "@/components/ui/krds/resize";

export default function ResizeDefault() {
  return (
    <div data-krds-resize-scope className="border-krds-gray-10 flex flex-col gap-4 rounded-lg border p-5">
      <Resize defaultScale="M" />
      <p
        style={{ fontSize: "calc(1rem * var(--krds-font-scale, 1))" }}
        className="text-krds-gray-80 max-w-prose leading-relaxed"
      >
        S / M / L 버튼으로 이 텍스트의 글자 크기가 변합니다.
        <br />
        소(S): 87.5% · 중(M): 100% · 대(L): 112.5%
      </p>
    </div>
  );
}

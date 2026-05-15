import { Link } from "@/components/ui/krds/link";

export default function LinkInline() {
  return (
    <p className="text-krds-gray-80 max-w-prose text-sm leading-relaxed">
      KRDS 디자인 시스템은{" "}
      <Link href="/components" variant="default" underline="always" size="small">
        42개의 컴포넌트
      </Link>
      를 제공하여 정부 서비스 UI 개발 표준을 따르도록 지원합니다. 자세한 내용은{" "}
      <Link href="/components/button" variant="default" size="small">
        버튼 가이드라인
      </Link>
      을 참고하세요.
    </p>
  );
}

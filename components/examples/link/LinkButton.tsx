import { Link } from "@/components/ui/krds/link";

export default function LinkButton() {
  return (
    <div className="flex flex-col gap-4">
      {/* asChild: Link 스타일이 자식 button 요소에 그대로 적용됨 */}
      <Link asChild variant="default" underline="hover">
        <button type="button">링크 스타일 버튼 (asChild)</button>
      </Link>
      {/* href 없는 링크 — <span role="link">으로 렌더링 */}
      <Link variant="basic" underline="always">
        href 없는 링크 — span으로 렌더링
      </Link>
      <Link variant="unstyled" size="small">
        unstyled variant — 스타일 없음
      </Link>
    </div>
  );
}

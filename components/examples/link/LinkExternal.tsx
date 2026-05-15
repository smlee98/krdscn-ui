import { Link } from "@/components/ui/krds/link";

export default function LinkExternal() {
  return (
    <div className="flex flex-col gap-4">
      <Link href="https://www.korea.go.kr" external>
        대한민국 정부 (새 탭에서 열림)
      </Link>
      <Link href="https://www.nia.or.kr" external variant="basic" underline="hover" size="small">
        한국지능정보사회진흥원 (새 탭)
      </Link>
      <Link href="https://www.mois.go.kr" external underline="none" size="xsmall">
        행정안전부 (새 탭, 밑줄 없음)
      </Link>
    </div>
  );
}

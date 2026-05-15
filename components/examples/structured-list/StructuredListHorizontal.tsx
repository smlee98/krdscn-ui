import { StructuredList, StructuredListItem } from "@/components/ui/krds";

export default function StructuredListHorizontal() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-krds-gray-50 mb-2 text-xs">라벨 1/4 폭 — 컴팩트 가로 배치</p>
        <StructuredList>
          <StructuredListItem label="기관명" value="행정안전부" className="[&>dt]:w-1/4" />
          <StructuredListItem label="설립연도" value="1948년" className="[&>dt]:w-1/4" />
          <StructuredListItem label="주소" value="세종특별자치시 도움6로 11" className="[&>dt]:w-1/4" />
        </StructuredList>
      </div>
      <div>
        <p className="text-krds-gray-50 mb-2 text-xs">라벨 1/2 폭 — 넓은 가로 배치</p>
        <StructuredList>
          <StructuredListItem label="주요업무" value="전자정부 서비스 운영 및 개선" className="[&>dt]:w-1/2" />
          <StructuredListItem label="홈페이지" value="www.mois.go.kr" className="[&>dt]:w-1/2" />
        </StructuredList>
      </div>
    </div>
  );
}

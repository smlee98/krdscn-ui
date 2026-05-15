import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/krds";

const ROWS = [
  { code: "A01", name: "주민등록", fee: "무료", period: "즉시" },
  { code: "A02", name: "가족관계", fee: "무료", period: "즉시" },
  { code: "B01", name: "부동산등기", fee: "700원", period: "즉시" },
  { code: "C01", name: "자동차등록", fee: "1,000원", period: "1일" },
  { code: "D01", name: "건강보험", fee: "무료", period: "즉시" },
  { code: "E01", name: "연금보험", fee: "무료", period: "즉시" }
];

export default function TableCompact() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="py-2 text-xs">코드</TableHead>
          <TableHead className="py-2 text-xs">민원명</TableHead>
          <TableHead className="py-2 text-xs">수수료</TableHead>
          <TableHead className="py-2 text-xs">처리기간</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ROWS.map((row) => (
          <TableRow key={row.code}>
            <TableCell className="text-krds-gray-50 py-1.5 text-xs">{row.code}</TableCell>
            <TableCell className="py-1.5 text-xs">{row.name}</TableCell>
            <TableCell className="py-1.5 text-xs">{row.fee}</TableCell>
            <TableCell className="py-1.5 text-xs">{row.period}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

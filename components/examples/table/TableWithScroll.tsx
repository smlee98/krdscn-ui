import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/registry/krds/ui/table"

const ALL_ROWS = Array.from({ length: 15 }, (_, i) => ({
  id: `2024-${String(i + 1).padStart(3, "0")}`,
  name: ["주민등록등본", "건강보험확인서", "소득확인서", "납세완납증명"][i % 4]!,
  dept: ["주민센터", "건강보험공단", "세무서", "국세청"][i % 4]!,
  date: `2024.03.${String((i % 28) + 1).padStart(2, "0")}`,
  status: i % 3 === 0 ? "처리중" : "완료",
}))

export default function TableWithScroll() {
  return (
    <div className="max-h-64 w-full overflow-y-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="sticky top-0 bg-white">접수번호</TableHead>
            <TableHead className="sticky top-0 bg-white">민원명</TableHead>
            <TableHead className="sticky top-0 bg-white">담당기관</TableHead>
            <TableHead className="sticky top-0 bg-white">신청일</TableHead>
            <TableHead className="sticky top-0 bg-white">상태</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ALL_ROWS.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="font-mono text-xs">{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.dept}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

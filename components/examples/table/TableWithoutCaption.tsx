import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/krds/(layout)/table";

const ROWS = [
  { id: "2024-001", name: "주민등록등본 발급", dept: "주민센터", date: "2024.03.15", status: "완료" },
  { id: "2024-002", name: "건강보험료 납부확인", dept: "건강보험공단", date: "2024.03.14", status: "처리중" },
  { id: "2024-003", name: "자동차세 조회", dept: "세무서", date: "2024.03.13", status: "완료" }
];

export default function TableWithoutCaption() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>접수번호</TableHead>
          <TableHead>민원명</TableHead>
          <TableHead>담당기관</TableHead>
          <TableHead>신청일</TableHead>
          <TableHead>상태</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ROWS.map((row) => (
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
  );
}

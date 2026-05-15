import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell, TableCaption } from "@/components/ui/krds";

export default function TableEmpty() {
  return (
    <Table>
      <TableCaption>신청 내역</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>접수번호</TableHead>
          <TableHead>민원명</TableHead>
          <TableHead>신청일</TableHead>
          <TableHead>상태</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell colSpan={4} className="text-krds-gray-50 py-12 text-center">
            신청 내역이 없습니다.
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

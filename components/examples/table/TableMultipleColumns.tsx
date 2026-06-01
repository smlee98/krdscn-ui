import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from "@/components/ui/dynamic/table";

export default function TableMultipleColumns() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>항목</TableHead>
          <TableHead>설명</TableHead>
          <TableHead>상태</TableHead>
          <TableHead>날짜</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableHead>항목1</TableHead>
          <TableCell>첫 번째 항목에 대한 설명입니다.</TableCell>
          <TableCell>완료</TableCell>
          <TableCell>2024-01-01</TableCell>
        </TableRow>
        <TableRow>
          <TableHead>항목2</TableHead>
          <TableCell>두 번째 항목에 대한 설명입니다.</TableCell>
          <TableCell>진행중</TableCell>
          <TableCell>2024-01-15</TableCell>
        </TableRow>
        <TableRow>
          <TableHead>항목3</TableHead>
          <TableCell>세 번째 항목에 대한 설명입니다.</TableCell>
          <TableCell>대기</TableCell>
          <TableCell>2024-02-01</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

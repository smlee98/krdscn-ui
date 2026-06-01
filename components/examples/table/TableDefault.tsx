import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from "@/components/ui/dynamic/table";

export default function TableDefault() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>제목1</TableHead>
          <TableHead>제목2</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableHead>제목1-1</TableHead>
          <TableCell>
            내용이 들어갑니다. 내용이 들어갑니다. 내용이 들어갑니다. 내용이 들어갑니다. 내용이 들어갑니다. 내용이
            들어갑니다. 내용이 들어갑니다. 내용이 들어갑니다. 내용이 들어갑니다. 내용이 들어갑니다. 내용이 들어갑니다.
            내용이 들어갑니다. 내용이 들어갑니다.
          </TableCell>
        </TableRow>
        <TableRow>
          <TableHead>제목1-2</TableHead>
          <TableCell>내용이 들어갑니다.</TableCell>
        </TableRow>
        <TableRow>
          <TableHead>제목1-3</TableHead>
          <TableCell>내용이 들어갑니다. 내용이 들어갑니다. 내용이 들어갑니다. 내용이 들어갑니다.</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableCaption
} from "@/components/ui/dynamic/table";

export default function TableDefault() {
  return (
    <Table>
      <TableCaption>
        000에 대한 표로 제목1,제목2에 대한 내용으로 구성되어 있으며 제목1은 제목1-1,제목1-2,제목1-3으로 구성되어있다.
      </TableCaption>
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

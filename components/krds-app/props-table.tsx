// rsc:safe

import { cn } from "@/lib/cn";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export type { PropsDoc };
export { PropsTable };

type PropsDoc = {
  name: string;
  type: string;
  defaultValue?: string;
  description?: string;
  required?: boolean;
};

function PropsTable({ data, className }: { data: PropsDoc[] | null | undefined; className?: string }) {
  if (data == null || data.length === 0) {
    return <p className="text-muted-foreground text-sm">이 컴포넌트에 대한 props 문서를 아직 생성하지 않았습니다.</p>;
  }

  return (
    <div className={cn("w-full", className)}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>이름</TableHead>
            <TableHead>타입</TableHead>
            <TableHead>기본값</TableHead>
            <TableHead>설명</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((prop) => (
            <TableRow key={prop.name}>
              <TableCell>
                <span className="font-mono text-sm">{prop.name}</span>
                {prop.required && <span className="text-destructive ml-1 text-xs font-medium">필수</span>}
              </TableCell>
              <TableCell>
                <span className="font-mono text-sm">{prop.type}</span>
              </TableCell>
              <TableCell>
                {prop.defaultValue != null ? (
                  <span className="text-muted-foreground font-mono text-sm">{prop.defaultValue}</span>
                ) : (
                  <span className="text-muted-foreground text-sm">—</span>
                )}
              </TableCell>
              <TableCell>
                <span className="text-sm">{prop.description ?? "—"}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

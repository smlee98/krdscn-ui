// rsc:server-only — MDX에서 <PropsTable name="KrdsButton" /> 형태로 사용.
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getPropsData } from "@/lib/get-props-data"

export type PropsDoc = {
  name: string
  type: string
  defaultValue?: string
  description?: string
  required?: boolean
}

export function PropsTable({ name }: { name: string }) {
  const data = getPropsData(name)

  if (data == null || data.length === 0) {
    return (
      <p className="text-muted-foreground my-4 text-sm">이 컴포넌트에 대한 props 문서를 아직 생성하지 않았습니다.</p>
    )
  }

  return (
    <div className="my-6 w-full overflow-hidden rounded-xl border">
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
              <TableCell className="align-top">
                <span className="font-mono text-sm">{prop.name}</span>
                {prop.required && <span className="text-destructive ml-1 text-xs font-medium">필수</span>}
              </TableCell>
              <TableCell className="align-top">
                <span className="font-mono text-sm break-words">{prop.type}</span>
              </TableCell>
              <TableCell className="align-top">
                {prop.defaultValue != null ? (
                  <span className="text-muted-foreground font-mono text-sm">{prop.defaultValue}</span>
                ) : (
                  <span className="text-muted-foreground text-sm">—</span>
                )}
              </TableCell>
              <TableCell className="align-top">
                <span className="text-sm">{prop.description ? prop.description : "—"}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

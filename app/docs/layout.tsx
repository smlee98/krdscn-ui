import { DocsSidebar } from "@/components/docs/docs-sidebar"
import { source } from "@/lib/source"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container-wrapper flex flex-1 flex-col px-2">
      <div className="min-h-min flex-1 items-start px-0 lg:grid lg:grid-cols-[18rem_minmax(0,1fr)]">
        <DocsSidebar tree={source.pageTree} />
        <div className="h-full w-full">{children}</div>
      </div>
    </div>
  )
}

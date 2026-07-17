import { Breadcrumb, BreadcrumbHome, BreadcrumbItem, BreadcrumbList } from "@/registry/krds/ui/breadcrumb"

export default function BreadcrumbSingleItem() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbHome href="#" />
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

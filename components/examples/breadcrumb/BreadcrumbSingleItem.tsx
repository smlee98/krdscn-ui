import {
  Breadcrumb,
  BreadcrumbHome,
  BreadcrumbItem,
  BreadcrumbList
} from "@/components/ui/krds/(navigation)/breadcrumb";

export default function BreadcrumbSingleItem() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbHome href="#" />
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

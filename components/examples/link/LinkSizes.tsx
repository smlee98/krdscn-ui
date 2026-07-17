import { Link } from "@/registry/krds/ui/link"

export default function LinkSizes() {
  return (
    <div className="flex flex-col items-start gap-4">
      <Link size="sm" href="#">
        Small 크기 (15px)
      </Link>
      <Link size="default" href="#">
        Medium 크기 (17px)
      </Link>
      <Link size="lg" href="#">
        Large 크기 (19px)
      </Link>
    </div>
  )
}

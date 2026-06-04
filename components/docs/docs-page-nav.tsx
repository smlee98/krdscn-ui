import Link from "next/link"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

type NavItem = {
  name?: React.ReactNode
  url: string
}

export function DocsPageNav({ previous, next }: { previous?: NavItem | null; next?: NavItem | null }) {
  return (
    <div className="hidden h-16 w-full items-center gap-2 sm:flex">
      {previous ? (
        <Button variant="ghost" size="sm" asChild>
          <Link href={previous.url}>
            <ArrowLeftIcon /> {previous.name}
          </Link>
        </Button>
      ) : null}
      {next ? (
        <Button variant="ghost" size="sm" className="ml-auto" asChild>
          <Link href={next.url}>
            {next.name} <ArrowRightIcon />
          </Link>
        </Button>
      ) : null}
    </div>
  )
}

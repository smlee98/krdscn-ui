"use client"

import { SearchIcon } from "lucide-react"
import { useSearchContext } from "fumadocs-ui/contexts/search"

import { Button } from "@/components/ui/button"

export function SearchButton() {
  const { setOpenSearch } = useSearchContext()

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="hidden w-56 justify-start md:flex"
      onClick={() => setOpenSearch(true)}
    >
      <SearchIcon className="size-3.5" />
      Docs 검색...
      <kbd className="ml-auto rounded border bg-background px-1.5 py-0.5 text-[10px] text-muted-foreground">
        ⌘K
      </kbd>
    </Button>
  )
}

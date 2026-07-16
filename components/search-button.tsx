"use client"

import { SearchIcon } from "lucide-react"
import { useSearchContext } from "fumadocs-ui/contexts/search"

import { Button } from "@/components/ui/button"

export function SearchButton() {
  const { setOpenSearch } = useSearchContext()

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="hidden w-56 justify-start md:flex"
        onClick={() => setOpenSearch(true)}
      >
        <SearchIcon className="size-3.5" />
        Docs 검색...
        <kbd className="bg-background text-muted-foreground ml-auto rounded border px-1.5 py-0.5 text-[10px]">⌘K</kbd>
      </Button>
      <Button type="button" variant="ghost" size="icon-sm" className="md:hidden" onClick={() => setOpenSearch(true)}>
        <SearchIcon className="size-4" />
        <span className="sr-only">Docs 검색</span>
      </Button>
    </>
  )
}

import type { source } from "@/lib/source"

export type PageTreeNode = (typeof source.pageTree)["children"][number]
export type PageTreeFolder = Extract<PageTreeNode, { type: "folder" }>
export type PageTreePage = Extract<PageTreeNode, { type: "page" }>

export function normalizePath(pathname: string) {
  if (pathname === "/") return pathname
  return pathname.replace(/\/+$/, "")
}

export function getAllPagesFromFolder(folder: PageTreeFolder): PageTreePage[] {
  const pages: PageTreePage[] = []

  for (const child of folder.children) {
    if (child.type === "page") {
      pages.push(child)
    } else if (child.type === "folder") {
      pages.push(...getAllPagesFromFolder(child as PageTreeFolder))
    }
  }

  return pages
}

export function getPagesFromFolder(folder: PageTreeFolder): PageTreePage[] {
  if (folder.$id === "components" || folder.name === "컴포넌트" || folder.name === "Components") {
    return folder.children.filter((child): child is PageTreePage => child.type === "page" && !normalizePath(child.url).endsWith("/components"))
  }

  return folder.children.filter((child): child is PageTreePage => child.type === "page")
}

export function getCurrentBase() {
  return "krds"
}

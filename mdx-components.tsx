import Image from "next/image"
import Link from "next/link"
import defaultMdxComponents from "fumadocs-ui/mdx"
import { ExternalLinkIcon, InfoIcon } from "lucide-react"
import type { MDXComponents } from "mdx/types"
import * as React from "react"

import { Callout } from "@/components/docs/callout"
import { CodeBlockCommand } from "@/components/docs/code-block-command"
import { CodeTabs } from "@/components/docs/code-tabs"
import { ComponentPreview } from "@/components/docs/component-preview"
import { ComponentSource } from "@/components/docs/component-source"
import { ComponentsList } from "@/components/docs/components-list"
import { PropsTable } from "@/components/docs/props-table"
import { Step, Steps } from "@/components/docs/steps"
import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { PageTreeFolder } from "@/lib/page-tree"
import { source } from "@/lib/source"
import { cn } from "@/lib/utils"

function ComponentsListWrapper() {
  const componentsFolder = source.pageTree.children.find((page) => page.$id === "components")

  if (componentsFolder?.type !== "folder") {
    return null
  }

  return <ComponentsList componentsFolder={componentsFolder as PageTreeFolder} />
}

function getTextContent(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node)
  }

  if (Array.isArray(node)) {
    return node.map(getTextContent).join("")
  }

  if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
    return getTextContent(node.props.children)
  }

  return ""
}

function isPackageCommand(value: string) {
  return /^(pnpm dlx|npx|npm install|npm run|pnpm add|yarn dlx|yarn add)\b/.test(value.trim())
}

const fallbackPre = defaultMdxComponents.pre

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    pre: (props: React.ComponentProps<"pre">) => {
      const command = getTextContent(props.children).trim()

      if (isPackageCommand(command)) {
        return <CodeBlockCommand command={command} />
      }

      return fallbackPre ? fallbackPre(props) : <pre {...props} />
    },
    table: ({ className, ...props }: React.ComponentProps<"table">) => (
      <div className="my-6 w-full overflow-hidden rounded-xl border">
        <table className={cn("w-full text-sm", className)} {...props} />
      </div>
    ),
    thead: ({ className, ...props }: React.ComponentProps<"thead">) => (
      <thead className={cn("bg-muted/30", className)} {...props} />
    ),
    tr: ({ className, ...props }: React.ComponentProps<"tr">) => (
      <tr className={cn("border-b last:border-b-0", className)} {...props} />
    ),
    th: ({ className, ...props }: React.ComponentProps<"th">) => (
      <th className={cn("text-foreground px-4 py-2.5 text-left font-semibold", className)} {...props} />
    ),
    td: ({ className, ...props }: React.ComponentProps<"td">) => (
      <td className={cn("text-muted-foreground px-4 py-2.5 align-top", className)} {...props} />
    ),
    TabsList: ({ className, ...props }: React.ComponentProps<typeof TabsList>) => (
      <TabsList
        variant="line"
        className={cn("h-auto justify-start rounded-none bg-transparent px-0 py-0", className)}
        {...props}
      />
    ),
    TabsTrigger: ({ className, ...props }: React.ComponentProps<typeof TabsTrigger>) => (
      <TabsTrigger
        className={cn(
          "text-muted-foreground hover:text-foreground data-active:border-foreground data-active:text-foreground h-10 flex-none rounded-none border-0 border-b-2 border-transparent bg-transparent px-0 pb-3 text-base shadow-none after:hidden data-active:bg-transparent data-active:shadow-none dark:data-active:bg-transparent",
          className
        )}
        {...props}
      />
    ),
    TabsContent: ({ className, ...props }: React.ComponentProps<typeof TabsContent>) => (
      <TabsContent className={cn("relative mt-4 outline-none [&>.steps]:mt-6", className)} {...props} />
    ),
    Image,
    Link,
    Button,
    Kbd,
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
    CodeTabs,
    Steps,
    Step,
    Callout,
    ComponentPreview,
    ComponentSource,
    ComponentsList: ComponentsListWrapper,
    PropsTable,
    InfoIcon,
    IconInfoCircle: InfoIcon,
    ExternalLinkIcon,
    ...components,
  }
}

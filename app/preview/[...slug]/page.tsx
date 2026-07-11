import { notFound } from "next/navigation"

import { TooltipProvider } from "@/components/ui/tooltip"
import { EXAMPLE_REGISTRY } from "@/lib/example-registry"

type Props = {
  params: Promise<{ slug: string[] }>
}

export function generateStaticParams() {
  return Object.keys(EXAMPLE_REGISTRY).map((key) => ({ slug: key.split("/") }))
}

export default async function PreviewPage({ params }: Props) {
  const { slug } = await params
  const key = slug.join("/")
  const Demo = EXAMPLE_REGISTRY[key]

  if (!Demo) {
    notFound()
  }

  return (
    <TooltipProvider>
      <div className="bg-background text-foreground min-h-screen p-6">
        <Demo />
      </div>
    </TooltipProvider>
  )
}

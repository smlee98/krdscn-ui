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
      <div className="min-h-screen bg-background p-6 text-foreground">
        <Demo />
      </div>
    </TooltipProvider>
  )
}

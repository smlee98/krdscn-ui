import taxonomyData from "./docs-component-taxonomy.json"

export type ComponentTaxonomyKind = "native" | "extended" | "docs-only" | "conditional" | "block"

export type ComponentTaxonomyEntry = {
  kind: ComponentTaxonomyKind
  label: string
  description: string
}

export const docsComponentTaxonomy = taxonomyData as {
  schemaVersion: number
  components: Record<string, ComponentTaxonomyEntry>
  blocks: Record<string, ComponentTaxonomyEntry>
  conditional: Record<string, ComponentTaxonomyEntry>
}

export function getComponentTaxonomy(slug?: string | null) {
  if (!slug) return undefined
  return docsComponentTaxonomy.components[slug]
}

export function getBlockTaxonomy(slug?: string | null) {
  if (!slug) return undefined
  return docsComponentTaxonomy.blocks[slug]
}

export function isExtendedComponent(slug?: string | null) {
  return getComponentTaxonomy(slug)?.kind === "extended"
}

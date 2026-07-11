import * as path from "node:path"
import * as fs from "node:fs"
import * as docgen from "react-docgen-typescript"
import * as ts from "typescript"

const ROOT = process.cwd()
const KRDS_DIR = path.join(ROOT, "components/ui/krds")
const OUTPUT = path.join(ROOT, "data/props-data.json")
const TSCONFIG = path.join(ROOT, "tsconfig.json")

// Derive PascalCase Krds<Name> from file path: button.tsx → KrdsButton
function fileToComponentName(filePath: string): string {
  const base = path.basename(filePath, path.extname(filePath))
  const pascal = base
    .split(/[-_]/)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("")
  return `Krds${pascal}`
}

// Recursively glob all .tsx wrappers from krds/ and its category subdirectories.
// Wrappers were regrouped into "(group)/" folders, so a flat readdir of KRDS_DIR
// finds nothing — walk into subdirectories. Skip index files.
function collectTsxFiles(dir: string): string[] {
  const out: string[] = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      out.push(...collectTsxFiles(full))
    } else if (entry.name.endsWith(".tsx") && entry.name !== "index.tsx") {
      out.push(full)
    }
  }
  return out
}

const TARGET_FILES = collectTsxFiles(KRDS_DIR).sort()

const EXPECTED_COUNT = TARGET_FILES.length

const parser = docgen.withCustomConfig(TSCONFIG, {
  savePropValueAsString: true,
  shouldExtractLiteralValuesFromEnum: true,
  shouldRemoveUndefinedFromOptional: true,

  // Name resolver: always use the file-derived Krds<Name>, regardless of
  // what the component function is called internally (Button → KrdsButton).
  componentNameResolver: (_exp: ts.Symbol, source: ts.SourceFile): string | undefined => {
    return fileToComponentName(source.fileName)
  },

  propFilter: (prop) => {
    // Always include props with no declared parent (inline / intersection types).
    if (!prop.parent) return true
    const f = prop.parent.fileName
    // Whitelist key HTML/React props that are useful for documentation even
    // though they originate from @types/react (e.g. disabled, className, type).
    const KEEP_HTML_PROPS = new Set([
      "className",
      "disabled",
      "type",
      "children",
      "id",
      "onClick",
      "style",
      "aria-label",
      "tabIndex",
    ])
    if (KEEP_HTML_PROPS.has(prop.name)) return true
    // Exclude remaining React HTML attribute noise and TypeScript's lib types.
    if (f.includes("node_modules/@types/react")) return false
    if (f.includes("node_modules/typescript/lib")) return false
    // Keep CVA-derived props (parent is in class-variance-authority) and all
    // project-local props.
    return true
  },
})

const result: Record<string, unknown[]> = {}

for (const file of TARGET_FILES) {
  const componentName = fileToComponentName(file)
  const docs = parser.parse(file)

  if (docs.length === 0) {
    console.warn(`[generate-props-data] WARNING: no components found in ${path.basename(file)}`)
    continue
  }

  // Merge all exported components from the file under the canonical name.
  const allProps: Record<string, docgen.PropItem> = {}
  for (const doc of docs) {
    Object.assign(allProps, doc.props)
  }

  const props = Object.entries(allProps)
    .map(([name, info]) => {
      const defaultVal = info.defaultValue?.value ?? undefined
      return {
        name,
        type: info.type.name,
        // Omit defaultValue key when absent so JSON matches PropsDoc (defaultValue?: string).
        ...(defaultVal !== undefined ? { defaultValue: defaultVal } : {}),
        description: info.description || "",
        required: info.required,
      }
    })
    .sort((a, b) => a.name.localeCompare(b.name))

  result[componentName] = props
  console.log(`[generate-props-data] ${componentName}: ${props.length} prop(s)`)
}

// Sort top-level keys alphabetically for deterministic diffs.
const sorted: Record<string, unknown[]> = Object.fromEntries(
  Object.keys(result)
    .sort()
    .map((key) => [key, result[key] as unknown[]])
)

const writtenCount = Object.keys(sorted).length

fs.writeFileSync(OUTPUT, JSON.stringify(sorted, null, 2) + "\n")
console.log(`[generate-props-data] wrote ${writtenCount} component(s) to ${OUTPUT}`)

// Assertion: every file must have produced at least one component.
if (writtenCount !== EXPECTED_COUNT) {
  console.error(
    `[generate-props-data] ERROR: expected ${EXPECTED_COUNT} components (one per file), got ${writtenCount}. ` +
      `Check WARN lines above for files that produced no docs.`
  )
  process.exit(1)
}

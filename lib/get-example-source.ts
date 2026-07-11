// rsc:server-only
import "server-only"
import fs from "node:fs"
import path from "node:path"

export { getExampleSource }

function getExampleSource(slug: string, exampleName: string): string {
  const filePath = path.join(process.cwd(), "components", "examples", slug, `${exampleName}.tsx`)
  try {
    return fs.readFileSync(filePath, "utf8")
  } catch {
    throw new Error(`Example source not found: ${slug}/${exampleName}.tsx (looked at ${filePath})`)
  }
}

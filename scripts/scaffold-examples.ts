/**
 * scaffold-examples.ts — idempotent stub generator for KRDS example files.
 *
 * For each (slug, ExampleName) pair in EXAMPLES_CONFIG:
 *   - Writes components/examples/<slug>/<ExampleName>.tsx with a minimal stub
 *   - NEVER overwrites existing files (idempotent: re-run = 0 changes)
 *
 * Usage: yarn scaffold:examples
 */

import * as path from "node:path";
import * as fs from "node:fs";

import { EXAMPLES_CONFIG } from "../components/examples/examples-config";

const ROOT = process.cwd();
const EXAMPLES_DIR = path.join(ROOT, "components/examples");

function stubContent(name: string): string {
  return `export default function ${name}() {
  return <div>TODO: ${name}</div>;
}
`;
}

let created = 0;
let skipped = 0;

for (const [slug, names] of Object.entries(EXAMPLES_CONFIG) as [string, readonly string[]][]) {
  const slugDir = path.join(EXAMPLES_DIR, slug);

  if (!fs.existsSync(slugDir)) {
    fs.mkdirSync(slugDir, { recursive: true });
  }

  for (const name of names) {
    const filePath = path.join(slugDir, `${name}.tsx`);

    if (fs.existsSync(filePath)) {
      skipped++;
      continue;
    }

    fs.writeFileSync(filePath, stubContent(name), "utf8");
    created++;
    console.log(`  created  components/examples/${slug}/${name}.tsx`);
  }
}

console.log(`\nDone. created=${created} skipped=${skipped}`);

if (created === 0 && skipped > 0) {
  console.log("✓ Idempotent: no files modified.");
}

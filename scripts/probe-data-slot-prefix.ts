/**
 * T-0.3: KRDS data-slot prefix invariant regression gate
 *
 * ALL data-slot attributes in components/ui/krds/** must use the "krds-" prefix.
 * Exits non-zero if any non-prefixed data-slot is found.
 *
 * Run in CI: npx tsx scripts/probe-data-slot-prefix.ts
 * Invariant documented: CD-2 (KRDS data-slot must be "krds-<name>")
 */

import { readFileSync, readdirSync, statSync } from "fs";
import { join, resolve } from "path";

function walkTsx(dir: string): string[] {
  const entries = readdirSync(dir);
  const files: string[] = [];
  for (const entry of entries) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...walkTsx(full));
    } else if (entry.endsWith(".tsx")) {
      files.push(full);
    }
  }
  return files;
}

const root = resolve(process.cwd(), "components/ui/krds");
const files = walkTsx(root);

const violations: string[] = [];
let totalChecked = 0;

for (const file of files) {
  const src = readFileSync(file, "utf8");
  const lines = src.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i] ?? "";
    const matches = line.match(/data-slot="([^"]+)"/g) ?? [];
    for (const match of matches) {
      totalChecked++;
      if (!match.includes('data-slot="krds-')) {
        violations.push(`  ${file.replace(process.cwd() + "/", "")}:${i + 1} → ${match}`);
      }
    }
  }
}

if (violations.length > 0) {
  console.error(`❌ FAIL: ${violations.length} non-krds- prefixed data-slot attribute(s) found:`);
  violations.forEach((v) => console.error(v));
  console.error('\nAll KRDS data-slot attributes must use "krds-" prefix (CD-2).');
  process.exit(1);
}

console.log(`✅ PASS: All ${totalChecked} data-slot attribute(s) in components/ui/krds use "krds-" prefix.`);
process.exit(0);

# data/

Build artifacts for the documentation site.

## props-data.json

Generated from `components/ui/krds/*.tsx` by `scripts/generate-props-data.ts` using `react-docgen-typescript`.

Schema: `Record<ComponentName, PropsDoc[]>` where `ComponentName` is the PascalCase wrapper export (e.g. `KrdsButton`) and `PropsDoc` matches `components/krds-app/props-table.tsx` (`name`, `type`, `defaultValue?`, `description?`, `required`).

### Regenerate

```bash
yarn props:generate
```

Also runs automatically as `prebuild` on `yarn build`.

### Policy: committed, not gitignored

The committed artifact serves three purposes:
1. Cold builds stay fast (no generation needed for read-only consumers).
2. PR diffs surface unintended prop API changes on the KRDS wrappers.
3. Matches shadcn/ui registry convention.

The generator is the source of truth; the committed file is the verified snapshot. After modifying any `components/ui/krds/*.tsx`, run `yarn props:generate` and commit the resulting diff alongside the wrapper change.

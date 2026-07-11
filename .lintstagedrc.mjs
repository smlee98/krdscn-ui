import path from "path"

// See https://nextjs.org/docs/app/api-reference/config/eslint#running-lint-on-staged-files for details
const buildEslintCommand = (filenames) =>
  `eslint --fix ${filenames.map((f) => `"${path.relative(process.cwd(), f)}"`).join(" ")}`

/**
 * @type {import('lint-staged').Configuration}
 */
const lintStagedConfig = {
  "*.{js,jsx,mjs,cjs,ts,tsx}": [buildEslintCommand, "prettier --write"],
  "*.{md,mdx,css,json}": "prettier --write",
}

export default lintStagedConfig

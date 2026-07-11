import nextCoreWebVitals from "eslint-config-next/core-web-vitals"
import nextTypescript from "eslint-config-next/typescript"
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended"
import { defineConfig, globalIgnores } from "eslint/config"

const eslintConfig = defineConfig([
  ...nextCoreWebVitals,
  ...nextTypescript,
  eslintPluginPrettierRecommended,
  globalIgnores([".next/**", ".source/**", ".yarn/**", "node_modules/**", "next-env.d.ts", "yarn.lock"]),
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", { ignoreRestSiblings: true, argsIgnorePattern: "^_" }],
      "@next/next/no-img-element": "off",
    },
  },
  {
    // shadcn 원본(vendored) 코드 — upstream 코드가 걸리는 advisory 룰은 경고로 유지
    files: ["components/ui/*.tsx", "lib/hooks/use-mobile.ts"],
    rules: {
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/purity": "warn",
    },
  },
])

export default eslintConfig

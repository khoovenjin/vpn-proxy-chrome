import pluginJs from "@eslint/js"
import pluginImport from "eslint-plugin-import"
import json from "eslint-plugin-json"
import prettier from "eslint-plugin-prettier/recommended"
import pluginVue from "eslint-plugin-vue"
import tseslint from "typescript-eslint"

export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  prettier,
  {
    files: ["**/*.json"],
    ...json.configs["recommended"],
  },
  {
    plugins: {
      import: pluginImport,
    },
  },
  {
    languageOptions: {
      globals: {
        browser: "writable",
        es6: "writable",
        node: "writable",
        mocha: "writable",
      },
    },
  },
  {
    languageOptions: {
      ecmaVersion: 2020,
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
  {
    rules: {
      "no-console": 0,
      "no-debugger": 0,
      "no-alert": 0,
      "vue/multi-word-component-names": 0,
      "import/order": [
        1,
        { alphabetize: { order: "asc", caseInsensitive: true } },
      ],
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
        },
      ],
    },
  },
  {
    files: ["**/__tests__/**/*.spec.{j,t}s?{x}"],
    languageOptions: {
      globals: {
        jest: "writable",
      },
    },
  },
]

export default {
  // trailing commas in most environments without having to transpile
  trailingComma: "es5",
  tabWidth: 2,
  semi: false,
  singleQuote: false,
  // @see - https://prettier.io/docs/en/options.html#html-whitespace-sensitivity
  htmlWhitespaceSensitivity: "ignore",
  overrides: [
    {
      files: "package*.json",
      options: {
        printWidth: 1000,
      },
    },
  ],
}

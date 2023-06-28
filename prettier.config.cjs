/** @type {import('prettier').Config} */
module.exports = {
  endOfLine: 'lf',
  tabWidth: 2,
  printWidth: 80,
  semi: false,
  useTabs: false,
  singleQuote: true,
  jsxSingleQuote: true,
  bracketSpacing: true,
  bracketSameLine: false,
  singleAttributePerLine: true,
  trailingComma: 'none',
  quoteProps: 'as-needed',
  arrowParens: 'always',
  importOrder: [
    '^node:(.*)$',
    '^(react|next(.*))$',
    '<THIRD_PARTY_MODULES>',
    '^@/(.*)$',
    '^~/(.*)$',
    '^[./]',
    '<TYPES>',
    '^(.*)(sass|css|scss)$'
  ],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  importOrderBuiltinModulesToTop: true,
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderMergeDuplicateImports: true,
  importOrderCombineTypeAndValueImports: true,
  plugins: [
    '@ianvs/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss'
  ]
}

import path from 'node:path'
import nextra from 'nextra'
import { macros } from '@aptos-labs/aptos-docs-config'

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  latex: {
    renderer: 'katex',
    options: {
      macros: {
        ...macros
      }
    }
  },
  search: {
    codeblocks: false
  },
  defaultShowCopyCode: true
})

const sep = path.sep === '/' ? '/' : '\\\\'

const ALLOWED_SVG_REGEX = new RegExp(`components${sep}icons${sep}.+\\.svg$`)

export default withNextra({
  reactStrictMode: true,
  eslint: {
    // ESLint behaves weirdly in this monorepo.
    ignoreDuringBuilds: true
  },
  webpack(config) {
    const fileLoaderRule = config.module.rules.find(rule =>
      rule.test?.test?.('.svg')
    )
    fileLoaderRule.exclude = ALLOWED_SVG_REGEX

    config.module.rules.push({
      test: ALLOWED_SVG_REGEX,
      use: ['@svgr/webpack']
    })
    return config
  },
  // i18n: {
  //   locales: ['en'],
  //   defaultLocale: 'en'
  // },
  runtime: 'edge', // for Edge API Routes only
})

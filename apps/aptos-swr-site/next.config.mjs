/* eslint-disable no-undef */
import bundleAnalyzer from '@next/bundle-analyzer'
import nextra from 'nextra'
import { i18nConfig } from './i18n.js';

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  defaultShowCopyCode: true,
  // transformPageMap(pageMap, _locale) {
  //   // if (locale === 'en') {
  //   //   pageMap = [
  //   //     ...pageMap,
  //   //     {
  //   //       name: 'virtual-page',
  //   //       route: '/en/virtual-page',
  //   //       frontMatter: { sidebarTitle: 'Virtual Page' }
  //   //     }
  //   //   ]
  //   // }
  //   return pageMap
  // },
  latex: true
})

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
})

/**
 * @type {import('next').NextConfig}
 */
export default withBundleAnalyzer(
  withNextra({
    eslint: {
      // Eslint behaves weirdly in this monorepo.
      ignoreDuringBuilds: true
    },
    i18n: {
      locales: Object.keys(i18nConfig).map((locale) => locale),
      defaultLocale: 'en'
    },
    distDir: './.next', // Nextra supports custom `nextConfig.distDir`
    redirects: async () => [
      {
        source: '/change-log',
        destination: '/docs/change-log',
        statusCode: 301
      },
      {
        source: '/blog/swr-1',
        destination: '/blog/swr-v1',
        statusCode: 301
      },
      {
        source: '/docs.([a-zA-Z-]+)',
        destination: '/docs/getting-started',
        statusCode: 302
      },
      {
        source: '/docs',
        destination: '/docs/getting-started',
        statusCode: 302
      },
      {
        source: '/examples',
        destination: '/examples/basic',
        statusCode: 302
      },
      {
        source: '/',
        destination: '/en',
        permanent: true
      }
    ],
    reactStrictMode: true
  })
)

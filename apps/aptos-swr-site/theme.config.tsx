/* eslint sort-keys: error */
import type { DocsThemeConfig } from 'nextra-theme-docs'
import { useConfig } from 'nextra-theme-docs'
import { useRouter } from 'nextra/hooks'
import { docsConfig, i18nConfig } from '@docs-config'

const i18nLocales = Object.entries(i18nConfig).map(([locale, { direction, name }]) => {
  return {
    direction: (direction as 'ltr' | 'rtl' | undefined) || undefined,
    locale,
    name,
  }
})

const config: DocsThemeConfig = {
  darkMode: true,
  docsRepositoryBase: docsConfig.githubDocsUrl,
  editLink: {
    content: function useText() {
      const { locale } = useRouter()
      return i18nConfig[locale!].editText
    }
  },
  feedback: {
    content: 'Question? Give us feedback →',
    labels: 'feedback',
    useLink() {
      return docsConfig.githubNewIssueUrl
    }
  },
  footer: {
    content: function useText() {
      const { locale } = useRouter()
      return (
        <a
          rel="noreferrer"
          target="_blank"
          className="flex items-center gap-2 font-semibold"
          href={i18nConfig[locale!].footerLinkText}
        >
          {i18nConfig[locale!].footerLinkElement}
        </a>
      )
    }
  },
  head: function useHead() {
    const config = useConfig<{ description?: string; image?: string }>()
    const { locale } = useRouter()
    const description =
      config.frontMatter.description ||
      docsConfig.defaultDescription
    const image =
      config.frontMatter.image || '/api/og'
    const title = `${config.title} | ${docsConfig.defaultTitle} (${locale})`
    return (
      <>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        {/* Favicons, meta */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#000000"
        />
        <meta name="msapplication-TileColor" content="#fff" />
        <meta httpEquiv="Content-Language" content="en" />

        {/* Opengraph (OG) */}
        <meta property="og:image" content={image} />
        {/* Fallback OG Image */}
        <meta property="og:image" content={image} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@vercel" />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:image:type" content="image/png" />

        {/* Apple */}
        <meta name="apple-mobile-web-app-title" content={docsConfig.defaultTitle} />
      </>
    )
  },
  i18n: i18nLocales,
  logo: function Logo() {
    const { locale } = useRouter()
    return (
      <>
        <span
          className="select-none font-extrabold ltr:ml-2 rtl:mr-2"
          title={`${docsConfig.defaultTitle}: ${i18nConfig[locale!].title || ''}`}
        >
          {docsConfig.defaultTitle}
        </span>
      </>
    )
  },
  nextThemes: {
    defaultTheme: 'light'
  },
  project: {
    link: docsConfig.githubUrl
  },
  sidebar: {
    autoCollapse: true,
    defaultMenuCollapseLevel: 1,
    toggleButton: true
  },
  toc: {
    float: true
  }
}

export default config

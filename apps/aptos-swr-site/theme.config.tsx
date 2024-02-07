/* eslint sort-keys: error */
import { i18nConfig } from 'i18n'
import type { DocsThemeConfig } from 'nextra-theme-docs'
import { LocaleSwitch, useConfig } from 'nextra-theme-docs'
import { useRouter } from 'nextra/hooks'
import type { ComponentProps, ReactElement } from 'react'

export const SWRLogo = (props: ComponentProps<'svg'>): ReactElement => (
  <svg viewBox="0 0 291 69" fill="none" {...props}>
    <path
      d="M0 36.53c.07 17.6 14.4 32.01 32.01 32.01a32.05 32.05 0 0032.01-32V32a13.2 13.2 0 0123.4-8.31h20.7A32.07 32.07 0 0077.2 0a32.05 32.05 0 00-32 32.01v4.52A13.2 13.2 0 0132 49.71a13.2 13.2 0 01-13.18-13.18 3.77 3.77 0 00-3.77-3.77H3.76A3.77 3.77 0 000 36.53zM122.49 68.54a32.14 32.14 0 01-30.89-23.7h20.67a13.16 13.16 0 0023.4-8.3V32A32.05 32.05 0 01167.68 0c17.43 0 31.64 14 32 31.33l.1 5.2a13.2 13.2 0 0023.4 8.31h20.7a32.07 32.07 0 01-30.91 23.7c-17.61 0-31.94-14.42-32.01-32l-.1-4.7v-.2a13.2 13.2 0 00-13.18-12.81 13.2 13.2 0 00-13.18 13.18v4.52a32.05 32.05 0 01-32.01 32.01zM247.94 23.7a13.16 13.16 0 0123.4 8.31 3.77 3.77 0 003.77 3.77h11.3a3.77 3.77 0 003.76-3.77A32.05 32.05 0 00258.16 0a32.07 32.07 0 00-30.92 23.7h20.7z"
      fill="currentColor"
    />
  </svg>
)

const config: DocsThemeConfig = {
  banner: {
    content: 'SWR 2.0 is out! Read more →',
    key: 'swr-2'
  },
  // chat: {
  //   link: 'https://discord.com'
  // },
  darkMode: true,
  docsRepositoryBase:
    'https://github.com/shuding/nextra/blob/core/examples/swr-site',
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
      const config = useConfig()
      return `https://google.com/search?q=${encodeURIComponent(
        `Feedback for ${config.title}`
      )}`
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
      'SWR is a React Hooks library for data fetching. SWR first returns the data from cache (stale), then sends the fetch request (revalidate), and finally comes with the up-to-date data again.'
    const image =
      config.frontMatter.image ||
      'https://assets.vercel.com/image/upload/v1572282926/swr/twitter-card.jpg'
    const title = `${config.title} | SWR (${locale})`
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
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@vercel" />
        <meta property="og:image" content={image} />
        <meta name="apple-mobile-web-app-title" content="SWR" />
      </>
    )
  },
  i18n: [
    { locale: 'en', name: 'English' },
    { direction: 'rtl', locale: 'es', name: 'Español RTL' },
    { locale: 'ru', name: 'Русский' }
  ],
  logo: function Logo() {
    const { locale } = useRouter()
    return (
      <>
        <SWRLogo className="h-3" />
        <span
          className="max-md:hidden select-none font-extrabold ltr:ml-2 rtl:mr-2"
          title={`SWR: ${i18nConfig[locale!].title || ''}`}
        >
          SWR
        </span>
      </>
    )
  },
  navbar: {
    extraContent: LocaleSwitch
  },
  nextThemes: {
    defaultTheme: 'dark'
  },
  project: {
    link: 'https://github.com/vercel/swr'
  },
  sidebar: {
    autoCollapse: true,
    defaultMenuCollapseLevel: 1,
    toggleButton: true
  },
  toc: {
    extraContent: (
      // eslint-disable-next-line @next/next/no-img-element -- ignore since url is external and dynamic
      <img alt="placeholder cat" src="https://placekitten.com/g/300/200" />
    ),
    float: true
  }
}

export default config

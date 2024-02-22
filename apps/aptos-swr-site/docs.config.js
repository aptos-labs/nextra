// Unfortunately making this a .ts file is not easily doable atm
// TODO: revisit this if time allows
export const i18nConfig = Object.freeze({
  en: {
    locale: 'en',
    name: 'English',
    direction: 'ltr',
    title: 'React Hooks for Data Fetching',
    editText: 'Edit this page on GitHub →',
    footerLinkText: 'https://vercel.com/?utm_source=swr',
    footerLinkElement: undefined,
  },
  ru: {
    locale: 'ru',
    name: 'Русский',
    direction: 'ltr',
    title: 'React хуки для выборки данных',
    editText: 'Редактировать на GitHub',
    footerLinkText: 'https://vercel.com/?utm_source=swr_ru',
    footerLinkElement: undefined,
  }
})

/**
 * These variables are used for things like 
 * - og.tsx
 */

export const docsConfig = Object.freeze({
  i18nConfig,
  defaultTitle: 'Aptos Docs',
  defaultDescription: 'Docs for Aptos',
  githubUrl: 'https://github.com/aptos-labs/nextra',
  githubDocsUrl: 'https://github.com/aptos-labs/nextra/apps/aptos-swr-site',
  githubNewIssueUrl: 'https://github.com/aptos-labs/nextra/issues/new',
  googleAnalyticsId: 'G-LLF79THJN0'
})
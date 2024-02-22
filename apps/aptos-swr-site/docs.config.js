// Unfortunately making this a .ts file is not easily doable atm
// TODO: revisit this if time allows
export const i18nConfig = Object.freeze({
  en: {
    locale: 'en',
    name: 'English',
    direction: 'ltr',
    title: 'React Hooks for Data Fetching',
    editText: 'Edit this page on GitHub →',
    feedbackText: 'Question? Give us feedback →',
    footerLinkText: 'https://vercel.com/?utm_source=swr',
    footerLinkElement: undefined,
    searchPlaceholderText: 'Search documentation',
    searchLoadingText: 'Loading...',
    searchEmptyText: 'No results found.',
    searchErrorText: 'Failed to load search index.',
    lastUpdatedOn: 'Last updated on',
  },
  ru: {
    locale: 'ru',
    name: 'Русский',
    direction: 'ltr',
    title: 'React хуки для выборки данных',
    editText: 'Редактировать на GitHub',
    feedbackText: 'Вопрос? Ваш отзыв →',
    footerLinkText: 'https://vercel.com/?utm_source=swr_ru',
    footerLinkElement: undefined,
    searchPlaceholderText: 'Искать документацию',
    searchLoadingText: 'Загрузка...',
    searchEmptyText: 'Ничего не найдено.',
    searchErrorText: 'Не удалось загрузить поисковый индекс.',
    lastUpdatedOn: 'Последнее обновление',
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
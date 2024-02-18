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
  es: {
    locale: 'es',
    name: 'Español RTL',
    direction: 'rtl',
    title: 'Biblioteca React Hooks para la obtención de datos',
    editText: 'Edite esta página en GitHub',
    footerLinkText: 'https://vercel.com/?utm_source=swr_es-es',
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

// Docs Title
export const title = 'SDK Docs'

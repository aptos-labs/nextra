
// const generateFooterLinkText = (text) => {
//   return (
//     <>
//       {text}
//       <Vercel />
//     </>
//   )
// }

// export interface i18nConfigType {
//   [language: string]: {
//     title: string;
//     editText: string;
//     footerLinkText: string;
//     footerLinkElement: JSX.Element;
//     locale: 'en' | 'es' | 'ru' | 'zh';
//     direction?: 'rtl' | 'ltr';
//     name: string
//   }
// }


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

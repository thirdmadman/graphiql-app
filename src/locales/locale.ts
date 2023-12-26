export const en = {
  id: 'en',
  requestFieldLabel: 'Write your query',
  requestFieldPlaceholder: 'Write your gql request',
  responseFieldLabel: 'Server response',
  responseFieldPlaceholder: 'Server response',
  executeBtnTitle: 'Execute',
  prettifyBtnTitle: 'Prettify',
  disableExecuteBtnTitle: 'Disable Execution',
  processingRequestError:
    'We are sorry, but there were error in processing request',
  responseFormatError: 'Server response formatting error',
  variablesTitle: 'Variables',
  variablesLabel: 'Please, use JSON format to pass variables',
  headersTitle: 'Headers',
  headersLabel: 'Please, use JSON format to pass headers',
  prettifyError:
    'Request formatting error! Please ensure that request is written correctly.',
  signinBtnTitle: 'Sign In',
  signupBtnTitle: 'Sign Up',
  mainBtnTitle: 'Main',
  welcomeSectionTitle1: 'Welcome',
  welcomeSectionTitle2: 'to the GraphiQL',
  welcomeSectionText:
    'Our app easily allows you to make requests to the variety of open GraphQL APIs',
  benefitsSectionTitle: 'Why do people prefer our app?',
  benefitsSectionListItem1: 'Extra fast performance',
  benefitsSectionListItem2: 'User-friendly interface',
  benefitsSectionListItem3: 'Great user experience',
  benefitsSectionListItem4: 'Plenty of supported APIs',
  benefitsSectionListItem5: 'API docs loading',
  benefitsSectionListItem6: 'Security and caching',
  motivationSectionTitle: 'Our motivation',
  motivationSectionText1:
    'Our team is really interested in the idea of writing a project using the latest web app development technologies. Thanks to the RS-school React course, we got acquainted with such a wonderful framework as Next.js.',
  motivationSectionText2:
    'Therefore, we decided to apply the Next.js App Router paradigm for building our application with API routes and middleware. We opted to design our application with React latest features, such as server-side components, Suspense, and others.',
  motivationSectionText3:
    'While working on this project, we significantly enhanced our teamwork and coding skills. And overall, it was a very entertaining and useful experience for us.',
  teamSectionTitle: 'Our team',
  teamSectionRole1: 'Team lead',
  teamSectionRole2: 'Web developer',
};

export const ru = {
  id: 'ru',
  requestFieldLabel: 'Напишите свой запрос',
  requestFieldPlaceholder: 'Напишите свой graph-ql запрос',
  responseFieldLabel: 'Ответ сервера',
  responseFieldPlaceholder: 'Ответ сервера',
  executeBtnTitle: 'Выполнить',
  prettifyBtnTitle: 'Форматировать',
  disableExecuteBtnTitle: 'Запретить выполнение',
  processingRequestError:
    'Приносим извинения, но при обработке запроса произошла ошибка',
  responseFormatError: 'Ошибка форматирования ответа сервера',
  variablesTitle: 'Переменные',
  variablesLabel: 'Пожалуйста, используйте JSON формат для передачи переменных',
  headersTitle: 'Заголовки',
  headersLabel: 'Пожалуйста, используйте JSON формат для передачи заголовков',
  prettifyError:
    'Ошибка форматирования запроса. Пожалуйста, убедитесь, что запрос написан правильно.',
  signinBtnTitle: 'Войти',
  signupBtnTitle: 'Регистрация',
  mainBtnTitle: 'Главная',
  welcomeSectionTitle1: 'Добро пожаловать',
  welcomeSectionTitle2: 'в GraphiQL',
  welcomeSectionText:
    'С помощью нашего приложения вы легко можете делать запросы к различным API GraphQL',
  benefitsSectionTitle: 'Почему пользователи выбирают наше приложение?',
  benefitsSectionListItem1: 'Высокая производительность',
  benefitsSectionListItem2: 'Удобный интерфейс',
  benefitsSectionListItem3: 'Отличный пользовательский опыт',
  benefitsSectionListItem4: 'Множество поддерживаемых API',
  benefitsSectionListItem5: 'Доступ к документации API',
  benefitsSectionListItem6: 'Безопаность и кэширование данных',
  motivationSectionTitle: 'Наша мотивация',
  motivationSectionText1:
    'Наша команда была очень заинтересована в идее написания проекта используя самые современные технологии разработки веб-приложений. Благодаря курсу по React от RS-school мы познакомились с таким замечательным фреймворком, как Next.js',
  motivationSectionText2:
    'Поэтому мы решили применить парадигму Next.js App Router для создания нашего приложения, используя API routes и middleware. Также в разработке мы использовали разнообразные актуальные механизмы React, такие как серверные компоненты, Suspense и многие другие',
  motivationSectionText3:
    'Работая над проектом, мы существенно повысили наши навыки командной работы и написания кода. Это был очень интересный и полезный опыт для нас.',
  teamSectionTitle: 'Наша команда',
  teamSectionRole1: 'Тимлид',
  teamSectionRole2: 'Разработчик',
};

export type TLocale = typeof en;

interface ILocalesObject {
  [key: string]: TLocale;
}

export const locale: ILocalesObject = { en, ru };

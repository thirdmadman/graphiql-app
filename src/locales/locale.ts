export const en = {
  id: 'en',
  inputFormLabel: 'Write your query',
  executeBtnTitle: 'Execute',
  disableExecuteBtnTitle: 'Disable Execution',
  serverResponseTitle: 'Server response',
}

export const ru = {
  id: 'ru',
  inputFormLabel: 'Напишите свой запрос',
  executeBtnTitle: 'Выполнить',
  disableExecuteBtnTitle: 'Запретить выполнение',
  serverResponseTitle: 'Ответ сервера',
}

export type Locale = {
  id: string,
  inputFormLabel: string,
  executeBtnTitle: string,
  disableExecuteBtnTitle: string,
  serverResponseTitle: string,
}

type Locales = {
  [key: string]: Locale,
}

export const locale: Locales = { en, ru };

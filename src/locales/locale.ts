export const en = {
  id: 'en',
  inputFormLabel: 'Write your query',
  executeBtnTitle: 'Execute',
  disableExecuteBtnTitle: 'Disable Execution',
  serverResponseTitle: 'Server response',
};

export const ru = {
  id: 'ru',
  inputFormLabel: 'Напишите свой запрос',
  executeBtnTitle: 'Выполнить',
  disableExecuteBtnTitle: 'Запретить выполнение',
  serverResponseTitle: 'Ответ сервера',
};

export interface ILocale {
  id: string;
  inputFormLabel: string;
  executeBtnTitle: string;
  disableExecuteBtnTitle: string;
  serverResponseTitle: string;
}

interface ILocalesObject {
  [key: string]: ILocale;
}

export const locale: ILocalesObject = { en, ru };

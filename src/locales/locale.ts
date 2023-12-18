export const en = {
  id: 'en',
  inputFormLabel: 'Write your query',
  executeBtnTitle: 'Execute',
  disableExecuteBtnTitle: 'Disable Execution',
  serverResponseTitle: 'Server response',
  variablesTitle: 'Variables',
  variablesLabel: 'Please, use JSON format to pass variables',
  headersTitle: 'Headers',
  headersLabel: 'Please, use JSON format to pass headers',
};

export const ru = {
  id: 'ru',
  inputFormLabel: 'Напишите свой запрос',
  executeBtnTitle: 'Выполнить',
  disableExecuteBtnTitle: 'Запретить выполнение',
  serverResponseTitle: 'Ответ сервера',
  variablesTitle: 'Переменные',
  variablesLabel: 'Пожалуйста, используйте JSON формат для передачи переменных',
  headersTab: 'Заголовки',
  headersLabel: 'Пожалуйста, используйте JSON формат для передачи заголовков',
};

export interface ILocale {
  id: string;
  inputFormLabel: string;
  executeBtnTitle: string;
  disableExecuteBtnTitle: string;
  serverResponseTitle: string;
  variablesTitle: string;
  variablesLabel: string;
  headersTitle: string;
  headersLabel: string;
}

interface ILocalesObject {
  [key: string]: ILocale;
}

export const locale: ILocalesObject = { en, ru };

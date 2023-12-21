export const en = {
  id: 'en',
  inputFormLabel: 'Write your query',
  executeBtnTitle: 'Execute',
  prettifyBtnTitle: 'Prettify',
  disableExecuteBtnTitle: 'Disable Execution',
  serverResponseTitle: 'Server response',
  variablesTitle: 'Variables',
  variablesLabel: 'Please, use JSON format to pass variables',
  headersTitle: 'Headers',
  headersLabel: 'Please, use JSON format to pass headers',
  prettifyError:
    'Request formatting error! Please ensure that request is written correctly.',
};

export const ru = {
  id: 'ru',
  inputFormLabel: 'Напишите свой запрос',
  executeBtnTitle: 'Выполнить',
  prettifyBtnTitle: 'Форматировать',
  disableExecuteBtnTitle: 'Запретить выполнение',
  serverResponseTitle: 'Ответ сервера',
  variablesTitle: 'Переменные',
  variablesLabel: 'Пожалуйста, используйте JSON формат для передачи переменных',
  headersTitle: 'Заголовки',
  headersLabel: 'Пожалуйста, используйте JSON формат для передачи заголовков',
  prettifyError:
    'Ошибка форматирования запроса. Пожалуйста, убедитесь, что запрос написан правильно.',
};

export interface ILocale {
  id: string;
  inputFormLabel: string;
  executeBtnTitle: string;
  prettifyBtnTitle: string;
  disableExecuteBtnTitle: string;
  serverResponseTitle: string;
  variablesTitle: string;
  variablesLabel: string;
  headersTitle: string;
  headersLabel: string;
  prettifyError: string;
}

interface ILocalesObject {
  [key: string]: ILocale;
}

export const locale: ILocalesObject = { en, ru };

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
};

export type TLocale = typeof en;

interface ILocalesObject {
  [key: string]: TLocale;
}
  [key: string]: string;
}

interface ILocalesObject {
  [key: string]: ILocale;
}

export const locale: ILocalesObject = { en, ru };

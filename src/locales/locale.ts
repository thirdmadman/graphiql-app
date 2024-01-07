export enum SignInErrorCodes {
  TooManyRequests = 'TooManyRequestsError',
  InvalidCredentials = 'InvalidCredentialsError',
  AuthServiceError = 'AuthServiceError',
  AuthNetworkFailed = 'AuthNetworkFailed',
  UnknownError = 'UnknownError',
}

const signInErrorsEn = {
  [SignInErrorCodes.TooManyRequests]:
    'Too many requests. Access to this account has been temporarily disabled due to many failed login attempts. Please try again later.',
  [SignInErrorCodes.InvalidCredentials]:
    'Invalid credentials. Please check the entered data.',
  [SignInErrorCodes.AuthServiceError]: 'Authorization service error.',
  [SignInErrorCodes.UnknownError]: 'An error occurred, please try again later',
  [SignInErrorCodes.AuthNetworkFailed]:
    'Network request failed. Please try again later',
};

export const signInErrorsRu = {
  [SignInErrorCodes.TooManyRequests]:
    'Слишком много запросов. Доступ к этой учетной записи временно отключен из-за множества неудачных попыток входа. Пожалуйста, повторите попытку позже.',
  [SignInErrorCodes.InvalidCredentials]:
    'Неверные учетные данные. Пожалуйста, проверьте введенные данные',
  [SignInErrorCodes.AuthServiceError]: 'Ошибка авторизации.',
  [SignInErrorCodes.UnknownError]:
    'Произошла ошибка. Пожалуйста, повторите попытку позже',
  [SignInErrorCodes.AuthNetworkFailed]:
    'Ошибка выполнения сетевого запроса. Пожалуйста, повторите попытку позже.',
};

export const formLabelsEn = {
  emailLabel: 'Email address',
  passwordLabel: 'Password',
};

export const formLabelsRu = {
  emailLabel: 'Адрес электронной почты',
  passwordLabel: 'Пароль',
};

export const signInPageEn = {
  signInTitle: 'Login to your account',
  dontHaveAccount: 'Dont have an account?',
  signInBtn: 'Sign in',
  signUpLink: 'Sign up here',
  loginWithGoogleBtn: 'Login with Google',
  or: 'OR',
  ...formLabelsEn,
  ...signInErrorsEn,
};

export const signInPageRu = {
  signInTitle: 'Войдите в свой аккаунт',
  dontHaveAccount: 'Не имеете аккаунта?',
  signInBtn: 'Войти',
  signUpLink: 'Зарегистрироваться',
  loginWithGoogleBtn: 'Войти через Google',
  or: 'ИЛИ',
  ...formLabelsRu,
  ...signInErrorsRu,
};

export enum SignUpErrorCodes {
  EmailAlreadyExists = 'EmailAlreadyExistsError',
  AuthServiceError = 'AuthServiceError',
  AuthInvalidEmailError = 'AuthInvalidEmailError',
  UnknownError = 'UnknownError',
}

const signupErrorsEn = {
  [SignUpErrorCodes.EmailAlreadyExists]:
    'The provided email is already in use by an existing user',
  [SignUpErrorCodes.AuthServiceError]: 'Authorization service error.',
  [SignUpErrorCodes.AuthInvalidEmailError]:
    'The provided email address is invalid',
  [SignUpErrorCodes.UnknownError]: 'An error occurred, please try again later',
};

export const signupErrorsRu = {
  [SignUpErrorCodes.EmailAlreadyExists]:
    'Данный адрес электронной почты уже используется',
  [SignUpErrorCodes.AuthServiceError]: 'Ошибка авторизации.',
  [SignUpErrorCodes.AuthInvalidEmailError]:
    'Данный адрес электронной почты недействителен',
  [SignUpErrorCodes.UnknownError]:
    'Произошла ошибка. Пожалуйста, повторите попытку позже',
};

export const signupFormLabelsEn = {
  nameLabel: 'Name',
  namePlaceholder: 'name',
  emailLabel: 'Email address',
  passwordLabel: 'Password',
  confirmPasswordLabel: 'Confirm password',
  termsLabel: 'I accept the',
};

export const signupFormLabelsRu = {
  nameLabel: 'Имя',
  namePlaceholder: 'имя',
  emailLabel: 'Адрес электронной почты',
  passwordLabel: 'Пароль',
  confirmPasswordLabel: 'Подтвердите пароль',
  termsLabel: 'Я принимаю',
};

export const passwordStrengthEn = {
  weak: 'weak',
  okay: 'okay',
  good: 'good',
  strong: 'strong',
};

export const passwordStrengthRu = {
  weak: 'слабый',
  okay: 'средний',
  good: 'надежный',
  strong: 'сложный',
};

export const signupPageEn = {
  signupTitle: 'Create an account',
  alreadyHaveAccount: 'Already have an account?',
  signinLink: 'Login here',
  termsLink: 'Terms and Conditions',
  signupBtn: 'Sign up',
  ...signupFormLabelsEn,
  ...signupErrorsEn,
  ...passwordStrengthEn,
};

export const signupPageRu = {
  signupTitle: 'Создать аккаунт',
  alreadyHaveAccount: 'Уже есть аккаунт?',
  signinLink: 'Войти',
  termsLink: 'Условия и положения',
  signupBtn: 'Зарегистрироваться',
  ...signupFormLabelsRu,
  ...signupErrorsRu,
  ...passwordStrengthRu,
};

export enum formValidationErrors {
  RequiredField = 'RequiredField',
  InvalidEmail = 'InvalidEmail',
  PasswordLength = 'PasswordLength',
  NameLength = 'NameLength',
  NameLetters = 'NameLetters',
  PasswordNumber = 'PasswordNumber',
  PasswordLetter = 'PasswordLetter',
  PasswordCharacter = 'PasswordCharacter',
  PasswordMatch = 'PasswordMatch',
  Terms = 'Terms',
}

const formValidationErrorsEn = {
  [formValidationErrors.RequiredField]: 'Required field',
  [formValidationErrors.InvalidEmail]: 'Please enter a valid email address',
  [formValidationErrors.PasswordLength]: 'Must be 8 or more characters',
  [formValidationErrors.NameLength]: 'Must be 2 or more characters',
  [formValidationErrors.NameLetters]: 'Must contain only letters',
  [formValidationErrors.PasswordNumber]: 'Must contain at least one number',
  [formValidationErrors.PasswordLetter]: 'Must contain at least one letter',
  [formValidationErrors.PasswordCharacter]:
    'Must contain at least one special character',
  [formValidationErrors.PasswordMatch]: 'Passwords do not match',
  [formValidationErrors.Terms]: 'You should accept terms and conditions',
};

const formValidationErrorsRu = {
  [formValidationErrors.RequiredField]: 'Обязательное поле',
  [formValidationErrors.InvalidEmail]:
    'Введите корректный адрес электронной почты',
  [formValidationErrors.PasswordLength]:
    'Должен состоять из 8 или более символов',
  [formValidationErrors.NameLength]: 'Должно состоять из 2 или более символов',
  [formValidationErrors.NameLetters]: 'Должно содержать только буквы',
  [formValidationErrors.PasswordNumber]:
    'Должен содержать как минимум одну цифру',
  [formValidationErrors.PasswordLetter]:
    'Должен содержать как минимум одну букву',
  [formValidationErrors.PasswordCharacter]:
    'Должен содержать как минимум один спецсимвол',
  [formValidationErrors.PasswordMatch]: 'Введенные пароли не совпадают',
  [formValidationErrors.Terms]: 'Вы должны принять условия и положения',
};

export const en = {
  id: 'en',
  requestFieldLabel: 'Write your query',
  requestFieldPlaceholder: 'Write your gql request',
  responseFieldLabel: 'Server response',
  responseFieldPlaceholder: 'No data to show',
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
  ...formValidationErrorsEn,
  ...signInPageEn,
  ...signupPageEn,
  editorTitle: 'GraphQL editor',
  loadingText: 'Loading...',
  documentationExplorerTitle: 'Documentation Explorer',
  documentationExplorerErrorUrl:
    'In order to access Documentation Explorer, provide correct url to graphql endpoint.',
  documentationExplorerErrorNoSchema:
    'We are sorry, but documentation is not available at the moment',
  urlInputSave: 'Save',
  urlInputPlaceholder: 'Enter url of graphql endpoint',
};

export const ru = {
  id: 'ru',
  requestFieldLabel: 'Напишите свой запрос',
  requestFieldPlaceholder: 'Напишите свой graph-ql запрос',
  responseFieldLabel: 'Ответ сервера',
  responseFieldPlaceholder: 'Отсутствуют данные для отображения',
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
  ...formValidationErrorsRu,
  ...signInPageRu,
  ...signupPageRu,
  editorTitle: 'GraphQL редактор',
  loadingText: 'Загрузка...',
  documentationExplorerTitle: 'Обозреватель документации',
  documentationExplorerErrorUrl:
    'Чтобы получить доступ к обозревателю документации, укажите правильный URL-адрес graphql endpoint',
  documentationExplorerErrorNoSchema:
    'Сожалеем, но документация на данный момент недоступна',
  urlInputSave: 'Сохранить',
  urlInputPlaceholder: 'Введите URL-адрес конечной точки GraphQL',
};

export type TLocale = typeof en;

interface ILocalesObject {
  [key: string]: TLocale;
}

export const locale: ILocalesObject = { en, ru };

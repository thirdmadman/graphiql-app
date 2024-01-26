import * as yup from 'yup';
import { ref } from 'yup';
import { formValidationErrors } from '@/locales/locale';

export const formSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, formValidationErrors.NameLength)
    .matches(/^[\p{L}]+$/gu, formValidationErrors.NameLetters)
    .required(formValidationErrors.RequiredField),
  email: yup
    .string()
    .email(formValidationErrors.InvalidEmail)
    .required(formValidationErrors.RequiredField),
  password: yup
    .string()
    .required(formValidationErrors.RequiredField)
    .min(8, formValidationErrors.PasswordLength)
    .matches(/\p{N}/u, formValidationErrors.PasswordNumber)
    .matches(/\p{L}/u, formValidationErrors.PasswordLetter)
    .matches(/\p{S}|\p{P}/u, formValidationErrors.PasswordCharacter),
  passwordConfirmation: yup
    .string()
    .required(formValidationErrors.RequiredField)
    .oneOf([ref('password')], formValidationErrors.PasswordMatch)
    .min(8, formValidationErrors.PasswordLength)
    .matches(/\p{N}/u, formValidationErrors.PasswordNumber)
    .matches(/\p{L}/u, formValidationErrors.PasswordLetter)
    .matches(/\p{S}|\p{P}/u, formValidationErrors.PasswordCharacter),
  terms: yup.boolean().test(formValidationErrors.Terms, (terms) => !!terms),
});

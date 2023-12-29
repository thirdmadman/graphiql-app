import * as yup from 'yup';
import { formValidationErrors } from '@/locales/locale';

export const signInFormSchema = yup.object().shape({
  email: yup
    .string()
    .email(formValidationErrors.InvalidEmail)
    .required(formValidationErrors.RequiredField),
  password: yup
    .string()
    .min(8, formValidationErrors.PasswordLength)
    .required(formValidationErrors.RequiredField),
});

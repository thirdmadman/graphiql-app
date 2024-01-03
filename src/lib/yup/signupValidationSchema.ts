import * as yup from 'yup';
import { ref } from 'yup';

export const formSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Must be 2 or more characters')
    .matches(/^[\p{L}]+$/gu, 'Must contain only letters')
    .required('Required field'),
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Required field'),
  password: yup
    .string()
    .required('Required field')
    .min(8, 'Must be 8 or more characters')
    .matches(/\p{N}/u, 'Must contain at least one number')
    .matches(/\p{L}/u, 'Must contain at least one letter')
    .matches(/\p{S}|\p{P}/u, 'Must contain at least one special character'),
  passwordConfirmation: yup
    .string()
    .required('Required field')
    .oneOf([ref('password')], 'Passwords do not match')
    .min(8, 'Must be 8 or more characters')
    .matches(/\p{N}/u, 'Must contain at least one number')
    .matches(/\p{L}/u, 'Must contain at least one letter')
    .matches(/\p{S}|\p{P}/u, 'Must contain at least one special character'),
  terms: yup
    .boolean()
    .test('You should accept terms and conditions', (terms) => !!terms),
});

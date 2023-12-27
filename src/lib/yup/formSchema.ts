import * as yup from 'yup';
import { ref } from 'yup';

export const formSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Required field'),
  password: yup
    .string()
    .required('Required field')
    .min(8, 'Must be 8 or more characters')
    .matches(/[0-9]/, 'Must contain at least one number')
    .matches(/[a-z]/, 'Must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
    .matches(/\W|_/, 'Must contain at least one special character'),
  passwordConfirmation: yup
    .string()
    .required('Required field')
    .oneOf([ref('password')], 'Passwords do not match')
    .min(8, 'Must be 8 or more characters')
    .matches(/[0-9]/, 'Must contain at least one number')
    .matches(/[a-z]/, 'Must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
    .matches(/\W|_/, 'Must contain at least one special character'),

  terms: yup
    .boolean()
    .test('You should accept terms and conditions', (terms) => !!terms),
});

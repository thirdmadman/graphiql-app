import * as yup from 'yup';
import { ref } from 'yup';

export const formSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email address.')
    .required('Required field'),
  password: yup
    .string()
    .matches(/\W|_/, 'Must contain at least one special character')
    .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Must contain at least one number')
    .min(8, 'Must be 8 or more characters')
    .required('Required field'),
  confirmpassword: yup
    .string()
    .oneOf([ref('password')], 'Passwords do not match')
    .matches(/\W|_/, 'Must contain at least one special character')
    .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Must contain at least one number')
    .min(8, 'Must be 8 or more characters')
    .required('Required field'),
  terms: yup
    .boolean()
    .test('You should accept terms and conditions', (terms) => !!terms),
});

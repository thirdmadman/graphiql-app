import * as yup from 'yup';

export const formSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is a required field'),
  password: yup
    .string()
    .min(6, 'Password must be 6 or more characters')
    .matches(/[a-z]/, 'Password must contain at least 1 lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least 1 uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least 1 number')
    .matches(/\W|_/, 'Password must contain at least 1 special character')
    .required('Password is required field'),
});

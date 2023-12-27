import * as yup from 'yup';

export const signInFormSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is a required field'),
  password: yup
    .string()
    .min(8, 'Password must be 8 or more characters')
    .required('Password is required field'),
});

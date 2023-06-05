import * as Yup from 'yup';

export const userSchema = Yup.object({
  phone: Yup.string()
    .matches(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, 'Invalid phone number')
    .required('Phone is required'),

  email: Yup.string().email('Invalid email address').required('Email is required'),
});

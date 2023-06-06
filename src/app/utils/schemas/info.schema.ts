import * as Yup from 'yup';

export const infoSchema = Yup.object({
  nickname: Yup.string()
    .max(30, 'Must be 30 characters or less')
    .matches(/^[a-zA-Zа-яА-Я0-9 ]+$/, 'Only letters and digits are allowed')
    .required('Nickname is required'),
  name: Yup.string()
    .max(50, 'Must be 50 characters or less')
    .matches(/^[a-zA-Zа-яА-Я ]+$/, 'Only letters are allowed')
    .required('Name is required'),
  surname: Yup.string()
    .max(50, 'Must be 50 characters or less')
    .matches(/^[a-zA-Zа-яА-Я ]+$/, 'Only letters are allowed')
    .required('Surname is required'),

  sex: Yup.mixed().oneOf(['man', 'woman'], 'Invalid value').required('Gender is required'),
});

import * as Yup from 'yup';

export const authSchema = Yup.object({
  phone: Yup.string()
    .matches(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, 'Неверный формат')
    .required('Обязательное поле'),

  email: Yup.string()
    .matches(/^[^\s@]+@[^\s@]+\.(ru|com)$/i, 'Неверный формат')
    .email('Неверный формат email')
    .required('Обязательное поле'),
});

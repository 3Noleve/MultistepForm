import * as Yup from 'yup'

import { InfoFormInputs } from '~/app/types'

export const infoSchema = Yup.object({
  nickname: Yup.string()
    .required('Поле обязательно')
    .max(30, 'Максимальная длина 30 символов')
    .matches(/^[а-яА-ЯёЁ0-9a-zA-Z]+$/, 'Может содержать только буквы и цифры'),
  name: Yup.string()
    .required('Поле обязательно')
    .max(50, 'Максимальная длина 50 символов')
    .matches(/^[а-яА-ЯёЁa-zA-Z]+$/, 'Может содержать только буквы'),
  surname: Yup.string()
    .required('Поле обязательно')
    .max(50, 'Максимальная длина 50 символов')
    .matches(/^[а-яА-ЯёЁa-zA-Z]+$/, 'Может содержать только буквы'),

  sex: Yup.mixed<InfoFormInputs['sex']>()
    .required('Поле обязательно')
    .oneOf(['man', 'woman'], 'Значение должно быть "man" или "woman"')
})

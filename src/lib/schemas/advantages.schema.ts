import * as Yup from 'yup'

export const advantagesSchema = Yup.object({
  advantages: Yup.array(Yup.string().required('Обязательное поле')),
  radio: Yup.number().required('Выберите минимум 1 поле'),
  checkbox: Yup.array(Yup.number()).min(1, 'Выберите минимум 1 поле')
})

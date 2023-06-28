import * as Yup from 'yup'

export const aboutSchema = Yup.object().shape({
  field: Yup.string()
    .required('Поле обязательно')
    .test(
      'len',
      'Максимальная длина - 200 символов',
      (val) => val!.replace(/\s/g, '').length <= 200
    )
})

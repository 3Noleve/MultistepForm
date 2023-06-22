'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { memo, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '~/app/redux/hooks'
import { FormSliceActions } from '~/app/redux/features/FormSlice'
import { StatusActions } from '~/app/redux/features/StepSlice'
import { InfoFormInputs } from '~/app/types'
import { infoSchema } from '~/lib/schemas'
import Link from 'next/link'
import { Metadata } from 'next'
import { Button, Flex, FormField, Input, Select } from '~/components/ui'
import { Options } from '~/lib/constants'

export const metadata: Metadata = {
  title: 'Введите свои данные...',
  description: 'Это страница Info'
}

const page = memo(() => {
  const { sex, name, surname, nickname } = useAppSelector(
    (state) => state.FormReducer
  )
  const { currentStep } = useAppSelector((state) => state.StepReducer)

  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { errors, isValid }
  } = useForm<InfoFormInputs>({
    resolver: yupResolver(infoSchema),
    defaultValues: {
      sex,
      name: name!,
      nickname: nickname!,
      surname: surname!
    }
  })

  const onSubmitHandler: SubmitHandler<InfoFormInputs> = (data) => {
    if (isValid) {
      dispatch(StatusActions.setCurrentStep(currentStep + 1))
    }

    console.log({ ...data })
  }

  useEffect(() => {
    return () => {
      const { name, nickname, surname, sex } = getValues()

      dispatch(FormSliceActions.setName(name))
      dispatch(FormSliceActions.setNickname(nickname))
      dispatch(FormSliceActions.setSurname(surname))
      dispatch(FormSliceActions.setSex(sex))

      console.log(name, nickname, surname, sex)
    }
  }, [])

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <Flex
        direction={'column'}
        gap={32}
        align={'start'}
        className='mb-[88px]'
      >
        <Input
          label='Nickname'
          type='text'
          id='field-nickname'
          placeholder='Введите ник...'
          error={errors.nickname}
          {...register('nickname')}
          // required
        />

        <Input
          label='Name'
          type='text'
          id='field-name'
          placeholder='Введите имя...'
          error={errors.name}
          {...register('name')}
          // required
        />

        <Input
          label='Surname'
          type='text'
          id='field-surname'
          placeholder='Введите фамилию...'
          error={errors.surname}
          {...register('surname')}
          // required
        />

        <FormField
          name='sex'
          control={control}
          render={({ field }) => (
            <Select
              options={Options}
              label={'Sex'}
              error={errors.sex}
              id='field-sex'
              {...register('sex')}
              {...field}
            />
          )}
        />
      </Flex>

      <Flex
        direction={'row'}
        justify={'between'}
        gap={8}
        fill
      >
        <Link href='/'>
          <Button variant={'outline'}>Назад</Button>
        </Link>

        <Button type='submit'>Далее</Button>
      </Flex>
    </form>
  )
})

export default page

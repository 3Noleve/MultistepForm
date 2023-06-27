'use client'

import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import useFormPersist from 'react-hook-form-persist'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'

import { useAppDispatch, useAppSelector } from '~/app/redux/hooks'
import { FormSliceActions } from '~/app/redux/features/FormSlice'
import { StatusActions } from '~/app/redux/features/StepSlice'
import { InfoFormInputs } from '~/app/types'
import { infoSchema } from '~/lib/schemas'
import { SelectOptions } from '~/lib/constants'

import { Button, Flex, FormField, Input, Select } from '~/components/ui'

const page = () => {
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
    watch,
    setValue,
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

  useFormPersist('info-form', { watch, setValue, storage: window.localStorage })

  const onSubmitHandler: SubmitHandler<InfoFormInputs> = () => {
    if (isValid) {
      dispatch(StatusActions.setCurrentStep(currentStep + 1))
    }
  }

  useEffect(() => {
    return () => {
      const { name, nickname, surname, sex } = getValues()

      dispatch(FormSliceActions.setName(name))
      dispatch(FormSliceActions.setNickname(nickname))
      dispatch(FormSliceActions.setSurname(surname))
      dispatch(FormSliceActions.setSex(sex))
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
          required
        />

        <Input
          label='Name'
          type='text'
          id='field-name'
          placeholder='Введите имя...'
          error={errors.name}
          {...register('name')}
          required
        />

        <Input
          label='Surname'
          type='text'
          id='field-surname'
          placeholder='Введите фамилию...'
          error={errors.surname}
          {...register('surname')}
          required
        />

        <FormField
          render={({ field }) => (
            <Select
              {...field}
              options={SelectOptions}
              label={'Sex'}
              error={errors.sex}
              id='field-sex'
            />
          )}
          name='sex'
          control={control}
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
}

export default page

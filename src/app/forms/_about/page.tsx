'use client'

import { useAppDispatch, useAppSelector } from '~/app/redux/hooks'
import { FormSliceActions } from '~/app/redux/features/FormSlice'
import { StatusActions } from '~/app/redux/features/StepSlice'
import { SubmitHandler, useForm } from 'react-hook-form'
import { AboutFormInput } from '~/app/types'
import { yupResolver } from '@hookform/resolvers/yup'
import { aboutSchema } from '~/lib/schemas'
import { useCallback, useEffect } from 'react'
import { Button, Flex, Textarea } from '~/components/ui'

const page = () => {
  const { about } = useAppSelector((state) => state.FormReducer)
  const { currentStep } = useAppSelector((state) => state.StepReducer)

  const formData = useAppSelector((state) => state.FormReducer)

  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
    watch
  } = useForm<AboutFormInput>({
    mode: 'all',
    resolver: yupResolver(aboutSchema),
    defaultValues: {
      field: about || ''
    }
  })

  const charsLength = watch('field').replace(/\s+/g, '').length

  const onSubmitHandler: SubmitHandler<AboutFormInput> = async (data) => {
    const message = data.field.replace(/\s+/g, ' ')

    dispatch(FormSliceActions.setAbout(message))

    if (isValid) {
      const response = await fetch('http://localhost:3004/posts', {
        method: 'POST',
        body: JSON.stringify({ ...formData, about: message }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        return console.warn('Error')
      }
    }
  }

  const handlePrevStep = useCallback(() => {
    dispatch(StatusActions.setCurrentStep(currentStep - 1))
  }, [currentStep])

  useEffect(() => {
    return () => {
      const { field } = getValues()

      dispatch(FormSliceActions.setAbout(field))
    }
  }, [])

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <Flex
        direction={'column'}
        align={'start'}
        gap={24}
      >
        <Textarea
          placeholder='Введите текст...'
          style={{ resize: 'none' }}
          label='About'
          error={errors.field}
          chars={charsLength}
          {...register('field')}
        />

        <Flex
          direction={'row'}
          justify={'between'}
          gap={8}
          fill
        >
          <Button
            variant={'outline'}
            onClick={handlePrevStep}
          >
            Назад
          </Button>
          <Button type='submit'>Отправить</Button>
        </Flex>
      </Flex>
    </form>
  )
}

export default page

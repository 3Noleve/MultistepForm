'use client'

import { useCallback, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'

import { SubmitHandler, useForm } from 'react-hook-form'

import useFormPersist from 'react-hook-form-persist'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAppDispatch, useAppSelector } from '~/app/redux/hooks'
import { FormSliceActions } from '~/app/redux/features/FormSlice'
import { StatusActions } from '~/app/redux/features/StepSlice'
import { AboutFormInput } from '~/app/types'
import { aboutSchema } from '~/lib/schemas'
import { Button, Flex, Textarea } from '~/components/ui'

const page = () => {
  const router = useRouter()

  const { about } = useAppSelector((state) => state.FormReducer)
  const { currentStep } = useAppSelector((state) => state.StepReducer)

  const formData = useAppSelector((state) => state.FormReducer)

  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors, isValid },
    watch
  } = useForm<AboutFormInput>({
    mode: 'all',
    resolver: yupResolver(aboutSchema),
    defaultValues: {
      field: about || ''
    }
  })

  useFormPersist('about-form', {
    watch,
    setValue,
    storage: window.localStorage
  })

  const clearLocalStorage = useMemo(() => {
    return () => {
      Object.keys(window.localStorage).forEach((key) => {
        if (key.includes('-form')) {
          window.localStorage.removeItem(key)
        }
      })
    }
  }, [])

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

      clearLocalStorage()

      reset()

      router.push('/')
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
          label='About'
          error={errors.field}
          chars={charsLength}
          maxChars={200}
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

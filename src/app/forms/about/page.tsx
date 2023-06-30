'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import useFormPersist from 'react-hook-form-persist'

import { FormSliceActions } from '~/app/redux/features/FormSlice'
import { StatusActions } from '~/app/redux/features/StepSlice'
import { useAppDispatch, useAppSelector } from '~/app/redux/hooks'
import { AboutFormInput } from '~/app/types'
import { Button, Flex, Textarea } from '~/components/ui'
import { Modal } from '~/components/ui/Modal/modal'
import { api } from '~/lib/api'
import { aboutSchema } from '~/lib/schemas'

const AboutPage = () => {
  const [active, setActive] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

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

  const clearLocalStorage = useCallback(() => {
    typeof window !== undefined &&
      Object.keys(localStorage).forEach((key) => {
        if (key.includes('-form')) {
          localStorage.removeItem(key)
        }
      })
  }, [])

  const charsLength = watch('field').replace(/\s+/g, '').length

  const onSubmitHandler: SubmitHandler<AboutFormInput> = async (data) => {
    const message = data.field.replace(/\s+/g, ' ')

    dispatch(FormSliceActions.setAbout(message))

    if (isValid) {
      const response = await fetch(api, {
        method: 'POST',
        body: JSON.stringify({ ...formData, about: message }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        setIsSuccess(false)
        setActive(true)
      } else {
        setIsSuccess(true)
        setActive(true)

        clearLocalStorage()
        reset()
      }
    }
  }

  const handleModalClick = useCallback(() => {
    if (!isSuccess) {
      setActive(false)
      return
    }

    dispatch(StatusActions.setCurrentStep(1))
    dispatch(FormSliceActions.reset())

    router.push('/')
  }, [dispatch, isSuccess, router])

  const handlePrevStep = useCallback(() => {
    dispatch(StatusActions.setCurrentStep(currentStep - 1))
  }, [currentStep, dispatch])

  useEffect(() => {
    return () => {
      const { field } = getValues()

      dispatch(FormSliceActions.setAbout(field))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
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

      <Modal
        active={active}
        setActive={setActive}
        isSuccess={isSuccess}
      >
        <Flex direction={'row'}>
          {isSuccess ? (
            <Button onClick={handleModalClick}>На Главную</Button>
          ) : (
            <Button onClick={handleModalClick}>Закрыть</Button>
          )}
        </Flex>
      </Modal>
    </>
  )
}

export default AboutPage

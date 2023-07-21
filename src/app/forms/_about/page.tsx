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
import { RequestModal, UserDataModal } from '~/components/ui/Modals'
import { api } from '~/lib/api'
import { aboutSchema } from '~/lib/schemas'
import { cn } from '~/lib/utils'

import styles from './about.module.scss'

const AboutPage = () => {
  const [active, setActive] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [userDataActive, setIsUserDataActive] = useState<boolean>(false)

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
    storage: typeof window !== 'undefined' ? window.localStorage : undefined
  })

  const clearLocalStorage = useCallback(() => {
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

  const handleShowUserData = useCallback(() => {
    setActive(false)
    setIsUserDataActive(true)
  }, [])

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

      <>
        <RequestModal
          active={active}
          setActive={setActive}
          isSuccess={isSuccess}
        >
          <Flex direction={'row'}>
            {isSuccess ? (
              <Flex
                justify={'between'}
                gap={8}
                fill
              >
                <Button
                  className={cn(styles['modal-btn'])}
                  onClick={handleModalClick}
                >
                  На Главную
                </Button>
                <Button
                  className={cn(styles['modal-btn'])}
                  variant={'outline'}
                  onClick={handleShowUserData}
                >
                  Посмотреть свои Данные
                </Button>
              </Flex>
            ) : (
              <Button
                className={cn(styles['modal-btn'])}
                onClick={handleModalClick}
              >
                Закрыть
              </Button>
            )}
          </Flex>
        </RequestModal>

        <UserDataModal
          active={userDataActive}
          setActive={setIsUserDataActive}
          formData={formData}
        >
          <Flex direction={'row'}>
            <Flex
              justify={'between'}
              gap={8}
              fill
            >
              <Button onClick={handleModalClick}>На Главную</Button>
            </Flex>
          </Flex>
        </UserDataModal>
      </>
    </>
  )
}

export default AboutPage

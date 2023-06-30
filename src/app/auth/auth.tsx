'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'

import { FormSliceActions } from '~/app/redux/features/FormSlice'
import { useAppDispatch, useAppSelector } from '~/app/redux/hooks'
import { AuthFormInputs } from '~/app/types'
import {
  Button,
  Flex,
  Form,
  FormField,
  Input,
  InputMask
} from '~/components/ui'
import { authSchema } from '~/lib/schemas'

const AuthForm = () => {
  const { email, phone } = useAppSelector((state) => state.FormReducer)

  const dispatch = useAppDispatch()

  const router = useRouter()

  const form = useForm<AuthFormInputs>({
    resolver: yupResolver(authSchema),
    defaultValues: { email: email!, phone: phone! },
    mode: 'onChange'
  })

  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { isValid, errors, isSubmitting }
  } = form

  const onSubmitHandler: SubmitHandler<AuthFormInputs> = () => {
    if (isValid) {
      router.push('/forms')
    }
  }

  useEffect(() => {
    return () => {
      const { email, phone } = getValues()

      dispatch(FormSliceActions.setEmail(email))

      dispatch(FormSliceActions.setPhone(phone && phone.replace(/[^\d]/g, '')))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Form {...form}>
      <form
        className='w-full'
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <Flex
          direction={'column'}
          align={'start'}
          gap={24}
        >
          <FormField
            name='phone'
            control={control}
            render={({ field }) => (
              <InputMask
                label='Номер телефона'
                type='phone'
                mask='+7 (999) 999-99-99'
                placeholder={phone!}
                error={errors.phone}
                required
                disabled
                {...field}
              />
            )}
          />

          <Input
            disabled
            {...register('email')}
            placeholder={email!}
            label='Email'
            type='email'
            error={errors.email}
          />
        </Flex>

        <Button
          disabled={isSubmitting}
          type={'submit'}
          id='button-start'
          className='mt-12'
        >
          Начать
        </Button>
      </form>
    </Form>
  )
}

export default AuthForm

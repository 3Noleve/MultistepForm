'use client'

import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Button,
  Flex,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  InputMask
} from '~/components/ui'
import { useAppDispatch, useAppSelector } from '~/app/redux/hooks'
import { FormSliceActions } from '~/app/redux/features/FormSlice'
import { AuthFormInputs } from '~/app/types'
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

  const onSubmitHandler: SubmitHandler<AuthFormInputs> = (data) => {
    if (isValid) {
      router.push('/forms')
    }

    console.log({ ...data })
  }

  useEffect(() => {
    return () => {
      const { email, phone } = getValues()

      dispatch(FormSliceActions.setEmail(email))

      dispatch(FormSliceActions.setPhone(phone && phone.replace(/[^\d]/g, '')))
    }
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
                placeholder='+7 (800) 555-35-35'
                error={errors.phone}
                // required
                {...field}
              />
            )}
          />

          <Input
            {...register('email')}
            placeholder='johndoe@gmail.com'
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

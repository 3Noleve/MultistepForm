'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { authSchema } from '~/app/utils/schemas';
import { yupResolver } from '@hookform/resolvers/yup';
import InputMask from 'react-input-mask';
import { AuthFormInputs } from '~/app/types';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setEmail, setPhone } from '../redux/features/FormSlice';
import { useRouter } from 'next/navigation';

const page = () => {
  const { email, phone } = useAppSelector((state) => state.FormReducer);

  const dispatch = useAppDispatch();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AuthFormInputs>({
    mode: 'onChange',
    resolver: yupResolver(authSchema),
    defaultValues: { email: email!, phone: phone! },
  });

  const onSubmit: SubmitHandler<AuthFormInputs> = (data) => {
    if (isValid) {
      dispatch(setEmail(data.email));
      dispatch(setPhone(data.phone));

      router.push('/forms');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="phone-number">Номер телефона</label>
          <InputMask
            type="phone"
            mask="+7 (999) 999-99-99"
            {...register('phone')}
            placeholder="+7 (999) 999-99-99"
            required
          />

          {errors.phone && errors.phone.message}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input type="email" {...register('email')} placeholder="johndoe@example.com" required />

          {errors.email && errors.email.message}
        </div>

        <button id="button-start" type="submit">
          Начать
        </button>
      </form>
    </div>
  );
};

export default page;

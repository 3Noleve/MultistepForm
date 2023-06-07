'use client';

import { useForm } from 'react-hook-form';
import { userSchema } from '~/app/utils/schemas';
import { yupResolver } from '@hookform/resolvers/yup';
import InputMask from 'react-input-mask';
import Link from 'next/link';
import { UserFormInputs } from '~/app/types';

const page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UserFormInputs>({ resolver: yupResolver(userSchema) });

  const onSubmit = (data: UserFormInputs) => {
    console.log(data);
  };

  const handleClick = (e: React.FormEvent) => {
    if (!isValid) {
      e.preventDefault();

      console.warn('Пожалуйста, заполните все поля формы');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="phone-number">Номер телефона</label>
          <InputMask
            type="tel"
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

        {!isValid ? (
          <button type="submit" id="button-start">
            Отправить
          </button>
        ) : (
          <button type="submit" id="button-start">
            Отправить
          </button>
        )}

        <Link href="/forms">
          <button id="button-start" onClick={handleClick}>
            Начать
          </button>
        </Link>
      </form>
    </div>
  );
};

export default page;

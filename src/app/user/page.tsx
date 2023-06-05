'use client';

import { useForm } from 'react-hook-form';
import { userSchema } from '~/app/utils/schemas/user';
import { yupResolver } from '@hookform/resolvers/yup';
import InputMask from 'react-input-mask';
import Link from 'next/link';
import { UserFormInputs } from '~/app/types/UserFormInputs';

const page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UserFormInputs>({ resolver: yupResolver(userSchema) });

  const onSubmit = (data: UserFormInputs) => {
    console.log(data);
  };

  const handleClick = (event: React.FormEvent) => {
    if (!isValid) {
      event.preventDefault();

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
            id="phone"
            {...register('phone', { required: true, pattern: /\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}/ })}
            placeholder="+7 (___) ___-__-__"
          />

          {errors.phone && errors.phone.message}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register('email', {
              required: true,
              pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/,
            })}
            placeholder="johndoe@example.com"
          />

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

        <Link href="/info">
          <button id="link-info" onClick={handleClick}>
            Начать
          </button>
        </Link>
      </form>
    </div>
  );
};

export default page;

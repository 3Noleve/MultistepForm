'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { memo } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '~/app/redux/hooks';
import { setName, setNickname, setSurname, setSex } from '~/app/redux/features/FormSlice';
import { setCurrentStep } from '~/app/redux/features/StepSlice';
import { InfoFormInputs } from '~/app/types';
import { infoSchema } from '~/app/utils/schemas';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Введите свои данные...',
  description: 'Это страница Info',
};

const page = memo(() => {
  const { sex, name, surname, nickname } = useAppSelector((state) => state.FormReducer);
  const { currentStep } = useAppSelector((state) => state.StepReducer);

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<InfoFormInputs>({
    resolver: yupResolver(infoSchema),
    defaultValues: {
      sex,
      name: name!,
      nickname: nickname!,
      surname: surname!,
    },
  });

  const onSubmitHandler: SubmitHandler<InfoFormInputs> = (data) => {
    if (isValid) {
      dispatch(setName(data.name));
      dispatch(setNickname(data.nickname));
      dispatch(setSurname(data.surname));
      dispatch(setSex(data.sex));
      dispatch(setCurrentStep(currentStep + 1));
    }

    console.log({ ...data });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div>
          <label htmlFor="nickname">Nickname</label>

          <input
            type="text"
            id="field-nickname"
            placeholder="Введите ник..."
            {...register('nickname')}
            required
          />

          {errors.nickname && errors.nickname.message}
        </div>
        <div>
          <label htmlFor="name">Name</label>

          <input
            type="text"
            id="field-name"
            placeholder="Введите имя..."
            {...register('name')}
            required
          />

          {errors.name && errors.name.message}
        </div>
        <div>
          <label htmlFor="surname">Surname</label>

          <input
            type="text"
            id="field-surname"
            placeholder="Введите фамилию..."
            {...register('surname')}
            required
          />

          {errors.surname && errors.surname.message}
        </div>
        <div>
          <label htmlFor="sex">Sex</label>

          <Controller
            name="sex"
            control={control}
            render={({ field }) => (
              <select {...field} id="field-sex" required>
                <option value="man" id="field-sex-option-man">
                  Man
                </option>
                <option value="woman" id="field-sex-option-woman">
                  Woman
                </option>
              </select>
            )}></Controller>

          {errors.sex && errors.sex.message}
        </div>

        <button type="submit">Далее</button>

        <Link href="/">
          <button>Назад</button>
        </Link>
      </form>
    </div>
  );
});

export default page;

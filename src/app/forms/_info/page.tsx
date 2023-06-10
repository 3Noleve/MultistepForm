'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '~/app/redux/hooks';
import { setData, setStep } from '~/app/redux/features/infoFormSlice';
import { InfoFormInputs } from '~/app/types';
import { infoSchema } from '~/app/utils/schemas';
import Link from 'next/link';

const page = () => {
  const { data, step } = useAppSelector((state) => state.FormReducer);

  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<InfoFormInputs>({
    nickname: data.nickname || '',
    name: data.name || '',
    sex: data.sex || '',
    surname: data.surname || '',
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<InfoFormInputs>({ resolver: yupResolver(infoSchema) });

  const onSubmit = () => {
    console.log(data);
  };

  const handleNextStep = () => {
    isValid && dispatch(setStep(step + 1));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    dispatch(setData({ name, value }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="nickname">Nickname</label>

          <input
            type="text"
            id="field-nickname"
            placeholder="Введите ник..."
            {...register('nickname')}
            value={formData.nickname}
            onChange={handleInputChange}
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
            value={formData.name}
            onChange={handleInputChange}
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
            value={formData.surname}
            onChange={handleInputChange}
            required
          />

          {errors.surname && errors.surname.message}
        </div>
        <div>
          <label htmlFor="sex">Sex</label>

          <select id="field-sex" {...register('sex')} required>
            <option value="man" id="field-sex-option-man">
              Man
            </option>
            <option value="woman" id="field-sex-option-woman">
              Woman
            </option>
          </select>
          {/* //! не указывется какой пол у пользователя */}

          {errors.sex && errors.sex.message}
        </div>

        <button type="submit" onClick={handleNextStep}>
          Далее
        </button>

        <Link href="/">
          <button>Назад</button>
        </Link>
      </form>
    </div>
  );
};

export default page;

'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { InfoFormInputs } from '~/app/types';
import { infoSchema } from '~/app/utils/schemas';

const page = () => {
  const [nickname, setNickname] = useState('');
  const [name, setName] = useState('');
  const [surName, setSurName] = useState('');
  const [sex, setSex] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InfoFormInputs>({ resolver: yupResolver(infoSchema) });

  const onSubmit = (data: InfoFormInputs) => {
    console.log(data);
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="nickname">Nickname</label>

          <input
            type="text"
            id="field-nickname"
            value={nickname}
            {...register('nickname')}
            onChange={handleNicknameChange}
            required
          />

          {errors.nickname && errors.nickname.message}
        </div>

        <div>
          <label htmlFor="name">Name</label>

          <input type="text" id="field-name" {...register('name')} required />

          {errors.name && errors.name.message}
        </div>

        <div>
          <label htmlFor="surname">Surname</label>

          <input type="text" id="field-surname" {...register('surname')} required />

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

          {errors.sex && errors.sex.message}
        </div>

        <button type="button">Назад</button>

        <button type="submit">Далее</button>
      </form>
    </div>
  );
};

export default page;

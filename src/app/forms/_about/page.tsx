'use client';

import { useAppDispatch, useAppSelector } from '~/app/redux/hooks';
import { setAbout } from '~/app/redux/features/FormSlice';
import { setCurrentStep } from '~/app/redux/features/StepSlice';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AboutFormInput } from '~/app/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { aboutSchema } from '~/app/utils/schemas';
import { useCallback } from 'react';

const page = () => {
  const { about } = useAppSelector((state) => state.FormReducer);
  const { currentStep } = useAppSelector((state) => state.StepReducer);

  const formData = useAppSelector((state) => state.FormReducer);

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<AboutFormInput>({
    mode: 'all',
    resolver: yupResolver(aboutSchema),
    defaultValues: {
      field: about || '',
    },
  });

  const charsLength = watch('field').replace(/\s+/g, '').length;

  const onSubmitHandler: SubmitHandler<AboutFormInput> = (data) => {
    const message = data.field.replace(/\s+/g, ' ');

    if (isValid) {
      dispatch(setAbout(message));

      console.log({ formData });
    }
  };

  const handlePrevStep = useCallback(() => {
    dispatch(setCurrentStep(currentStep - 1));
  }, [currentStep]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div>
          <label htmlFor="About">About</label>
          <textarea
            placeholder="Введите текст..."
            cols={100}
            rows={5}
            style={{ resize: 'none' }}
            {...register('field')}
          />
          <span>{charsLength}</span>
          {errors.field && errors.field.message}
        </div>

        <button onClick={handlePrevStep}>Назад</button>
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
};

export default page;

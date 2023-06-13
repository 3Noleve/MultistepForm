'use client';

import { useAppDispatch, useAppSelector } from '~/app/redux/hooks';
import { setAdvantages, setCheckbox, setRadio } from '~/app/redux/features/FormSlice';
import { memo, useCallback, useEffect } from 'react';
import { AdvantagesFormInputs } from '~/app/types';
import { Controller, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { advantagesSchema } from '~/app/utils/schemas';
import { setCurrentStep } from '~/app/redux/features/StepSlice';

const page = memo(() => {
  const { advantages, checkbox, radio } = useAppSelector((state) => state.FormReducer);
  const { currentStep } = useAppSelector((state) => state.StepReducer);

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<AdvantagesFormInputs>({
    mode: 'all',
    resolver: yupResolver(advantagesSchema),
    defaultValues: {
      checkbox: checkbox,
      radio: radio!,
      advantages: advantages,
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: 'advantages' as never,
    control,
  });

  const onSubmitHandler: SubmitHandler<AdvantagesFormInputs> = (data) => {
    if (isValid) {
      dispatch(setAdvantages(data.advantages));
      dispatch(setRadio(data.radio));
      dispatch(setCurrentStep(currentStep + 1));

      console.log({ ...data });
    }
  };

  const handleRemoveField = (index: number) => {
    remove(index);
  };

  const handleChangeCheckboxField = useCallback(
    (value: number) => {
      dispatch(setCheckbox(value));
    },
    [dispatch],
  );

  const handleChangeRadioField = useCallback(
    (value: number) => {
      dispatch(setRadio(value));
    },
    [dispatch],
  );

  const handlePrevStep = useCallback(() => {
    dispatch(setCurrentStep(currentStep - 1));
  }, [currentStep]);

  useEffect(() => {
    append(['', '', '']);
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        This is advantages page
        <div>
          {fields.map((advantage, index) => (
            <Controller
              key={advantage.id}
              control={control}
              name={`advantages.${index}` as const}
              render={({ field }) => (
                <div>
                  <input
                    {...field}
                    id={`field-advantages-${index + 1}`}
                    placeholder="Advantages ..."
                  />

                  <button onClick={() => handleRemoveField(index)}>X</button>

                  {errors.advantages && errors.advantages[index]?.message}
                </div>
              )}
            />
          ))}

          <button onClick={() => append('')}>+</button>
        </div>
        <div>
          <label htmlFor="checkboxes">Checkbox group</label>
          {Array.from({ length: 3 })
            .fill(0)
            .map((_, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  {...register('checkbox')}
                  value={index + 1}
                  checked={checkbox.some((value) => value === index + 1)}
                  onChange={() => handleChangeCheckboxField(index + 1)}
                />

                <span>{index + 1}</span>
              </div>
            ))}
          {checkbox.length === 0 && errors.checkbox?.message}
        </div>
        <div>
          <label htmlFor="radios">Radio group</label>

          {Array.from({ length: 3 })
            .fill(0)
            .map((_, index) => (
              <div key={index}>
                <input
                  type="radio"
                  value={index + 1}
                  {...register('radio')}
                  checked={radio == index + 1}
                  onChange={() => handleChangeRadioField(index + 1)}
                />

                <span>{index + 1}</span>
              </div>
            ))}

          {errors.radio && errors.radio.message}
        </div>
        <button type="submit">Далее</button>
        <button onClick={handlePrevStep} type="button">
          Back
        </button>
      </form>
    </div>
  );
});

export default page;

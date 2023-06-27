'use client'

import { memo, useCallback, useEffect } from 'react'

import {
  SubmitHandler,
  useController,
  useFieldArray,
  useForm
} from 'react-hook-form'

import useFormPersist from 'react-hook-form-persist'

import { yupResolver } from '@hookform/resolvers/yup'

import { useAppDispatch, useAppSelector } from '~/app/redux/hooks'
import { StatusActions } from '~/app/redux/features/StepSlice'
import { FormSliceActions } from '~/app/redux/features/FormSlice'

import { AdvantagesFormInputs } from '~/app/types'

import { advantagesSchema } from '~/lib/schemas'

import {
  Label,
  Input,
  Flex,
  Button,
  FormField,
  Checkbox,
  Radio
} from '~/components/ui'

import { Trash2Icon, Plus } from 'lucide-react'

const page = () => {
  const { advantages, checkbox, radio } = useAppSelector(
    (state) => state.FormReducer
  )
  const { currentStep } = useAppSelector((state) => state.StepReducer)

  const dispatch = useAppDispatch()

  const {
    handleSubmit,
    control,
    getValues,
    watch,
    setValue,
    formState: { errors, isValid }
  } = useForm<AdvantagesFormInputs>({
    mode: 'all',
    resolver: yupResolver(advantagesSchema),
    defaultValues: {
      checkbox: checkbox,
      radio: radio!,
      advantages: advantages
    }
  })

  useFormPersist('advantages-form', {
    watch,
    setValue,
    storage: window.localStorage
  })

  const { fields, append, remove } = useFieldArray({
    name: 'advantages' as never,
    control
  })

  const {
    field: { onChange, value }
  } = useController({
    control,
    name: 'checkbox',
    defaultValue: []
  })

  const {
    field: { onChange: onChangeRadio, value: radioValue }
  } = useController({
    control,
    name: 'radio',
    defaultValue: undefined
  })

  const handleRemoveField = useCallback(
    (index: number) => {
      remove(index)
    },
    [remove]
  )

  const handleChangeCheckboxField = useCallback(
    (currentValue: number) => {
      if (!value.includes(currentValue)) {
        return onChange([...value, currentValue])
      }

      return onChange(value.filter((item) => item !== currentValue))
    },
    [onChange, value]
  )

  const handleChangeRadioField = useCallback(
    (value: number) => {
      onChangeRadio(value)
    },
    [onChangeRadio]
  )

  const handlePrevStep = useCallback(() => {
    dispatch(StatusActions.setCurrentStep(currentStep - 1))
  }, [currentStep])

  useEffect(() => {
    return () => {
      const { advantages, radio, checkbox } = getValues()

      dispatch(FormSliceActions.setAdvantages(advantages))
      dispatch(FormSliceActions.setCheckbox(checkbox))
      dispatch(FormSliceActions.setRadio(+radio))
    }
  }, [])

  const onSubmitHandler: SubmitHandler<AdvantagesFormInputs> = () => {
    if (isValid) {
      dispatch(StatusActions.setCurrentStep(currentStep + 1))
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <Flex
        direction={'column'}
        gap={24}
        align={'start'}
      >
        <Flex
          direction={'column'}
          gap={8}
          align={'start'}
        >
          <Label>Advantages</Label>

          {fields.map((advantage, index) => (
            <div>
              <FormField
                key={advantage.id}
                control={control}
                name={`advantages.${index}` as const}
                render={({ field }) => (
                  <Flex
                    direction={'column'}
                    align={'start'}
                  >
                    <Flex>
                      <Input
                        {...field}
                        id={`field-advantages-${index + 1}`}
                        placeholder='Advantages ...'
                        error={errors.advantages?.[index]}
                      />

                      <button onClick={() => handleRemoveField(index)}>
                        <Trash2Icon className='h-6 w-12' />
                      </button>
                    </Flex>
                  </Flex>
                )}
              />
            </div>
          ))}

          <Flex
            align={'center'}
            justify={'center'}
            className='border-2 border-primary rounded w-10 h-10'
          >
            <Button
              variant={'icon'}
              onClick={() => append('')}
            >
              <Plus className='h-5 text-primary' />
            </Button>
          </Flex>
        </Flex>

        <Flex
          className='mt-4'
          direction={'column'}
          align={'start'}
          gap={8}
        >
          <Label htmlFor='checkboxes'>Checkbox group</Label>

          {Array.from({ length: 3 })
            .fill(0)
            .map((_, index) => (
              <Checkbox
                label={index + 1}
                value={index + 1}
                checked={value.includes(index + 1)}
                onChange={() => handleChangeCheckboxField(index + 1)}
              />
            ))}

          <Label className='text-destructive mt-1'>
            {errors.checkbox && errors.checkbox?.message}
          </Label>
        </Flex>
        <Flex
          direction={'column'}
          align={'start'}
          gap={8}
        >
          <Label htmlFor='radios'>Radio group</Label>

          {Array.from({ length: 3 })
            .fill(0)
            .map((_, index) => (
              <Radio
                label={index + 1}
                value={index + 1}
                checked={radioValue === index + 1}
                onChange={() => handleChangeRadioField(index + 1)}
              />
            ))}

          <Label className='text-destructive mt-1'>
            {errors.radio && errors.radio.message}
          </Label>
        </Flex>

        <Flex
          direction={'row'}
          justify={'between'}
          gap={8}
          fill
        >
          <Button
            variant={'outline'}
            onClick={handlePrevStep}
            type='button'
          >
            Назад
          </Button>
          <Button type='submit'>Далее</Button>
        </Flex>
      </Flex>
    </form>
  )
}

export default page

import { cn } from '~/lib/utils'
import { Flex, Label } from '../ui'

type Labels = { label: number | string }

interface StepperProps {
  currentStep: number
  labels: Labels[]
  onStepClick: (step: number) => void
}

export const Stepper = ({ currentStep, labels, onStepClick }: StepperProps) => {
  return (
    <ul>
      <Flex
        direction={'row'}
        align={'start'}
        justify={'between'}
        className='mb-16'
      >
        {labels.map(({ label }, index) => (
          <li className='relative z-[5] flex-1 items-start'>
            <div
              className={cn(
                'absolute top-1 -z-[1] h-2 w-full rounded-lg bg-gray-200 transition-all duration-200 ease-out after:left-0 after:top-0',
                index + 1 <= currentStep - 1 && 'bg-blue-500'
              )}
            />

            <Flex
              direction={'column'}
              gap={16}
              align={'start'}
            >
              <Flex
                className={cn(
                  'relative h-4 w-4 cursor-pointer rounded-full bg-slate-500 after:text-center after:text-sm after:font-medium after:text-white',
                  index + 1 === currentStep &&
                    'max-w-full -translate-x-1/2 -translate-y-1/2 transform bg-blue-500',
                  index + 1 <= currentStep - 1 && ' bg-opacity-30'
                )}
                onClick={() => onStepClick(index + 1)}
              />

              <Label className='text-sm font-medium text-gray-500'>
                {label && label}
              </Label>
            </Flex>
          </li>
        ))}
      </Flex>
    </ul>
  )
}

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
          <li className='flex-1 relative z-[5] items-start'>
            <div
              className={cn(
                'absolute bg-gray-200 rounded-lg w-full -z-[1] top-1 after:left-0 after:top-0 h-2 transition-all duration-200 ease-out',
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
                  'w-4 h-4 rounded-full relative bg-slate-500 cursor-pointer after:text-white after:font-medium after:text-sm after:text-center',
                  index + 1 === currentStep &&
                    'bg-blue-500 transform -translate-x-1/2 -translate-y-1/2 max-w-full',
                  index + 1 <= currentStep - 1 && ' bg-opacity-30'
                )}
                onClick={() => onStepClick(index + 1)}
              />

              <Label className='text-gray-500 text-sm font-medium'>
                {label && label}
              </Label>
            </Flex>
          </li>
        ))}
      </Flex>
    </ul>
  )
}

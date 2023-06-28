import { Check } from 'lucide-react'
import { cn } from '~/lib/utils'
import { Label } from '../ui'
import styles from './stepper.module.scss'

interface StepperProps {
  currentStep: number
  steps: number
  onStepClick: (step: number) => void
}

export const Stepper = ({ currentStep, steps, onStepClick }: StepperProps) => {
  return (
    <div className={cn(styles.wrapper, 'mb-10')}>
      {Array(steps)
        .fill('_')
        .map((_, index) => (
          <div
            onClick={() => onStepClick(index + 1)}
            key={index}
            className={cn(styles.step, 'transition-all duration-200 ease-out', {
              [styles.stepActive]: currentStep === index + 1,
              [styles.stepCompleted]: currentStep > index + 1
            })}
          >
            <div className={cn(styles.line)} />
            <div className={styles.label}>
              <div className={styles.labelIcon}>
                <Check className='text-white' />
              </div>
              <Label>{index + 1}</Label>
            </div>
          </div>
        ))}
    </div>
  )
}

'use client'

import { lazy, useMemo } from 'react'

import { StatusActions } from '~/app/redux/features/StepSlice'
import { useAppDispatch, useAppSelector } from '~/app/redux/hooks'
import { Stepper } from '~/components'
import { STEPS } from '~/lib/constants'

const AboutPage = lazy(() => import('./_about/page'))
const AdvantagesPage = lazy(() => import('./_advantages/page'))
const InfoPage = lazy(() => import('./_info/page'))

const MainFormPage = () => {
  const { currentStep } = useAppSelector((state) => state.StepReducer)

  const dispatch = useAppDispatch()

  const currentForm = useMemo(() => {
    switch (currentStep) {
      case 1:
        return <InfoPage />
      case 2:
        return <AdvantagesPage />
      case 3:
        return <AboutPage />

      default:
        return <InfoPage />
    }
  }, [currentStep])

  return (
    <div className='w-full'>
      <Stepper
        onStepClick={(step) => dispatch(StatusActions.setCurrentStep(step))}
        currentStep={currentStep}
        steps={STEPS}
      />

      {currentForm}
    </div>
  )
}

export default MainFormPage

'use client'

import AboutPage from '~/app/forms/_about/page'
import AdvantagesPage from '~/app/forms/_advantages/page'
import InfoPage from '~/app/forms/_info/page'
import { StatusActions } from '~/app/redux/features/StepSlice'
import { useAppDispatch, useAppSelector } from '~/app/redux/hooks'
import { Stepper } from '~/components'
import { STEPS } from '~/lib/constants'

const page = () => {
  const { currentStep } = useAppSelector((state) => state.StepReducer)

  const dispatch = useAppDispatch()

  let currentPage: React.JSX.Element

  switch (currentStep) {
    case 1:
      currentPage = <InfoPage />
      break
    case 2:
      currentPage = <AdvantagesPage />
      break
    case 3:
      currentPage = <AboutPage />
      break

    default:
      return <InfoPage />
  }

  return (
    <div className='w-full'>
      <Stepper
        onStepClick={(step) => dispatch(StatusActions.setCurrentStep(step))}
        currentStep={currentStep}
        steps={STEPS}
      />

      {currentPage}
    </div>
  )
}

export default page

'use client'

import InfoPage from '~/app/forms/_info/page'
import AdvantagesPage from '~/app/forms/_advantages/page'
import AboutPage from '~/app/forms/_about/page'

import { useAppDispatch, useAppSelector } from '~/app/redux/hooks'
import { StatusActions } from '~/app/redux/features/StepSlice'
import { Stepper } from '~/components'
import { LABELS } from '~/lib/constants'

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
      {/* <Stepper
        onStepClick={(step) => dispatch(StatusActions.setCurrentStep(step))}
        currentStep={currentStep}
        labels={LABELS}
      /> */}

      {currentPage}
    </div>
  )
}

export default page

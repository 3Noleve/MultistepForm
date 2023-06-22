'use client'

import InfoPage from '~/app/forms/_info/page'
import AdvantagesPage from '~/app/forms/_advantages/page'
import AboutPage from '~/app/forms/_about/page'

import { useAppSelector } from '~/app/redux/hooks'

const page = () => {
  const { currentStep } = useAppSelector((state) => state.StepReducer)

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
      return `${currentStep} нету такого шага`
  }

  return (
    <div className='w-full'>
      {currentPage}

      {/* <InfoPage /> */}

      {/* <AdvantagesPage /> */}

      {/* <AboutPage /> */}
    </div>
  )
}

export default page

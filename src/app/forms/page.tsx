'use client';

import { FC, useState } from 'react';
import InfoPage from '~/app/forms/_info/page';
import { FormStep } from '~/app/types';
import { useAppDispatch } from '~/app/redux/hooks';
import { setStep, setData } from '~/app/redux/features/formSlice';

interface FormProps {
  steps: FormStep[];
}

const steps: FormStep[] = [
  { step: 0, component: <InfoPage /> },
  { step: 1, component: <InfoPage /> },
  { step: 2, component: <InfoPage /> },
];

const page: FC<FormProps> = ({ steps }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const dispatch = useAppDispatch();

  // const curStep = steps.find((formStep) => formStep.step === currentStep);

  const handleNext = () => {
    dispatch(setStep(currentStep + 1));

    setCurrentStep((currentStep) => currentStep + 1);
  };

  const handleBack = () => {
    dispatch(setStep(currentStep - 1));

    setCurrentStep((currentStep) => currentStep - 1);
  };

  return (
    <div>
      This is root (forms page)
      {/* {curStep?.component} */}
    </div>
  );
};

export default page;

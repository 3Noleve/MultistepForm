'use client';

import InfoPage from '~/app/forms/_info/page';
import AdvantagesPage from '~/app/forms/_advantages/page';

import { Steper } from '~/app/components/Steper';
import { useAppDispatch, useAppSelector } from '~/app/redux/hooks';

const page = () => {
  const { step } = useAppSelector((state) => state.FormReducer);

  const dispatch = useAppDispatch();

  let currentPage: React.ReactNode;

  switch (step) {
    case 1:
      currentPage = <InfoPage />;
      break;
    case 2:
      currentPage = <AdvantagesPage />;
      break;
    case 3:
      currentPage = <div>About Page</div>;
      break;

    default:
      return `${step} нету такого шага`;
  }

  return (
    <div>
      This is root (forms page)
      {/* {currentPage} */}
      <AdvantagesPage />
      {/* <Steper step={step} /> */}
    </div>
  );
};

export default page;

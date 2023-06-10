'use client';

import { useAppDispatch, useAppSelector } from '~/app/redux/hooks';
import { setStep } from '~/app/redux/features/infoFormSlice';

const page = () => {
  const { data, step } = useAppSelector((state) => state.FormReducer);

  const dispatch = useAppDispatch();

  const handlePrevStep = () => {
    dispatch(setStep(step - 1));
  };

  return (
    <div>
      This is advantages page
      <div>
        <label htmlFor="advantages">Advantages</label>

        <div>
          <input id="field-advantages-1" placeholder="Advantages..." />
          <button id="button-remove-1" style={{ cursor: 'pointer' }}>
            X
          </button>
        </div>

        <div>
          <input id="field-advantages-2" placeholder="Advantages..." />
          <button id="button-remove-2" style={{ cursor: 'pointer' }}>
            X
          </button>
        </div>

        <div>
          <input id="field-advantages-3" placeholder="Advantages..." />
          <button id="button-remove-3" style={{ cursor: 'pointer' }}>
            X
          </button>
        </div>

        <button>Add</button>
      </div>
      <button onClick={handlePrevStep}>Back</button>
    </div>
  );
};

export default page;

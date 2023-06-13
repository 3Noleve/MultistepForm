import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StepSchema } from '~/app/redux/types.step';

const initialState: StepSchema = {
  currentStep: 1,
};

export const statusSlice = createSlice({
  name: 'step',
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
  },
});

export const { setCurrentStep } = statusSlice.actions;
export default statusSlice.reducer;

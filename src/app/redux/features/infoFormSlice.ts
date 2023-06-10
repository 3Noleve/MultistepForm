import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InfoFormInputs } from '~/app/types';

interface FormState {
  step: number;
  data: InfoFormInputs;
}

interface FormPayload {
  name: keyof InfoFormInputs;
  value: any;
}

const initialState: FormState = {
  step: 1,
  data: {
    nickname: '',
    name: '',
    surname: '',
    sex: '',
  },
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setStep(state, action: PayloadAction<number>) {
      state.step = action.payload;
    },

    setData(state, action: PayloadAction<FormPayload>) {
      const { name, value } = action.payload;

      state.data[name] = value;
    },
  },
});

export const { setData, setStep } = formSlice.actions;

export default formSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type FormState<T> = {
  step: number;
  data: Record<string, T>;
};

const initialState: FormState<string | number | string[] | number[]> = {
  step: 0,
  data: {},
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setStep(state, action: PayloadAction<number>) {
      state.step = action.payload;
    },

    setData(state, action: PayloadAction<{ name: string; value: any }>) {
      const { name, value } = action.payload;

      state.data[name] = value;
    },
  },
});

export const { setData, setStep } = formSlice.actions;

export default formSlice.reducer;

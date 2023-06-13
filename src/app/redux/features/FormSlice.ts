import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserSex } from '~/app/types';
import { FormSchema } from '~/app/redux/types.form';

const initialState: FormSchema = {
  nickname: null,
  name: null,
  surname: null,
  sex: UserSex.man,
  advantages: [],
  checkbox: [1],
  radio: 1,
  about: null,
  email: null,
  phone: null,
};

const FormSlice = createSlice({
  name: 'infoForm',
  initialState,
  reducers: {
    setNickname: (state, action: PayloadAction<string>) => {
      state.nickname = action.payload;
    },

    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },

    setSurname: (state, action: PayloadAction<string>) => {
      state.surname = action.payload;
    },

    setSex: (state, action: PayloadAction<'man' | 'woman'>) => {
      state.sex = action.payload;
    },

    setAdvantages(state, action: PayloadAction<string[]>) {
      state.advantages = action.payload;
    },

    setCheckbox: (state, action: PayloadAction<number>) => {
      const copy = state.checkbox.filter((item) => item !== action.payload);

      if (copy.length !== state.checkbox.length) {
        state.checkbox = copy;
      } else {
        copy.push(action.payload);
        state.checkbox = copy;
      }
    },

    setRadio(state, action: PayloadAction<number>) {
      state.radio = action.payload;
    },

    setPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },

    setAbout(state, action: PayloadAction<string>) {
      state.about = action.payload;
    },
  },
});

export const {
  setAbout,
  setAdvantages,
  setCheckbox,
  setRadio,
  setEmail,
  setName,
  setNickname,
  setPhone,
  setSurname,
  setSex,
} = FormSlice.actions;

export default FormSlice.reducer;

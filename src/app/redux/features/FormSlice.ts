import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface FormSchema {
  nickname: string | null
  name: string | null
  surname: string | null
  phone: string | null
  email: string | null
  sex: 'man' | 'woman' | undefined
  advantages: string[]
  radio: number | null
  checkbox: number[]
  about: string | undefined
}

const initialState: FormSchema = {
  nickname: null,
  name: null,
  surname: null,
  sex: undefined,
  advantages: ['Advantage', 'Advantage', 'Advantage'],
  checkbox: [],
  radio: null,
  about: '',
  email: 'johndoe@gmail.com',
  phone: '+7 (800) 555-35-35'
}

const FormSlice = createSlice({
  name: 'infoForm',
  initialState,
  reducers: {
    setNickname: (state, action: PayloadAction<string>) => {
      state.nickname = action.payload
    },

    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },

    setSurname: (state, action: PayloadAction<string>) => {
      state.surname = action.payload
    },

    setSex: (state, action: PayloadAction<'man' | 'woman'>) => {
      state.sex = action.payload
    },

    setAdvantages(state, action: PayloadAction<string[]>) {
      state.advantages = action.payload
    },

    setCheckbox: (state, action: PayloadAction<number[]>) => {
      state.checkbox = action.payload
    },

    setRadio(state, action: PayloadAction<number>) {
      state.radio = action.payload
    },

    setPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload
    },

    setAbout(state, action: PayloadAction<string>) {
      state.about = action.payload
    },
    reset() {
      return initialState
    }
  }
})

export const FormSliceActions = FormSlice.actions
export default FormSlice.reducer

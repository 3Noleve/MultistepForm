import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface StepSchema {
  currentStep: number
}

const initialState: StepSchema = {
  currentStep: 1
}

const statusSlice = createSlice({
  name: 'step',
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload
    }
  }
})

export const StatusActions = statusSlice.actions
export default statusSlice.reducer
